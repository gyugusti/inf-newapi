import React, { useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { format } from 'date-fns/format'
import { styled } from '@mui/material/styles'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import PilihTldLhi from '../form/PilihTldLhi'
import FormTldLhi from '../form/FormTldLhi'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { deleteLhiDosis } from '@/redux-store/lhi/dataLhi'
import { setTab } from '@/redux-store/lhi'

const Tld = ({ data, detailLhi, action }) => {
  const dispatch = useDispatch()

  const tanggalLhi = '2022-07-25'
  const tahun = format(new Date(tanggalLhi), 'yyyy')

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  const [dataLhi, setDataLhi] = useState()
  const [dataEdit, setDataEdit] = useState()

  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleModalOpen = () => {
    setDataLhi(detailLhi)
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
          Tarik Data Dosis
        </Button>
      )}

      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell rowSpan={2}>No </StyledTableCell>
            <StyledTableCell rowSpan={2}>Nama Pekerja</StyledTableCell>
            <StyledTableCell rowSpan={2}>NPR </StyledTableCell>
            <StyledTableCell colSpan={5}>Dosis </StyledTableCell>
            {action === 'non-view' ? <StyledTableCell rowSpan={2}>Action </StyledTableCell> : null}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{tahun} </StyledTableCell>
            <StyledTableCell>{tahun - 1} </StyledTableCell>
            <StyledTableCell>{tahun - 2} </StyledTableCell>
            <StyledTableCell>{tahun - 3} </StyledTableCell>
            <StyledTableCell>{tahun - 4} </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.data.map((rows, index) => {
            return (
              <TableRow key={index}>
                <StyledTableCell>{index + 1} </StyledTableCell>
                <StyledTableCell>{rows.nama}</StyledTableCell>
                <StyledTableCell>{rows.pek_id_npr ? rows.pek_id_npr : '-'}</StyledTableCell>
                <StyledTableCell>{rows.dosis_berjalan}</StyledTableCell>
                <StyledTableCell>{rows.dosis_n1}</StyledTableCell>
                <StyledTableCell>{rows.dosis_n2}</StyledTableCell>
                <StyledTableCell>{rows.dosis_n3}</StyledTableCell>
                <StyledTableCell>{rows.dosis_n4}</StyledTableCell>
                {action === 'non-view' ? (
                  <StyledTableCell>
                    <IconButton color='primary' onClick={() => handleEdit(rows)}>
                      <Icon icon='tabler:edit' fontSize={20} />
                    </IconButton>
                    <IconButton color='primary' onClick={() => handleDeleteClick(rows.id)}>
                      <Icon icon='tabler:trash' fontSize={20} />
                    </IconButton>{' '}
                  </StyledTableCell>
                ) : null}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {open && <PilihTldLhi data={dataLhi} open={open} handleClose={handleModalClose} />}

      {edit && <FormTldLhi data={dataEdit} open={edit} edit={edit} handleClose={handleEditClose} />}

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          if (dataId !== 'no') {
            dispatch(deleteLhiDosis({ id: dataId }))
            dispatch(setTab(dataId))
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default Tld
