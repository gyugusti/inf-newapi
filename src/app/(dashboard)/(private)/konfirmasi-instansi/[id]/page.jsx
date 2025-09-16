'use client'

import React, { useState, useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Button,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Box,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Typography,
  CircularProgress,
  Grid,
  TableContainer
} from '@mui/material'

import { formatDates, fullDay } from '@/utils/helper'

import Loading from '@/components/Loading'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { getdetailJadwal, setTab } from '@/redux-store/jadwal'
import DaftarInstasi from '@/views/jadwal/fas/DaftarInstasi'
import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'
import { selesaiJadwalFas } from '@/redux-store/jadwal-fas'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import LabelStatus from '@/components/jadwal/LabelStatus'
import StatusKonfirmasi from '@/components/jadwal/StatusKonfirmasi'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'

const breadcrumbs = [{ name: 'Daftar Jadwal', path: '/konfirmasi-instansi' }, { name: 'Daftar Instansi' }]

const DaftarInstansi = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const params = useParams()

  const id = params.id

  const { detailJadwal, isLoading, tab } = useSelector(store => store.jadwal)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getdetailJadwal(id))
    }
  }, [id, dispatch, tab])

  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [KonfirmId, setKonfirmId] = useState()
  const [dataKonfirm, setDataKonfirm] = useState()

  // Handle Edit dialog
  const handleClickOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleKirimClick = item => {
    setKonfirmId(item.konfirmasi.jadwal_konfirm_id)
    setDataKonfirm(item)
    setShowConfirmationSend(true)
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        {isLoading ? (
          <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <Box>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <TableCell>Kode Area</TableCell>
                  <TableCell>{detailJadwal.kode_area}</TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell>Tanggal Pelaksanaan</TableCell>
                  <TableCell>
                    {detailJadwal.tgl_mulai} s/d {detailJadwal.tgl_akhir} , {detailJadwal.hari} Hari
                  </TableCell>
                </StyledTableRow>
              </TableHead>
            </Table>
            <br />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Nama Instansi</TableCell>
                    <TableCell>Stat. Konfirmasi</TableCell>
                    <TableCell>Stat. Proses</TableCell>
                    <TableCell>Keterangan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailJadwal.jadwal_fas && detailJadwal.jadwal_fas.length > 0 ? (
                    detailJadwal.jadwal_fas.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell scope='row'>{index + 1}</TableCell>
                        <TableCell>
                          {item.konfirmasi && (
                            <>
                              <Chip
                                size='small'
                                label='Ubah Status'
                                color='primary'
                                onClick={() => handleClickOpen(item)}
                                icon={<Icon icon='tabler:circle-chevron-right' fontSize={19} />}
                              />
                              <br />
                              <Chip
                                size='small'
                                label='Selesai Konfirmasi'
                                color='success'
                                onClick={() => handleKirimClick(item)}
                                icon={<Icon icon='tabler:circle-chevron-right' fontSize={19} />}
                              />
                            </>
                          )}
                        </TableCell>
                        <TableCell>{item.fas?.nama}</TableCell>
                        <TableCell>
                          {item.konfirmasi ? (
                            <StatusKonfirmasi konfirmasi={item.konfirmasi.konfirmasi} />
                          ) : (
                            <strong style={{ color: 'orange' }}>Belum dikonfirmasi</strong>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.konfirmasi ? (
                            <LabelStatus id={item.konfirmasi.status_id} />
                          ) : (
                            <strong style={{ color: 'orange' }}>Belum dikonfirmasi</strong>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.konfirmasi ? (
                            <>
                              Nama: <strong>{item.konfirmasi.nama_kontak}</strong> <br />
                              Telp: <strong>{item.konfirmasi.telp_kontak}</strong>
                            </>
                          ) : (
                            'Nama: - Telp: -'
                          )}
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
          </Box>
        )}
      </Card>
      {open && <DaftarInstasi id={id} dataForm={dataForm} open={open} handleClose={handleClose} />}
      {dataKonfirm && (
        <KonfirmasiDialog
          open={showConfirmationSend}
          setOpen={showConfirmationSend}
          Id={KonfirmId}
          onConfirm={KonfirmId => {
            if (KonfirmId !== 'no') {
              dispatch(selesaiJadwalFas(KonfirmId))
              dispatch(setTab(KonfirmId))
            }

            setShowConfirmationSend(false)
          }}
          message={`Instansi ${dataKonfirm.fas.nama} dengan kode area ${
            detailJadwal.kode_area
          } sudah selesai di konfirmasi dengan tanggal pelaksanaan ${formatDates(
            detailJadwal.tgl_mulai,
            detailJadwal.tgl_akhir
          )}. Apakah yakin data sesuai?`}
        />
      )}
    </>
  )
}

DaftarInstansi.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default DaftarInstansi
