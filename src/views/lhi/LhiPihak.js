import React, { useState } from 'react'

import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import FormPihak from './form/FormPihak'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { deleteLhiPihak, setTab } from '@/redux-store/lhi'

const LhiPihak = ({ dataLhi }) => {
  const dispatch = useDispatch()
  const { lhiPihak, isLoading } = useSelector(store => store.lhi)

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [lhiId, setLhiId] = useState()

  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleModalOpen = id => {
    setLhiId(id)
    setOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false)
    setEdit(false)
    setDataForm('')
  }

  const handleEdit = data => {
    setLhiId(data.lhi_id)
    setDataForm(data)
    setOpen(true)
    setEdit(true)
  }

  const handleDeleteClick = data => {
    setDataId(data.pihak_id)
    setShowConfirmationDel(true)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Button variant='contained' size='small' onClick={() => handleModalOpen(dataLhi.lhi_id)}>
        <Icon icon='tabler:plus' fontSize={15} />
        Input Baru
      </Button>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>Nama </TableCell>
              <TableCell>Jabatan </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>No. Telp </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lhiPihak.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{index + 1}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.jabatan} </TableCell>
                  <TableCell>{item.email} </TableCell>
                  <TableCell>{item.no_telp} </TableCell>
                  <TableCell>
                    <IconButton color='primary' onClick={() => handleEdit(item)}>
                      <Icon icon='tabler:edit' fontSize={20} />
                    </IconButton>
                    <IconButton color='primary' onClick={() => handleDeleteClick(item)}>
                      <Icon icon='tabler:trash' fontSize={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <FormPihak
          data={dataForm}
          dataLhi={dataLhi}
          lhiId={lhiId}
          open={open}
          handleClose={handleModalClose}
          edit={edit}
        />
      )}

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          if (dataId !== 'no') {
            dispatch(deleteLhiPihak({ id: dataId }))
            dispatch(setTab(dataId))
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default LhiPihak
