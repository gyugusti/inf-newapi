// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Collapse from '@mui/material/Collapse'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react/dist/iconify.js'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

import Chip from '@mui/material/Chip'

import { useDispatch } from 'react-redux'

import FormAlamat from './FormAlamat'
import { deleteJadwalFas } from '@/redux-store/jadwal'


import FormJadwalKeg from './FormJadwalKeg'

const ListAlamat = ({ detail }) => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)
  const [openKeg, setOpenKeg] = useState(false)
  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [dataKeg, setDataKeg] = useState()

  const jadwal_id = detail.jadwal_id

  // Handle Edit dialog
  const handleClickOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleKegiatanOpen = data => {
    setDataKeg(data)
    setOpenKeg(true)
  }

  const handleClose = () => setOpen(false)
  const handleCloseKeg = () => setOpenKeg(false)

  return (
    <>
      <Card>
        <CardHeader
          title='Fasilitas Alamat'
          action={
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon fontSize={20} icon={!collapsed ? 'tabler:chevron-down' : 'tabler:chevron-up'} />
            </IconButton>
          }
        />
        <Collapse in={collapsed}>
          <CardContent>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>No</TableCell>
                  <TableCell> Fasilitas/Alamat Pusat</TableCell>
                  <TableCell>Lokasi Pemanfaatan</TableCell>
                  <TableCell> Sifat / Kelompok Kegiatan</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail.jadwal_fas && detail.jadwal_fas.length > 0 ? (
                  detail.jadwal_fas.map((item, index) => (
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
                      <TableCell>
                        <IconButton color='primary' onClick={() => handleClickOpen(item)}>
                          <Icon icon='tabler:edit' fontSize={20} />
                        </IconButton>
                        <IconButton
                          aria-label='capture screenshot'
                          color='error'
                          onClick={() => dispatch(deleteJadwalFas(item.insp_fas_id))}
                        >
                          <Icon icon='tabler:trash' />
                        </IconButton>
                        <Chip
                          size='small'
                          label='kegiatan'
                          color='secondary'
                          onClick={() => handleKegiatanOpen(item)}
                          icon={<Icon icon='tabler:circle-chevron-right' fontSize={19} />}
                        />
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
          </CardContent>
        </Collapse>
      </Card>
      {open && jadwal_id && (
        <FormAlamat jadwal_id={jadwal_id} dataForm={dataForm} open={open} handleClose={handleClose} />
      )}
      {openKeg && jadwal_id && (
        <FormJadwalKeg jadwal_id={jadwal_id} dataForm={dataKeg} open={openKeg} handleClose={handleCloseKeg} />
      )}
    </>
  )
}

export default ListAlamat
