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
  Paper
} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch } from 'react-redux'

import { StyledTableCell, StyledTableRow, TableCellNoRow } from '@/components/styles/StyledTable'
import CreateLhi from './CreateLhi'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { lhiSelesai, setTab } from '@/redux-store/lhi'


const DaftarLhi = ({ detail }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [itemjadwal, setItemjadwal] = useState()
  const [itemfas, setItemfas] = useState()

  const [KonfirmId, setKonfirmId] = useState()

  const [showConfirmationSend, setShowConfirmationSend] = useState(false)

  const handleFormOpen = (tujuan, item) => {
    setDataForm(tujuan)
    setItemjadwal(detail)
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
                  <StyledTableCell component='th' width='5%'>
                    No
                  </StyledTableCell>
                  <StyledTableCell component='th' width='25%'>
                    Instansi / Lokasi Inspeksi
                  </StyledTableCell>
                  <StyledTableCell component='th' width='5%' sx={{ textAlign: 'center' }}>
                    Sifat
                  </StyledTableCell>
                  <StyledTableCell width='70%'>
                    <Table width='100%'>
                      <TableHead>
                        <StyledTableRow>
                          <TableCellNoRow width='30%' sx={{ textAlign: 'center' }}>
                            Kelompok Kegiatan
                          </TableCellNoRow>
                          <TableCellNoRow width='20%' sx={{ textAlign: 'center' }}>
                            No Lhi
                          </TableCellNoRow>
                          <TableCellNoRow sx={{ width: 1, textAlign: 'center' }} width='20%'>
                            Status
                          </TableCellNoRow>
                          <TableCellNoRow width='30%' sx={{ textAlign: 'center' }}>
                            Action
                          </TableCellNoRow>
                        </StyledTableRow>
                      </TableHead>
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
                        <b>{item.fas?.nama}</b>
                        <br /> {item.fas?.alamat_pusat?.alamat}, {item?.fas?.alamat_pusat?.kabupaten},{' '}
                        {item?.fas?.alamat_pusat?.propinsi}
                        <br />
                        {item.alamat?.alamat}
                      </StyledTableCell>
                      <StyledTableCell>{item.sifat?.nama}</StyledTableCell>
                      <StyledTableCell colSpan={4}>
                        <Table width='100%'>
                          <TableBody>
                            {item.jadwalTujuan.map((tujuan, index) => (
                              <StyledTableRow key={index}>
                                <TableCellNoRow width='30%' sx={{ textAlign: 'center' }}>
                                  {tujuan.kelompok.nama} <br />
                                  {tujuan.kel_fihi.fihi_id ? (
                                    <strong>FIHI tersedia </strong>
                                  ) : (
                                    <strong>FIHI Tidak tersedia</strong>
                                  )}
                                </TableCellNoRow>
                                <TableCellNoRow width='20%' sx={{ textAlign: 'center' }}>
                                  {tujuan.lhi ? <span>{tujuan.lhi.no_master_lhi}</span> : <span>-</span>}
                                </TableCellNoRow>
                                <TableCellNoRow width='20%' sx={{ textAlign: 'center' }}>
                                  {tujuan.lhi?.status ? <strong>{tujuan.lhi.status.nama}</strong> : <strong>-</strong>}
                                </TableCellNoRow>
                                <TableCellNoRow width='30%' sx={{ textAlign: 'center' }}>
                                  {tujuan.lhi ? (
                                    tujuan.lhi.status_id === 0 ? (
                                      <Link
                                        href={{
                                          pathname: `penyusunan`,
                                          query: { id: tujuan.lhi.lhi_id }
                                        }}
                                      >
                                        <IconButton color='primary' title='Edit LHI'>
                                          <Icon icon='tabler:edit' fontSize={20} />
                                        </IconButton>
                                      </Link>
                                    ) : (
                                      <Link
                                        title='View LHI'
                                        href={{
                                          pathname: `/cetak/lhi`,
                                          query: { id: tujuan.lhi.lhi_id }
                                        }}
                                        target='_blank'
                                      >
                                        <IconButton color='primary'>
                                          <Icon icon='tabler:file' fontSize={20} />
                                        </IconButton>
                                      </Link>
                                    )
                                  ) : tujuan.kel_fihi?.fihi_id ? (
                                    <IconButton
                                      title='Buat LHI'
                                      color='primary'
                                      onClick={() => handleFormOpen(tujuan, item)}
                                    >
                                      <Icon icon='tabler:plus' fontSize={20} />
                                    </IconButton>
                                  ) : null}
                                </TableCellNoRow>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>Alamat tidak ada</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {open && (
        <CreateLhi
          id={id}
          data={dataForm}
          itemfas={itemfas}
          itemjadwal={itemjadwal}
          open={open}
          handleClose={handleFormClose}
        />
      )}

      {KonfirmId && (
        <KonfirmasiDialog
          open={showConfirmationSend}
          setOpen={showConfirmationSend}
          Id={KonfirmId}
          onConfirm={KonfirmId => {
            if (KonfirmId !== 'no') {
              dispatch(lhiSelesai(KonfirmId))
            }

            setShowConfirmationSend(false)
            dispatch(setTab(KonfirmId))
          }}
          message={`Apakah yakin lhi sudah SELESAI dan akan di masukkan ke dalam ARSIP?`}
        />
      )}
    </>
  )
}

export default DaftarLhi
