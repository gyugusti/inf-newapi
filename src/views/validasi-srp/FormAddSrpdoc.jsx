import React, { Fragment, useState, useEffect } from 'react'

import {
  DialogActions,
  Button,
  Box,
  Pagination,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  TextField
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

import { toast } from 'react-toastify'

import { getDokumen, changePage } from '@/redux-store/referensi-balis'
import { insertDocSumber } from '@/redux-store/validasi-data'
import { useSettings } from '@/@core/hooks/useSettings'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'

const FormAddSrpdoc = ({ regsrpId, fasId, open, handleClose }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const username = session?.user?.name || ''
  const bgColors = useSettings()

  const { listDokumen, isLoading, numOfPages, total, per_page, current_page } = useSelector(store => store.refbalis)

  // Jenis dokumen per dokumen
  const [jenisDokumenMap, setJenisDokumenMap] = useState({})

  useEffect(() => {
    if (fasId) {
      dispatch(getDokumen(fasId))
    }
  }, [dispatch, fasId])

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  const handleChangeJenisDokumen = (dok_file_id, value) => {
    setJenisDokumenMap(prev => ({ ...prev, [dok_file_id]: value }))
  }

  const handlePilihDokumen = id => {
    const jenisDokumen = jenisDokumenMap[id]

    if (!jenisDokumen) {
      toast.error('Silakan pilih jenis dokumen terlebih dahulu.')

      return
    }

    const dataform = {
      reg_srp_id: regsrpId,
      username: username,
      dok_file_id: id,
      jenis_dokumen_id: jenisDokumen
    }

    dispatch(insertDocSumber(dataform))
    handleClose()
  }

  return (
    <Dialog
      fullWidth
      maxWidth='lg'
      open={open}
      onClose={handleClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1000 } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.2rem !important'
        }}
      >
        Pilih Dokumen Sumber
      </DialogTitle>

      <DialogContent>
        {/* Tabel Dokumen */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow sx={{ backgroundColor: bgColors.primaryColor }}>
                <TableCell component='th'>NO</TableCell>
                <TableCell>Nama File</TableCell>
                <TableCell>Uraian File</TableCell>
                <TableCell>Jenis Dokumen</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listDokumen.map((item, index) => {
                const { dok_file_id, nama_file, uraian_file } = item
                const selectedJenis = jenisDokumenMap[dok_file_id] || ''

                return (
                  <Fragment key={dok_file_id}>
                    <TableRow>
                      <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                      <TableCell>
                        {nama_file} <br /> ID: {dok_file_id}
                      </TableCell>
                      <TableCell>{uraian_file}</TableCell>
                      <TableCell>
                        <TextField
                          select
                          fullWidth
                          size='small'
                          label='Jenis Dokumen'
                          value={selectedJenis}
                          onChange={e => handleChangeJenisDokumen(dok_file_id, e.target.value)}
                        >
                          <MenuItem value=''>Pilih Jenis Dokumen</MenuItem>
                          <MenuItem value='1'>Foto</MenuItem>
                          <MenuItem value='2'>Sertifikat</MenuItem>
                        </TextField>
                      </TableCell>
                      <TableCell padding='checkbox'>
                        <Button
                          variant='tonal'
                          color='primary'
                          size='small'
                          onClick={() => handlePilihDokumen(dok_file_id)}
                        >
                          <Icon icon='tabler:select' fontSize={15} />
                          Pilih
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination color='primary' count={numOfPages} page={current_page} onChange={handlePageChange} />

        {/* Dialog Actions */}
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default FormAddSrpdoc
