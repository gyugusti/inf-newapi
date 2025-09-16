import React, { useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { styled } from '@mui/material/styles'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import PilihSrp from './modal/PilihSrp'
import FormSrpLkf from './modal/FormSrpLkf'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { deleteLkfSumber } from '@/redux-store/lkf/dataLkf'
import { setTab } from '@/redux-store/lkf'

const SrpTanpaizin = ({ data, detailLkf, action }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [editSrp, setEditSrp] = useState(false)

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
    setEditSrp(true)
  }

  const handleEditClose = () => setEditSrp(false)

  const handleDeleteClick = id => {
    setDataId(id)
    setShowConfirmationDel(true)
  }

  return (
    <>
      {action === 'non-view' && (
        <Button variant='tonal' color='error' size='small' onClick={() => handleModalOpen()}>
          <Icon icon='tabler:rotate-rectangle' fontSize={15} />
          Tarik Data Sumber
        </Button>
      )}

      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>No </StyledTableCell>
            <StyledTableCell>Nama Sumber</StyledTableCell>
            <StyledTableCell>Tipe </StyledTableCell>
            <StyledTableCell>No Seri </StyledTableCell>
            <StyledTableCell>Aktivitas / Tgl Aktivitas </StyledTableCell>
            <StyledTableCell>Kv - Ma </StyledTableCell>
            {action === 'non-view' ? <StyledTableCell>Action </StyledTableCell> : null}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.data.map((rows, index) => {
            return (
              <TableRow key={index}>
                <StyledTableCell>{index + 1} </StyledTableCell>
                <StyledTableCell>{rows.nama}</StyledTableCell>
                <StyledTableCell>{rows.tipe}</StyledTableCell>
                <StyledTableCell>{rows.no_seri}</StyledTableCell>
                <StyledTableCell>
                  {rows.aktivitas ? (
                    <>
                      {rows.aktivitas || ''} {rows.satuan_id || ''} / {rows.tgl_aktivitas || ''}
                    </>
                  ) : (
                    '-'
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {rows.kv} / {rows.ma}
                </StyledTableCell>
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
      {open && <PilihSrp data={dataLkf} open={open} handleClose={handleModalClose} />}
      {editSrp && <FormSrpLkf data={dataEdit} edit={editSrp} handleClose={handleEditClose} />}

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          dispatch(deleteLkfSumber({ id: dataId }))
          setShowConfirmationDel(false)
          dispatch(setTab(dataId))
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default SrpTanpaizin
