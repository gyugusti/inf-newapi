'use client'
import React, { Fragment, useEffect, useState } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import Link from 'next/link'

import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'

import { Icon } from '@iconify/react/dist/iconify.js'

import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from '@mui/material'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import InkfKel from '@/views/admin-referensi/temuan/InkfKel'

import { getTabelKel, setCreate } from '@/redux-store/admin-referensi/tabel-setting'
import Loading from '@/components/Loading'
import TambahTabel from '@/views/admin-referensi/tabel-setting/TambahTabel'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'Tabel Setting', path: '/admin-referensi/tabel-setting' },
  { name: 'Tambah Tabel' }
]

const SettingKelompok = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const params = useParams()
  const searchParams = useSearchParams()

  const kelompok_id = params.kelompok_id
  const nama = searchParams.get('nama')

  const { isEditing, tabelKel, isLoading, tab } = useSelector(store => store.tabel)

  useEffect(() => {
    dispatch(getTabelKel(kelompok_id))
  }, [dispatch, kelompok_id, tab])

  if (isLoading || !tabelKel) {
    return <Loading />
  }

  return (
    <>
      <Fragment>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  Kelompok : {nama} (ID. {kelompok_id}){' '}
                </Grid>
                <Grid size={{ xs: 12 }}>
                  {!isEditing && (
                    <Button variant='tonal' onClick={() => dispatch(setCreate())}>
                      Tambah Item
                    </Button>
                  )}
                  {/* </Link> */}
                </Grid>
              </Grid>
              {isEditing ? (
                <div>
                  <TambahTabel kelompok_id={kelompok_id} nama={nama} tabelKel={tabelKel} />
                </div>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell component='th'>No</TableCell>
                        <TableCell colSpan={2}>Nama</TableCell>
                        <TableCell>Urutan</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tabelKel.map((item, index) => {
                        const { inkf_id, nama } = item

                        return (
                          <Fragment key={index}>
                            <TableRow key={index}>
                              <TableCell component='th'>
                                <b>{inkf_id}</b>
                              </TableCell>
                              <TableCell component='th' colSpan={3}>
                                <b>{nama}</b>
                              </TableCell>
                            </TableRow>

                            {item.lkf_lib_keg.map((row, index) => {
                              return (
                                <TableRow key={index}>
                                  <TableCell scope='row'>
                                    {inkf_id}.{index + 1}
                                  </TableCell>
                                  <TableCell>{row.nama}</TableCell>
                                  <TableCell>{row.uraian}</TableCell>
                                  <TableCell>{row.urutan}</TableCell>
                                </TableRow>
                              )
                            })}

                            {item.inkf_tabel_kel.map((row, index) => {
                              const lib = item.lkf_lib_keg

                              return (
                                <TableRow key={index}>
                                  <TableCell scope='row'>
                                    {inkf_id}.{lib.length + index + 1}
                                  </TableCell>
                                  <TableCell>{row.nama}</TableCell>
                                  <TableCell>{row.uraian}</TableCell>
                                  <TableCell>{row.urutan}</TableCell>
                                </TableRow>
                              )
                            })}
                          </Fragment>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Fragment>
    </>
  )
}

export default SettingKelompok
