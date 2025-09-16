import React, { Fragment, useState } from 'react'

import Link from 'next/link'

import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  Paper,
  Button
} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch } from 'react-redux'

import { StyledTableCell, StyledTableRow, TableCellNoRow } from '@/components/styles/StyledTable'

import DetailLkf from '../DetailLkf'

const DaftarLkf = ({ detail }) => {
  return (
    <>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <StyledTableRow component='th'>
                  <StyledTableCell width='5%'>No</StyledTableCell>
                  <StyledTableCell width='25%'> Instansi</StyledTableCell>
                  <StyledTableCell width='5%' sx={{ textAlign: 'center' }}>
                    Sifat
                  </StyledTableCell>
                  <StyledTableCell width='70%'>
                    <Table width='100%'>
                      <StyledTableRow>
                        <TableCellNoRow width='30%' sx={{ textAlign: 'center' }}>
                          Kegiatan
                        </TableCellNoRow>
                        <TableCellNoRow width='20%' sx={{ textAlign: 'center' }}>
                          No lvkf
                        </TableCellNoRow>
                      </StyledTableRow>
                    </Table>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {detail.jadwal_fas && detail.jadwal_fas.length > 0 ? (
                  detail.jadwal_fas.map((item, index) => (
                    <TableRow key={index}>
                      <StyledTableCell scope='row'>{index + 1}</StyledTableCell>
                      <StyledTableCell>
                        <b>{item.fas?.nama} </b>
                        <br /> {item.fas?.alamat_pusat?.alamat} , {item?.fas?.alamat_pusat?.kabupaten} ,
                        {item?.fas?.alamat_pusat?.propinsi} <br />
                        {item.alamat?.alamat}
                      </StyledTableCell>
                      <StyledTableCell>{item.sifat?.nama}</StyledTableCell>
                      <StyledTableCell colSpan={4}>
                        <Table width='100%'>
                          {item.jadwalTujuan.map((tujuan, index) => (
                            <StyledTableRow key={index}>
                              <TableCellNoRow width='30%' sx={{ textAlign: 'center' }}>
                                {tujuan.kelompok.nama}
                              </TableCellNoRow>
                              <TableCellNoRow width='20%' sx={{ textAlign: 'center' }}>
                                {tujuan.lvkf ? (
                                  <Link
                                    href={{
                                      pathname: '/cetak/lkf',
                                      query: { id: tujuan.lvkf.lkf_id }
                                    }}
                                    passHref
                                    target='_blank'
                                  >
                                    <Button size='small' sx={{ mb: 2, '& svg': { mr: 2 } }}>
                                      <Icon fontSize='1.125rem' icon='tabler:file' />
                                      {tujuan.lvkf.no_lkf}
                                    </Button>
                                  </Link>
                                ) : (
                                  <span>-</span>
                                )}
                              </TableCellNoRow>
                            </StyledTableRow>
                          ))}
                        </Table>
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell> Alamat tidak ada</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default DaftarLkf
