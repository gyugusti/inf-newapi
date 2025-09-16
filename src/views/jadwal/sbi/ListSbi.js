import { useState } from 'react'

// ** MUI Imports
import Link from 'next/link'

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

import { TableContainer } from '@mui/material'

import { deleteJadwalFas } from '@/redux-store/jadwal'
import FormAlamat from '../fas/FormAlamat'
import FormSbi from './FormSbi'

const ListSbi = ({ detail }) => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  const [dataForm, setDataForm] = useState()
  const [dataFas, setDataFas] = useState()
  const [dataTujuan, setDataTujuan] = useState()
  const [dataSurat, setDataSurat] = useState()

  const jadwal_id = detail.jadwal_id

  console.log(detail.jadwal_fas)

  // Handle Edit dialog
  const handleClickOpen = (data, tujuan, fas) => {
    setDataForm(data)
    setDataFas(fas)
    setDataTujuan(tujuan)
    setOpen(true)
  }

  const handleClickEdit = (data, tujuan, fas, surat) => {
    setDataForm(data)
    setDataFas(fas)
    setDataTujuan(tujuan)
    setDataSurat(surat)
    setOpen(true)
    setEdit(true)
  }

  const handleClose = () => setOpen(false)

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
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell component='th'>No</TableCell>
                    <TableCell> Fasilitas </TableCell>
                    <TableCell> Kegiatan </TableCell>
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
                        <TableCell>
                          {item.sifat?.nama} <br />
                          {item.jadwalTujuan &&
                            item.jadwalTujuan.map((kel, index) => (
                              <span style={{ color: 'green' }} key={index}>
                                {kel.kelompok.nama}
                              </span>
                            ))}
                        </TableCell>
                        <TableCell>
                          {item.data_surat ? (
                            <>
                              <IconButton
                                color='primary'
                                onClick={() => handleClickEdit(detail, item.jadwalTujuan, item, item.data_surat)}
                              >
                                <Icon icon='tabler:edit' fontSize={20} />
                              </IconButton>
                              <IconButton
                                component={Link}
                                href={{ pathname: '/cetak/sbi', query: { id: tujuan.data_surat.surat_id } }}
                                color='success'
                                target='_self'
                              >
                                <Icon icon='tabler:file' fontSize={20} />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              color='success'
                              onClick={() => handleClickOpen(detail, item.jadwalTujuan, item)}
                            >
                              <Icon icon='tabler:square-plus' fontSize={30} />
                            </IconButton>
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
          </CardContent>
        </Collapse>
      </Card>
      {open && jadwal_id && (
        <FormSbi
          jadwal_id={jadwal_id}
          dataFas={dataFas}
          dataTujuan={dataTujuan}
          dataForm={dataForm}
          dataSurat={dataSurat}
          open={open}
          handleClose={handleClose}
          edit={edit}
        />
      )}
    </>
  )
}

export default ListSbi
