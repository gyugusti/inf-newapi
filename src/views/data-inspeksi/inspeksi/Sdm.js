import React, { Fragment, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination'

import Loading from '@/components/Loading'
import { formatDates, fullDay } from '@/utils/helper'
import { getInspekturDet, changePage, getInspekturThnDet } from '@/redux-store/data-inspeksi'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'

const Sdm = ({ tahun }) => {
  const dispatch = useDispatch()

  const { dataInspektur, isLoading, numOfPages, current_page, per_page, tab } = useSelector(store => store.dataInspeksi)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    if (tahun) {
      dispatch(getInspekturThnDet(tahun))
    } else {
      dispatch(getInspekturDet())
    }
  }, [dispatch, current_page, tab, tahun])

  if (isLoading || !dataInspektur) {
    return <Loading />
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>NIP</TableCell>
              <TableCell>Insp ID </TableCell>
              <TableCell> Nama SDM</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Jenjang</TableCell>
              <TableCell>Jml. Inspeksi</TableCell>
              <TableCell>Jml. Instansi</TableCell>
              <TableCell>Jml. OH</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {dataInspektur.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <Link
                      href={{ pathname: `inspektur/id`, query: { insp_master_id: item.insp_master_id } }}
                      passHref
                      target='_blank'
                    >
                      {item.nip}
                    </Link>
                  </TableCell>
                  <TableCell>{item.insp_master_id}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.group} </TableCell>
                  <TableCell>
                    {item.nama_jenjang}, {item.nama_bidang}
                  </TableCell>
                  <TableCell>{item.jmlInspeksi ?? item.jum_inspeksi}</TableCell>
                  <TableCell>{item.jmlFas ?? item.jum_instansi}</TableCell>
                  <TableCell>{item.jmlOh ?? item.jum_oh}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
    </>
  )
}

export default Sdm
