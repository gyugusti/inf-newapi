import React, { useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { styled } from '@mui/material/styles'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import PilihPekerja from './modal/PilihPekerja'
import FormPekerjaLkf from './modal/FormPekerjaLkf'
import { deleteLkfPekerja } from '@/redux-store/lkf/dataLkf'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { setTab } from '@/redux-store/lkf'

const Pekerja = ({ data, detailLkf, action }) => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  const [dataLkf, setDataLkf] = useState()
  const [dataEdit, setDataEdit] = useState()

  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleModalOpen = () => {
    setDataLkf(detailLkf)
    setOpen(true)
  }

  const handleModalClose = () => setOpen(false)

  const handleEdit = dataedit => {
    setDataEdit(dataedit)
    setEdit(true)
  }

  const handleEditClose = () => setEdit(false)

  const handleDeleteClick = id => {
    setDataId(id)
    setShowConfirmationDel(true)
  }

  return (
    <>
      {action === 'non-view' && (
        <Button variant='tonal' color='error' size='small' onClick={() => handleModalOpen()}>
          <Icon icon='tabler:rotate-rectangle' fontSize={15} />
          Tambah Data Pekerja
        </Button>
      )}
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>No </StyledTableCell>
            <StyledTableCell>Nama </StyledTableCell>
            <StyledTableCell>Jenis pekerja </StyledTableCell>
            <StyledTableCell>No SIB </StyledTableCell>
            <StyledTableCell>Berlaku </StyledTableCell>
            <StyledTableCell>Keahlian </StyledTableCell>
            {action === 'non-view' ? <StyledTableCell>Action </StyledTableCell> : null}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.data.map((rows, index) => {
            return (
              <TableRow key={index}>
                <StyledTableCell>{index + 1} </StyledTableCell>
                <StyledTableCell>{rows.nama} </StyledTableCell>
                <StyledTableCell>{rows.jenis_pekerja?.nama}</StyledTableCell>
                <StyledTableCell>{rows.no_sib ? rows.no_sib : '-'}</StyledTableCell>
                <StyledTableCell>{rows.tgl_berlaku}</StyledTableCell>
                <StyledTableCell>{rows.keahlian_id}</StyledTableCell>
                {action === 'non-view' ? (
                  <StyledTableCell>
                    <IconButton color='primary' onClick={() => handleEdit(rows)}>
                      <Icon icon='tabler:edit' fontSize={20} />
                    </IconButton>
                    <IconButton color='primary' onClick={() => handleDeleteClick(rows.id)}>
                      <Icon icon='tabler:trash' fontSize={20} />
                    </IconButton>
                  </StyledTableCell>
                ) : null}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {open && <PilihPekerja data={dataLkf} open={open} handleClose={handleModalClose} />}
      {edit && <FormPekerjaLkf data={dataEdit} open={edit} edit={edit} handleClose={handleEditClose} />}

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          dispatch(deleteLkfPekerja({ id: dataId }))
          setShowConfirmationDel(false)
          dispatch(setTab(dataId))
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default Pekerja
