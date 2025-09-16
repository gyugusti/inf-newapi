'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material'

export default function JadwalIndex({ data, page, totalPage }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (_, value) => {
    const newParams = new URLSearchParams(searchParams)

    newParams.set('page', value)
    router.push(`?${newParams.toString()}`)
  }

  const indexOfFirstItem = (page - 1) * 10

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Kode Area / Bidang</TableCell>
              <TableCell>Propinsi</TableCell>
              <TableCell>Fasilitas</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                <TableCell>
                  {item.tgl_mulai} - {item.tgl_akhir}
                </TableCell>
                <TableCell>
                  {item.kode_area} - {item.bidang?.nama}
                </TableCell>
                <TableCell>{item.propinsi?.nama}</TableCell>
                <TableCell>{item.jadwal_fas_count}</TableCell>
                <TableCell>{item.status?.nama}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={totalPage} page={page} onChange={handlePageChange} sx={{ mt: 2 }} />
    </>
  )
}
