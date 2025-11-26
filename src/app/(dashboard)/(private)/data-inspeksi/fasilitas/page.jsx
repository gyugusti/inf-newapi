'use client'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import Pagination from '@mui/material/Pagination'

import Loading from '@/components/Loading'
import { getDataFasilitas, changePage } from '@/redux-store/data-inspeksi'
import { alamatPusat } from '@/utils/balishelper'

const Index = () => {
  const dispatch = useDispatch()
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { dataFasilitas, isLoading, numOfPages, current_page, per_page, status, tab } = useSelector(
    store => store.dataInspeksi
  )

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(getDataFasilitas())
  }, [dispatch, current_page, tab])

  if (isLoading || !dataFasilitas) {
    return <Loading />
  }

  return (
    <>
      <Card>
        <CardContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>NO</TableCell>
                  <TableCell> Nama Fasilitas </TableCell>
                  <TableCell> Fas ID</TableCell>
                  <TableCell>Alamat Pusat</TableCell>
                  <TableCell>Bidang</TableCell>
                  <TableCell>KTUN</TableCell>
                  <TableCell>SRP</TableCell>
                  <TableCell>Pekerja</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFasilitas.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.fas_id}</TableCell>
                      <TableCell>{alamatPusat(item.alamat_pusat)}</TableCell>
                      <TableCell>{item.bidang?.nama}</TableCell>
                      <TableCell>{item.ktun20_count + item.ktun25_count}</TableCell>
                      <TableCell>{item.sumber_count}</TableCell>
                      <TableCell>{item.pekerja_count}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
        </CardContent>
      </Card>
    </>
  )
}

Index.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Index
