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

const RiwayatValidasi = ({ dataRiwayatValidasi }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10 // bisa diubah sesuai kebutuhan
  const totalData = dataRiwayatValidasi.data.length
  const totalPages = Math.ceil(totalData / perPage)

  const indexOfLastItem = currentPage * perPage
  const indexOfFirstItem = indexOfLastItem - perPage
  const currentItems = dataRiwayatValidasi.data.slice(indexOfFirstItem, indexOfLastItem)

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
                <TableCell>User</TableCell>
                <TableCell>Waktu Validasi</TableCell>
                <TableCell>Keterangan Validasi</TableCell>
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
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{fullDayTime(item.created_at)}</TableCell>
                    <TableCell>
                      <div dangerouslySetInnerHTML={{__html: item.keterangan}} ></div>
                    </TableCell>
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

export default RiwayatValidasi
