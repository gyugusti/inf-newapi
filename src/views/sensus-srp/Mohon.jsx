'use client'

import React, { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent,
  Pagination
} from '@mui/material'

import { fullDayTime } from '@/utils/helper'
import { alamatCetak } from '@/utils/balishelper'

const Mohon = ({ dataMohon }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10 // bisa diubah sesuai kebutuhan
  const totalData = dataMohon.data.length
  const totalPages = Math.ceil(totalData / perPage)

  const indexOfLastItem = currentPage * perPage
  const indexOfFirstItem = indexOfLastItem - perPage
  const currentItems = dataMohon.data.slice(indexOfFirstItem, indexOfLastItem)

  const startEntry = totalData === 0 ? 0 : indexOfFirstItem + 1
  const endEntry = Math.min(indexOfLastItem, totalData)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell>Registrasi</TableCell>
                <TableCell>Instansi</TableCell>
                <TableCell>Tahapan</TableCell>
                <TableCell>Jenis </TableCell>
                <TableCell>Lingkup</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalData === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align='center'>
                    Tidak ada data RiwayatValidasi Validasi
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>{item.no_reg}</TableCell>
                    <TableCell>{item.fasilitas?.nama}</TableCell>
                    <TableCell>{item.tahapan.nama}</TableCell>
                    <TableCell>{item.jenis_mohon?.nama}</TableCell>
                    <TableCell>{item.kegiatan?.nama}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
          <Typography color='text.disabled'>
            {`Showing ${startEntry} to ${endEntry} of ${totalData} entries`}
          </Typography>

          <Pagination
            shape='rounded'
            color='primary'
            variant='tonal'
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default Mohon
