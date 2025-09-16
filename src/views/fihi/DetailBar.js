import React, { useState } from 'react'

import Link from 'next/link'

import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Paper,
  Box
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch } from 'react-redux'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import CreateFihi from './CreateFihi'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { fihiSelesai, setTab } from '@/redux-store/fihi'

const DetailBar = ({ fihiJadwal }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [itemfas, setItemfas] = useState()
  const [KonfirmId, setKonfirmId] = useState()
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)

  const handleFormOpen = (tujuan, item) => {
    setDataForm(tujuan)
    setItemfas(item)
    setOpen(true)
  }

  const handleFormClose = () => setOpen(false)

  const handleKirimClick = id => {
    setKonfirmId(id)
    setShowConfirmationSend(true)
  }

  return (
    <>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell width='5%'>No</StyledTableCell>
                  <StyledTableCell width='25%'>Instansi / Lokasi Inspeksi</StyledTableCell>
                  <StyledTableCell width='5%' sx={{ textAlign: 'center' }}>
                    Sifat
                  </StyledTableCell>
                  <StyledTableCell width='65%' sx={{ textAlign: 'center' }}>
                    Detail Pemeriksaan
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {fihiJadwal && fihiJadwal.length > 0 ? (
                  fihiJadwal.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>
                        <b>{item.fas?.nama}</b>
                        <br /> {item.fas?.alamat_pusat?.alamat}, {item.fas?.alamat_pusat?.kabupaten},{' '}
                        {item.fas?.alamat_pusat?.propinsi}
                        <br /> {item.alamat?.alamat}
                      </StyledTableCell>
                      <StyledTableCell>{item.sifat?.nama}</StyledTableCell>
                      <StyledTableCell>
                        {item.jadwalTujuan.map((tujuan, idx) => (
                          <Box key={idx} display='flex' justifyContent='space-between' alignItems='center' mb={1}>
                            <Box>{tujuan.kelompok.nama}</Box>
                            <Box>{tujuan.kel_fihi ? tujuan.kel_fihi.no_fihi : '-'}</Box>
                            <Box>{tujuan.kel_fihi ? (tujuan.kel_fihi.status_id === 1 ? 'Arsip' : 'Draft') : '-'}</Box>
                            <Box>
                              {tujuan.kel_fihi ? (
                                tujuan.kel_fihi.status_id === 0 ? (
                                  <>
                                    <Link
                                      href={{
                                        pathname: '/inspektur/fihi/pemeriksaan',
                                        query: { id: tujuan.kel_fihi.fihi_id }
                                      }}
                                    >
                                      <IconButton color='primary'>
                                        <Icon icon='tabler:edit' fontSize={20} />
                                      </IconButton>
                                    </Link>
                                    <Link
                                      href={{ pathname: '/cetak/fihi', query: { id: tujuan.kel_fihi.fihi_id } }}
                                      target='_blank'
                                    >
                                      <IconButton color='primary'>
                                        <Icon icon='tabler:file' fontSize={20} />
                                      </IconButton>
                                    </Link>
                                    {tujuan.kel_fihi.status_penilaian === 1 && (
                                      <IconButton
                                        color='primary'
                                        onClick={() => handleKirimClick(tujuan.kel_fihi.fihi_id)}
                                      >
                                        <Icon icon='tabler:thumb-up' fontSize={20} />
                                      </IconButton>
                                    )}
                                  </>
                                ) : (
                                  <Link
                                    href={{ pathname: '/cetak/fihi', query: { id: tujuan.kel_fihi.fihi_id } }}
                                    target='_blank'
                                  >
                                    <IconButton color='primary'>
                                      <Icon icon='tabler:file' fontSize={20} />
                                    </IconButton>
                                  </Link>
                                )
                              ) : (
                                <IconButton color='primary' onClick={() => handleFormOpen(tujuan, item)}>
                                  <Icon icon='tabler:plus' fontSize={20} />
                                </IconButton>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} sx={{ textAlign: 'center' }}>
                      Tidak ada data
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {open && <CreateFihi data={dataForm} itemfas={itemfas} open={open} handleClose={handleFormClose} />}

      {KonfirmId && (
        <KonfirmasiDialog
          open={showConfirmationSend}
          setOpen={setShowConfirmationSend}
          Id={KonfirmId}
          onConfirm={id => {
            if (id !== 'no') dispatch(fihiSelesai(id))
            setShowConfirmationSend(false)
            dispatch(setTab(id))
          }}
          message='Apakah yakin fihi sudah SELESAI dan akan dimasukkan ke dalam ARSIP?'
        />
      )}
    </>
  )
}

export default DetailBar
