import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  Pagination,
  DialogTitle,
  Grid
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import { Icon } from '@iconify/react/dist/iconify.js'

import { useColorScheme, useTheme } from '@mui/material/styles'

import CustomDialog from '@/components/widget/CustomDialog'
import Loading from '@/components/Loading'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import { getdetailJadwal } from '@/redux-store/jadwal'
import { useSettings } from '@core/hooks/useSettings'

const DetailJadwal = ({ data, open, handleClose }) => {
  const { settings } = useSettings()

  const theme = useTheme()
  const dispatch = useDispatch()
  const id = data.jadwal_id

  const { detailJadwal, isLoading, tab } = useSelector(store => store.jadwal)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getdetailJadwal(id))
    }
  }, [id, dispatch, tab])

  return (
    <CustomDialog open={open} handleClose={handleClose} title='' maxWidth='md'>
      {/* Dialog content */}
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {/* Make panel-1 default expanded */}
          <Accordion defaultExpanded>
            <AccordionSummary
              id='panel-header-1'
              aria-controls='panel-content-1'
              expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Typography>
                <b>Detail Jadwal</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableBody
                  sx={{
                    '& .MuiTableCell-root': {
                      py: `${theme.spacing(0.5)} !important`,
                      fontSize: theme.typography.body1.fontSize
                    }
                  }}
                >
                  <StyledTableRow>
                    <TableCell>Kode Area</TableCell>
                    <TableCell>{data.kode_area}</TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Propinsi</TableCell>
                    <TableCell>{data.propinsi?.nama}</TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Tanggal Pelaksanaan</TableCell>
                    <TableCell>
                      {data.tgl_mulai} s/d {data.tgl_akhir} , {data.hari} Hari
                    </TableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <TableCell>Kontak</TableCell>
                    <TableCell>
                      {data.nama_kontak} Telp. {data.telp_kontak}
                    </TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Bidang</TableCell>
                    <TableCell>{data.bidang?.nama}</TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Status Jadwal </TableCell>
                    <TableCell>{data.status?.nama}</TableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              id='panel-header-2'
              aria-controls='panel-content-2'
              expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Typography>
                <b> Data Instansi</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: settings.primaryColor }}>
                      <TableCell component='th'>NO</TableCell>
                      <TableCell>Instansi</TableCell>
                      <TableCell>Lokasi Pemanfaatan</TableCell>
                      <TableCell>Kegiatan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailJadwal.jadwal_fas && detailJadwal.jadwal_fas.length > 0 ? (
                      detailJadwal.jadwal_fas.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell scope='row'>{index + 1}</TableCell>
                          <TableCell>
                            <b>{item.fas?.nama} </b>
                            <br /> {item.fas?.alamat_pusat?.alamat} , {item?.fas?.alamat_pusat?.kabupaten} ,
                            {item?.fas?.alamat_pusat?.propinsi}
                          </TableCell>
                          <TableCell>{item.alamat?.alamat}</TableCell>
                          <TableCell>
                            {item.sifat?.nama} <br />
                            {item.jadwalTujuan.map((kel, index) => (
                              <span style={{ color: 'green' }} key={index}>
                                {kel.kelompok.nama}
                              </span>
                            ))}
                          </TableCell>
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
            </AccordionDetails>
          </Accordion>
        </Fragment>
      )}
    </CustomDialog>
  )
}

export default DetailJadwal
