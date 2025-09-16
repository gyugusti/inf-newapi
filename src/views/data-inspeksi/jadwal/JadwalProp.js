import React, { Fragment, useEffect, useRef, useState } from 'react'

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
  TableFooter
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import { getJadwalProp } from '@/redux-store/data-inspeksi'

const JadwalProp = () => {
  const dispatch = useDispatch()
  const [jadwalTotal, setJadwalTotal] = useState(0)
  const [kegiatanTotal, setKegiatanTotal] = useState(0)
  const [inspekturTotal, setInspekturTotal] = useState(0)
  const [ohTotal, setOhTotal] = useState(0)

  const { jadwalProp, isLoading, tab } = useSelector(store => store.dataInspeksi)

  useEffect(() => {
    dispatch(getJadwalProp())
  }, [dispatch, tab])

  useEffect(() => {
    let totaljadwal = 0
    let totalkegiatan = 0
    let totalinspektur = 0
    let totaloh = 0

    jadwalProp.forEach(item => {
      totaljadwal += item.jmlJadwal
      totalkegiatan += item.jmlKegiatan
      totalinspektur += item.jmlInspektur
      totaloh += item.jmlOh
    })
    setJadwalTotal(totaljadwal)
    setKegiatanTotal(totalkegiatan)
    setInspekturTotal(totalinspektur)
    setOhTotal(totaloh)
  }, [jadwalProp])

  if (isLoading || !jadwalProp) {
    return <Loading />
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell component='th'>Provinsi</TableCell>
              <TableCell component='th'>Jumlah Jadwal</TableCell>
              <TableCell component='th'>Jumlah Kegiatan</TableCell>
              <TableCell component='th'>Jumlah Inspektur</TableCell>
              <TableCell component='th'>Jumlah OH</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {jadwalProp.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{index + 1}</TableCell>
                  <TableCell>{item.nama} </TableCell>
                  <TableCell>{item.jmlJadwal} </TableCell>
                  <TableCell>{item.jmlKegiatan} </TableCell>
                  <TableCell>{item.jmlInspektur} </TableCell>
                  <TableCell>{item.jmlOh} </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TableCell colSpan={2} component='th'>
                TOTAL
              </TableCell>
              <TableCell component='th'>{jadwalTotal}</TableCell>
              <TableCell component='th'>{kegiatanTotal}</TableCell>
              <TableCell component='th'>{inspekturTotal}</TableCell>
              <TableCell component='th'>{ohTotal}</TableCell>
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

export default JadwalProp
