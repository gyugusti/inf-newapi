import { useState } from 'react'

import Link from 'next/link'

import { Box, Button, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import { getStatusMasterSumber } from '@/utils/balishelper'

import FormStatusSrp from './FormStatusSrp'

const MasterData = ({ detail, masterId }) => {
  const [openformStatus, setOpenformStatus] = useState(false)

  const handleStatusAktif = () => {
    setOpenformStatus(true)
  }

  const handleModalClose = () => {
    setOpenformStatus(false)
  }

  return (
    <>
      <Box p={2}>
        {/* Tombol Aksi */}
        <Box display='flex' gap={2} mb={3}>
          <Link
            href={{
              pathname: '/sensus-srp/form-srp',
              query: { id: masterId, ...detail }
            }}
            passHref
          >
            <Button variant='outlined' color='primary'>
              Edit Master Sumber <Icon icon='tabler:pencil' fontSize={20} />
            </Button>
          </Link>
          {/* <Button variant='contained' color='error' onClick={handleStatusAktif}>
            Non Aktifkan
          </Button> */}
        </Box>

        {/* Tabel Detail */}
        <Paper elevation={3}>
          <Table size='small'>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Kode Sumber</b>
                </TableCell>
                <TableCell>{detail.master_sumber_id?.toString().padStart(7, '0')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Master ID</b>
                </TableCell>
                <TableCell>{detail.master_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Jenis</b>
                </TableCell>
                <TableCell>{detail.jenis_sumber?.nama}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Kategori Sumber</b>
                </TableCell>
                <TableCell>{detail.kat_sumber?.nama}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Nama</b>
                </TableCell>
                <TableCell>{detail.nama}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Merk Unit</b>
                </TableCell>
                <TableCell>{detail.merk_sumber?.nama}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Tipe/Seri Unit</b>
                </TableCell>
                <TableCell>
                  Tipe = {detail.tipe} / No Seri = {detail.no_seri}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Aktivitas</b>
                </TableCell>
                <TableCell>
                  {detail.aktivitas} {detail.satuan_aktivitas?.nama_satuan} <br /> {detail.tgl_aktivitas}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Merk Tabung</b>
                </TableCell>
                <TableCell>{detail.tabung?.nama}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Tipe/Seri Tabung</b>
                </TableCell>
                <TableCell>
                  Tipe = {detail.tipe_tabung} / No Seri = {detail.no_seri_tabung}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Kv/Ma</b>
                </TableCell>
                <TableCell>
                  {detail.kv} {detail.satuan_kv?.nama_satuan} / {detail.ma} {detail.satuan_ma?.nama_satuan}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>{getStatusMasterSumber(detail.status_sumber_id)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Sifat</b>
                </TableCell>
                <TableCell>{detail.sifat ? detail.sifat : '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Bentuk</b>
                </TableCell>
                <TableCell>{detail.bentuk ? detail.bentuk : '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Jumlah</b>
                </TableCell>
                <TableCell>
                  {detail.jumlah} {detail.sat_jml?.nama_satuan}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Keterangan</b>
                </TableCell>
                <TableCell>
                  <i>{detail.ket_status}</i>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Create</b>
                </TableCell>
                <TableCell>
                  {detail.create_at} oleh = {detail.create_by}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Tanggal Sensus</b>
                </TableCell>
                <TableCell>{detail.tgl_sensus}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {openformStatus && (
        <FormStatusSrp datasrp={detail} masterId={masterId} open={openformStatus} handleClose={handleModalClose} />
      )}
    </>
  )
}

export default MasterData
