import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Paper,
  IconButton,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer
} from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import { deleteKelompok, getkelKegiatan, setTab } from '@/redux-store/admin-referensi/kelompok-kegiatan'
import ModalKegiatan from './kelompok-kegiatan/ModalKegiatan'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'


function KelKegiatanContainer() {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleClose = () => setOpen(false)

  const handleFormOpen = () => {
    setDataForm()
    setOpen(true)
  }

  const handleEdit = dataedit => {
    setDataForm(dataedit)
    setEdit(true)
    setOpen(true)
  }

  const handleEditClose = () => setEdit(false)

  const handleDeleteClick = data => {
    setDataId(data.kelompok_id)
    setShowConfirmationDel(true)
  }

  const { kelompokKegiatan, current_page, per_page, tab } = useSelector(store => store.kelKegiatan)

  useEffect(() => {
    dispatch(getkelKegiatan())
  }, [dispatch, tab])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Kel.ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Jumlah Kegiatan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kelompokKegiatan.map((item, index) => {
              const { kelompok_id, nama, kegiatan_count } = item

              return (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `/admin-referensi/kel-kegiatan/${kelompok_id}`,
                        query: { nama: nama }
                      }}
                      title='list kegiatan'
                    >
                      <IconButton color='primary'>
                        <Icon icon='tabler:list' fontSize={20} />
                      </IconButton>
                    </Link>
                    {kegiatan_count === 0 && (
                      <>
                        <IconButton color='primary' onClick={() => handleEdit(item)}>
                          <Icon icon='tabler:edit' fontSize={20} />
                        </IconButton>
                        <IconButton color='primary' onClick={() => handleDeleteClick(item)}>
                          <Icon icon='tabler:trash' fontSize={20} />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                  <TableCell>{kelompok_id}</TableCell>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{kegiatan_count}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant='contained' size='medium' onClick={() => handleFormOpen()}>
        <Icon icon='tabler:plus' /> Tambah Kelompok Kegiatan Baru
      </Button>
      {open && <ModalKegiatan data={dataForm} edit={edit} open={open} handleClose={handleClose} />}

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          if (dataId !== 'no') {
            console.log(dataId)
            dispatch(deleteKelompok(dataId))
            dispatch(setTab(dataId))
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default KelKegiatanContainer
