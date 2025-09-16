'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { getSession, useSession } from 'next-auth/react'

import Paper from '@mui/material/Paper'

import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { getKegiatanKelompok } from '@/redux-store/admin-referensi/kelompok-kegiatan'

import customFetch from '@/utils/axios'

import Loading from '@/components/Loading'

const DetailKelompok = () => {
  const router = useRouter()
  const query = router.query
  const kelompok_id = query.kelompok_id

  const dispatch = useDispatch()

  const { kegiatan, tab } = useSelector(store => store.kelKegiatan)

  useEffect(() => {
    if (kelompok_id !== undefined && kelompok_id !== null) {
      dispatch(getKegiatanKelompok(kelompok_id))
    }
  }, [kelompok_id, dispatch, tab])

  if (!kegiatan) {
    return <Loading />
  }

  const breadcrumbs = [
    { name: 'Referensi', path: '/admin-referensi' },
    { name: 'Pengaturan Kelompok Kegiatan', path: '/admin-referensi/kel-kegiatan' },
    { name: 'Kelompok Kegiatan' }
  ]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 10 }}>
                Kelompok : {query.nama} (ID. {query.kelompok_id})
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Button variant='tonal'>Update Kelompok</Button>
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Kel.ID</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Bidang</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kegiatan.map((item, index) => {
                    const { kegiatan_id, nama } = item

                    return (
                      <TableRow key={index}>
                        <TableCell scope='row'>{index + 1}</TableCell>
                        <TableCell>
                          <Link href='/' title='edit'>
                            <Icon icon='tabler:edit' fontSize={20} />
                          </Link>
                        </TableCell>
                        <TableCell>{kegiatan_id}</TableCell>
                        <TableCell>{nama}</TableCell>
                        <TableCell>{item.bidang?.nama}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

DetailKelompok.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default DetailKelompok
