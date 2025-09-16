import React from 'react'

import { Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'

const RiwayatInspeksi = ({ riwayat }) => {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell> Kode Area </TableCell>
              <TableCell> Propinsi</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {riwayat &&
              riwayat.data.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell scope='row'>{index + 1}</TableCell>
                    <TableCell>
                      {item.tgl_mulai} / {item.tgl_akhir}
                    </TableCell>
                    <TableCell>{item.kode_area}</TableCell>
                    <TableCell>{item.nama_prop}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RiwayatInspeksi
