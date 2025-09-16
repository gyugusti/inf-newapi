import React, { Fragment, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import { Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useForm, Controller } from 'react-hook-form'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import Loading from '@/components/Loading'

import { changePage, getJadwalFas } from '@/redux-store/jadwal-fas'
import { createJadwalFas } from '@/redux-store/jadwal'
import AlamatTambah from './fas/AlamatTambah'
import SearchFasilitas from './SearchFasilitas'
import StyledTableCellGrey from '@/components/styles/StyledTableCellGrey'
import FloatingDialogActions from '@/components/styles/FloatingDialogActions'

const FormFasilitas = ({ jadwal_id, dataForm, open, handleClose }) => {
  const dispatch = useDispatch()

  const { jadwalFas, kab_id, propinsi_id, search, isLoading, numOfPages, current_page, per_page, tab } = useSelector(
    store => store.jadwalFas
  )

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  useEffect(() => {
    dispatch(getJadwalFas())
  }, [dispatch, current_page, tab, search, kab_id, propinsi_id])

  const handleSubmit = e => {
    e.preventDefault()

    const rowValues = []
    const rowSifat = []
    const rowFas = []
    const rowGroup = document.querySelectorAll('#loop .row')

    rowGroup.forEach(row => {
      const checkboxValues = []
      const sifatVal = []
      const fasVal = []

      const checkboxGroup = row.querySelectorAll('input[type="checkbox"]')

      checkboxGroup.forEach(checkbox => {
        if (checkbox.name === 'pilih') {
          if (checkbox.checked) {
            var sifat = document.getElementById('sifat' + checkbox.value).value
            var fas = document.getElementById('fas' + checkbox.value).value

            sifatVal.push(sifat)
            fasVal.push(fas)

            checkboxValues.push(checkbox.value)
          }
        }
      })

      rowValues.push({
        checkboxValues
      })

      rowSifat.push({
        sifatVal
      })

      rowFas.push({
        fasVal
      })
    })

    const nonEmptyObjects = rowValues.filter(obj => obj.checkboxValues.length > 0)
    var newArray = []

    nonEmptyObjects.forEach(function (obj) {
      newArray.push(obj.checkboxValues[0])
    })

    const nonEmptySifat = rowSifat.filter(obj => obj.sifatVal.length > 0)
    var newSifat = []

    nonEmptySifat.forEach(function (obj) {
      newSifat.push(obj.sifatVal[0])
    })

    const nonEmptyFas = rowFas.filter(obj => obj.fasVal.length > 0)
    var newFas = []

    nonEmptyFas.forEach(function (obj) {
      newFas.push(obj.fasVal[0])
    })

    dispatch(
      createJadwalFas({
        jadwal_id: jadwal_id,
        fas_id: newFas,
        alamat_id: newArray,
        sifat_insp_id: newSifat
      })
    )

    handleClose()
  }

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
    >
      <DialogTitle id='full-screen-dialog-title'>
        <Typography variant='h6' component='span'>
          Input Fasilitas Jadwal
        </Typography>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{ top: 8, right: 10, position: 'absolute', color: 'grey.500' }}
        >
          <Icon icon='tabler:x' />
        </IconButton>
        <SearchFasilitas />
      </DialogTitle>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <form id='myForm' onSubmit={handleSubmit}>
            <div id='loop'>
              <DialogContent
                sx={{
                  overflow: 'auto',
                  flex: 1,
                  mb: 10
                }}
              >
                <Fragment>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell component='th'>NO</StyledTableCell>
                          <StyledTableCell>Nama Fasilitas / Lokasi</StyledTableCell>
                          <StyledTableCell>Data Kegiatan/ SRP/ Izin </StyledTableCell>
                          <StyledTableCell>Terakhir Inspeksi</StyledTableCell>
                          <StyledTableCell>Draft Jadwal</StyledTableCell>
                          <StyledTableCell>Temuan</StyledTableCell>
                          <StyledTableCell>IKK</StyledTableCell>
                          <StyledTableCell>Sifat</StyledTableCell>
                          <StyledTableCell>Action </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {jadwalFas.map((item, index) => {
                          const { alamat, ikk } = item

                          return (
                            <Fragment key={index}>
                              <TableRow key={index}>
                                <StyledTableCellGrey rowSpan={alamat.length + 1}>
                                  {indexOfFirstItem + index + 1}
                                </StyledTableCellGrey>
                                <StyledTableCellGrey component='th' colSpan={9}>
                                  {item.nama} / {item.alamat_pusat?.nama}
                                </StyledTableCellGrey>
                              </TableRow>
                              {alamat && <AlamatTambah alamat={alamat} ikk={ikk} />}
                            </Fragment>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
                </Fragment>
              </DialogContent>
              <FloatingDialogActions>
                <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                  Submit
                </Button>
                <Button variant='tonal' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </FloatingDialogActions>
            </div>
          </form>
        </>
      )}
    </Dialog>
  )
}

export default FormFasilitas
