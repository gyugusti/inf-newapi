'use client'

import React, { useState, useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'

import { Card, CardContent, CardHeader } from '@mui/material'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

import { getShowLkf } from '@/redux-store/lkf'
import Loading from '@/components/Loading'
import { alamatCetak } from '@/utils/balishelper'
import CardInkf from '@/views/lvkf/CardInkf'

const breadcrumbs = [{ name: 'Data LVKF', path: '/frontend/lvkf' }, { name: 'Form LVKF' }]

const Lengkapi = () => {
  const router = useRouter()
  const params = useParams()

  const id = params.id

  const dispatch = useDispatch()

  const { detailLkf, isLoading, tab } = useSelector(store => store.lkf)
  const { ikk } = useSelector(store => store.ikk)

  useEffect(() => {
    if (id) {
      dispatch(getShowLkf(id))
    }
  }, [id, dispatch, tab])

  if (isLoading || !detailLkf || detailLkf.length === 0) {
    return <Loading />
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Grid marginTop={4}>
        <Card>
          <CardHeader
            style={{ textAlign: 'center' }}
            title='LAPORAN VERIFIKASI KESELAMATAN FASILITAS'
            subheader='(PELAKSANAAN PROGRAM PROTEKSI RADIASI DAN KEAMANAN SUMBER RADIOAKTIF)'
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>No LVKF</TableCell>
                    <TableCell>{detailLkf.no_lkf}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Instansi</TableCell>
                    <TableCell>{detailLkf.fasilitas.nama}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tanggal Pelaksanaan</TableCell>
                    <TableCell>
                      {detailLkf.jadwal.tgl_mulai} s/d {detailLkf.jadwal.tgl_akhir}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Kelompok Kegiatan</TableCell>
                    <TableCell>{detailLkf.kelompok?.nama}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lokasi pemanfaatan</TableCell>
                    <TableCell>
                      {alamatCetak(detailLkf.jadwal_fas[0].alamat, detailLkf.fasilitas?.nama_cetak)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid marginTop={4}>
        {detailLkf.inkf && detailLkf.inkf.length > 0 ? (
          detailLkf.inkf.map((item, index) => (
            <Grid marginTop={4} key={index}>
              <CardInkf ikk={ikk} action='non-view' item={item} detailLkf={detailLkf} key={index} no={index + 1} />
            </Grid>
          ))
        ) : (
          <Loading />
        )}
      </Grid>
    </>
  )
}

export default Lengkapi
