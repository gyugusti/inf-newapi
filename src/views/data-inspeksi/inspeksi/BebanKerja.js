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
import { getBebanKerja } from '@/redux-store/data-inspeksi'

const BebanKerja = () => {
  const dispatch = useDispatch()
  const [sdmTotal, setSdmTotal] = useState(0)
  const [instansiTotal, setInstansiTotal] = useState(0)
  const [inspeksiTotal, setInspeksiTotal] = useState(0)
  const [ohTotal, setOhTotal] = useState(0)

  const { bebanInspektur, isLoading, tab } = useSelector(store => store.dataInspeksi)

  useEffect(() => {
    dispatch(getBebanKerja())
  }, [dispatch, tab])

  //   useEffect(() => {
  //     let sdmTotal = 0
  //     let instansiTotal = 0
  //     let inspeksiTotal = 0
  //     let totaloh = 0

  //     bebanInspektur.forEach(item => {
  //       sdmTotal += item.jmlJadwal
  //       instansiTotal += item.jmlKegiatan
  //       inspeksiTotal += item.jmlInspektur
  //       totaloh += item.jmlOh
  //     })
  //     setSdmTotal(sdmTotal)
  //     setInstansiTotal(instansiTotal)
  //     setInspeksiTotal(inspeksiTotal)
  //     setOhTotal(totaloh)
  //   }, [bebanInspektur])

  if (isLoading || !bebanInspektur) {
    return <Loading />
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th'>NO</StyledTableCell>
              <StyledTableCell component='th'>Tahun</StyledTableCell>
              <StyledTableCell component='th'>Jumlah SDM</StyledTableCell>
              <StyledTableCell component='th'>Jumlah Inspeksi</StyledTableCell>
              <StyledTableCell component='th'>Jumlah Instansi</StyledTableCell>
              <StyledTableCell component='th'>Jumlah OH</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {bebanInspektur.map((item, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell scope='row'>{index + 1}</StyledTableCell>
                  <StyledTableCell>
                    <Link href={{ pathname: `inspektur/${item.tahun}` }} passHref target='_blank'>
                      {item.tahun}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>{item.jmlInspektur} </StyledTableCell>
                  <StyledTableCell>{item.jmlJadwal} </StyledTableCell>
                  <StyledTableCell>{item.jmlFas} </StyledTableCell>
                  <StyledTableCell>{item.jmlOh} </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BebanKerja
