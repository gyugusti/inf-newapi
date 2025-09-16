import React from 'react'

import { Box } from '@mui/system'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Card, CardContent } from '@mui/material'

import Loading from '@/components/Loading'

const DetailLkf = ({ detail }) => {
  if (!detail || detail.length === 0) {
    return <Loading />
  }

  return (
    <>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>No LVKF</TableCell>
                  <TableCell>{detail.no_lkf}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kelompok Kegiatan</TableCell>
                  <TableCell>{detail.kelompok?.nama}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Instansi</TableCell>
                  <TableCell>
                    {detail.fasilitas?.nama} - {detail.fasilitas?.alamat_pusat?.kabupaten} ,
                    {detail.fasilitas?.alamat_pusat?.propinsi}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tanggal </TableCell>
                  <TableCell>{detail.tanggal_lkf}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Catatan Pemohon</TableCell>
                  <TableCell>{detail.catatan_pemohon}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default DetailLkf
