import React, { Fragment, useEffect, useRef, useState } from 'react'

import {
  IconButton,
  Button,
  Table,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TableBody,
  TableContainer
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { styled } from '@mui/material/styles'

import { useDispatch } from 'react-redux'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import FormTabelDinamis from './frontend/FormTabelDinamis'
import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { lkfFormTabeldelete } from '@/redux-store/lkf'

const ViewTabelDina = ({ data, lkf_id, action }) => {
  const dispatch = useDispatch()

  const tabel = data
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [dataEdit, setDataEdit] = useState()
  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleModalOpen = data => {
    setDataForm({ ...data, lkf_id: lkf_id })
    setOpen(true)
  }

  const handleEdit = dataedit => {
    setDataForm({ ...data, lkf_id: lkf_id })
    setDataEdit(dataedit)
    setOpen(true)
    setEdit(true)
  }

  const handleModalClose = () => setOpen(false)

  const handleDeleteClick = id => {
    setDataId(id)
    setShowConfirmationDel(true)
  }

  return (
    <>
      {action === 'non-view' && (
        <Button variant='contained' size='small' onClick={() => handleModalOpen(tabel)}>
          <Icon icon='tabler:plus' fontSize={15} />
          Tambah Data
        </Button>
      )}

      <TableContainer sx={{ width: '100%' }}>
        <Table sx={{ minWidth: 650, width: '100%' }} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th' rowSpan={2}>
                NO
              </StyledTableCell>
              {tabel.header.map((rows, index) => {
                const { kolom_count, nama, header_id } = rows
                let rowspan = kolom_count === 1 ? 2 : ''

                return (
                  <StyledTableCell key={index} rowSpan={rowspan} colSpan={kolom_count - 1}>
                    {nama}
                  </StyledTableCell>
                )
              })}
              {action === 'non-view' && (
                <StyledTableCell component='th' rowSpan={2}>
                  Action
                </StyledTableCell>
              )}
            </StyledTableRow>
            <StyledTableRow>
              {tabel.header.map((item, index) => {
                const { kolom, kolom_count, header_id } = item // Destructure kolom array from item

                const itemData = kolom.filter(a => a.header_id === Number(header_id) && a.label !== item.label)

                if (kolom_count > 1) {
                  return itemData.map((prop, index) => (
                    <StyledTableCell key={prop.kolom_id}>{prop.label}</StyledTableCell>
                  ))
                }
              })}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tabel.data.map((item, index) => {
              const { baris_ke, data } = item

              return (
                <TableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>

                  {tabel.header.map((datas, headerIndex) =>
                    datas.kolom.map((koloms, kolomIndex) => {
                      const itemData = data.filter(a => a.baris_ke === baris_ke && a.kolom_id === koloms.kolom_id)

                      return itemData.map((prop, propIndex) => (
                        <StyledTableCell key={`${index}-${headerIndex}-${kolomIndex}-${propIndex}`}>
                          {prop.isi_data}
                        </StyledTableCell>
                      ))
                    })
                  )}
                  {action === 'non-view' && (
                    <StyledTableCell>
                      <IconButton color='primary' onClick={() => handleEdit(item)}>
                        <Icon icon='tabler:edit' fontSize={20} />
                      </IconButton>
                      <IconButton color='primary' onClick={() => handleDeleteClick(item.baris_ke)}>
                        <Icon icon='tabler:trash' fontSize={20} />
                      </IconButton>
                    </StyledTableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <FormTabelDinamis data={dataForm} dataedit={dataEdit} open={open} handleClose={handleModalClose} edit={edit} />
      )}
      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          dispatch(lkfFormTabeldelete({ id: dataId, lkf_id: lkf_id }))
          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default ViewTabelDina
