import React, { useEffect } from 'react'

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  Paper,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import { getkelKegiatan } from '@/redux-store/admin-referensi/kelompok-kegiatan'

import Loading from '@/components/Loading'

function Kelompok() {
  const dispatch = useDispatch()
  const { kelompokKegiatan, current_page, per_page, isLoading } = useSelector(store => store.kelKegiatan)

  useEffect(() => {
    dispatch(getkelKegiatan())
  }, [dispatch])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell>Kel.ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Jumlah Tabel</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kelompokKegiatan.map((item, index) => {
              const { kelompok_id, nama, inkf_kel_count, lkf_lib_count } = item

              return (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell>{kelompok_id}</TableCell>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{inkf_kel_count + lkf_lib_count}</TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `/admin-referensi/tabel-setting/${kelompok_id}`,
                        query: { nama: nama, kelompok_id: kelompok_id }
                      }}
                    >
                      <Icon icon='tabler:edit' fontSize={20} />
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Kelompok
