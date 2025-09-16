import React, { useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { styled } from '@mui/material/styles'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import PilihSumberLhi from '../form/PilihSumberLhi'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import FormSrpLhi from '../form/FormSrpLhi'
import { deleteLhiSumber } from '@/redux-store/lhi/dataLhi'
import { setTab } from '@/redux-store/lhi'

const SrpIzin = ({ data, detailLhi, action }) => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [editSrp, setEditSrp] = useState(false)

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
            <StyledTableCell>Nama </StyledTableCell>
            <StyledTableCell>Tipe </StyledTableCell>
            <StyledTableCell>No Seri </StyledTableCell>
            <StyledTableCell>Aktivitas / Tgl Aktivitas </StyledTableCell>
            <StyledTableCell>kv-ma </StyledTableCell>
            <StyledTableCell>No KTUN </StyledTableCell>
            <StyledTableCell>Tgl Berlaku </StyledTableCell>
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
                <StyledTableCell>{rows.no_ktun}</StyledTableCell>
                <StyledTableCell>
                  {rows.tgl_berlaku && rows.tgl_berlaku !== '0000-00-00' ? rows.tgl_berlaku : '-'}
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
      {open && <PilihSumberLhi data={dataLhi} open={open} handleClose={handleModalClose} />}
      {editSrp && <FormSrpLhi data={dataEdit} edit={editSrp} handleClose={handleEditClose} />}
      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          if (dataId !== 'no') {
            dispatch(deleteLhiSumber({ id: dataId }))
            dispatch(setTab(dataId))
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default SrpIzin
