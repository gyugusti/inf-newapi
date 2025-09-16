import React, { useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { format } from 'date-fns/format'
import { styled } from '@mui/material/styles'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import PilihKesehatanFihi from '../form/PilihKesehatanFihi'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { setTab } from '@/redux-store/fihi'
import { deleteFihiKes } from '@/redux-store/fihi/dataFihi'
import FormStorekesFihi from '../form/FormStorekesFihi'

const Kesehatan = ({ data, detailFihi, action }) => {
  const dispatch = useDispatch()
  const tanggalFihi = '2022-07-25'

  const tahun = format(new Date(tanggalFihi), 'yyyy')

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  const [dataFihi, setDataFihi] = useState()
  const [dataEdit, setDataEdit] = useState()

  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleModalOpen = () => {
    setDataFihi(detailFihi)
    setOpen(true)
  }

  const handleModalClose = () => setOpen(false)

  const handleEdit = dataedit => {
    setDataFihi(detailFihi)
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
          Tarik Data Kesehatan
        </Button>
      )}

      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell rowSpan={2}>No </StyledTableCell>
            <StyledTableCell rowSpan={2}>Nama Pekerja</StyledTableCell>
            <StyledTableCell rowSpan={2}>NPR </StyledTableCell>
            <StyledTableCell colSpan={5}>Tanggal Pemeriksaan Kesehatan (Tahun) </StyledTableCell>
            <StyledTableCell rowSpan={2}>Hasil Pemeriksaan Kesehatan Terakhir </StyledTableCell>

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
                <StyledTableCell>{rows.nama_pekerja}</StyledTableCell>
                <StyledTableCell>{rows.pek_id_npr ? rows.pek_id_npr : '-'}</StyledTableCell>
                <StyledTableCell>{rows.pemeriksaan_n}</StyledTableCell>
                <StyledTableCell>{rows.pemeriksaan_n1}</StyledTableCell>
                <StyledTableCell>{rows.pemeriksaan_n2}</StyledTableCell>
                <StyledTableCell>{rows.pemeriksaan_n3}</StyledTableCell>
                <StyledTableCell>{rows.pemeriksaan_n4}</StyledTableCell>
                <StyledTableCell>{rows.resume}</StyledTableCell>
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
      {open && <PilihKesehatanFihi data={dataFihi} open={open} handleClose={handleModalClose} />}

      {edit && (
        <FormStorekesFihi data={dataFihi} dataEdit={dataEdit} open={edit} edit={edit} handleClose={handleEditClose} />
      )}

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          if (dataId !== 'no') {
            dispatch(deleteFihiKes({ id: dataId }))
            dispatch(setTab(dataId))
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default Kesehatan
