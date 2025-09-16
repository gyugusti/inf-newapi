import React from 'react'

import { Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'

const DetailInspektur = ({ jenjang }) => {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>Jenjang</TableCell>
              <TableCell> No SK /Tgl SK </TableCell>
              <TableCell> Status</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {jenjang &&
              jenjang.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell scope='row'>{index + 1}</TableCell>
                    <TableCell>
                      {item.nama_jenjang}, {item.nama_bidang}
                    </TableCell>
                    <TableCell>
                      {item.no_sk}, {item.tgl_sk}
                    </TableCell>
                    <TableCell>{item.status_id === 1 ? 'Berlaku' : 'Berakhir'}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DetailInspektur
