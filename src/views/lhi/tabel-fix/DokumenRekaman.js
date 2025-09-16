import React, { useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react/dist/iconify.js'

import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material'
import { format } from 'date-fns/format'
import { styled } from '@mui/material/styles'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'

const DokumenRekaman = ({ data, detailLkf, action }) => {
  console.log(data)

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Berkas </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.data && data.data.length > 0 ? (
                data.data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Button color='secondary' variant='tonal' onClick={handlePrev} sx={{ '& svg': { mr: 2 } }}>
                        <Icon fontSize='1.125rem' icon='tabler:arrow-left' />
                        {item.dokumen.nama_file}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>Data Tidak tersedia</TableCell>
                </TableRow>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default DokumenRekaman
