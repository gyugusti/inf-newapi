import React, { Fragment, forwardRef, useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  Checkbox
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Icon } from '@iconify/react/dist/iconify.js'
import Fade from '@mui/material/Fade'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import { useDispatch, useSelector } from 'react-redux'

import { getkelKegiatan } from '@/redux-store/admin-referensi/kelompok-kegiatan'
import { createJadwalKeg } from '@/redux-store/jadwal'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const FormJadwalKeg = ({ jadwal_id, dataForm, open, handleClose }) => {
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = useState([])

  const jadwalTujuan = dataForm.jadwalTujuan

  const { kelompokKegiatan, current_page, per_page } = useSelector(store => store.kelKegiatan)

  const handleSubmit = e => {
    e.preventDefault()

    const rowValues = []
    const rowGroup = document.querySelectorAll('#loop .row')

    rowGroup.forEach(row => {
      const checkboxValues = []
      const checkboxGroup = row.querySelectorAll('input[type="checkbox"]')

      checkboxGroup.forEach(checkbox => {
        if (checkbox.checked) {
          checkboxValues.push(checkbox.value)
        }
      })

      rowValues.push({
        checkboxValues
      })
    })

    const nonEmptyObjects = rowValues.filter(obj => obj.checkboxValues.length > 0)
    var newArray = []

    nonEmptyObjects.forEach(function (obj) {
      newArray.push(obj.checkboxValues[0])
    })

    dispatch(createJadwalKeg({ insp_fas_id: dataForm.insp_fas_id, kelompok_id: newArray }))
    handleClose()
  }

  useEffect(() => {
    const kelompokIds = jadwalTujuan.map(item => item.kelompok_id)

    setSelectedRows(kelompokIds)
  }, [jadwalTujuan])

  const handleRowCheckboxChange = rowId => {
    const selectedIndex = selectedRows.indexOf(rowId)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, rowId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1))
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1))
    }

    setSelectedRows(newSelected)
  }

  // Function to handle checkbox click
  const handleCheckboxClick = (event, rowId) => {
    event.stopPropagation() // Prevent row selection when checkbox is clicked
    handleRowCheckboxChange(rowId)
  }

  useEffect(() => {
    dispatch(getkelKegiatan())
  }, [dispatch])

  return (
    <Dialog
      fullWidth
      open={open}
      scroll='body'
      maxWidth='lg'
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <CustomCloseButton onClick={handleClose}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <DialogTitle
        id='user-view-edit'
        sx={{
          //  textAlign: 'center',
          fontSize: '1rem !important'
        }}
      >
        <Grid container spacing={1}>
          <Grid size={{ xs: 3, sm: 3 }}>Fasilitas</Grid>
          <Grid size={{ xs: 1, sm: 1 }}>:</Grid>
          <Grid size={{ xs: 8, sm: 9 }}>
            {dataForm.fas.nama} , {dataForm.alamat?.alamat}
          </Grid>
        </Grid>
      </DialogTitle>
      <form id='myForm' onSubmit={handleSubmit}>
        <div id='loop'>
          <DialogContent>
            <Fragment>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                  <TableHead>
                    <TableRow>
                      <TableCell component='th'>NO</TableCell>
                      <TableCell>KelompoK Kegiatan</TableCell>
                      <TableCell>Pilih</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {kelompokKegiatan.map((item, index) => {
                      const { kelompok_id, nama } = item

                      return (
                        <Fragment key={index}>
                          <TableRow key={index} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{nama}</TableCell>
                            <TableCell>
                              <Checkbox
                                className='row'
                                name='pilih[]'
                                value={kelompok_id}
                                checked={selectedRows.includes(kelompok_id)}
                                onChange={e => handleCheckboxClick(e, kelompok_id)}
                              />
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fragment>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 4 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  )
}

export default FormJadwalKeg
