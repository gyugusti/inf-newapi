import { Fragment, useEffect, useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'

import { useSettings } from '@/@core/hooks/useSettings'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import { changePage, getDokumen } from '@/redux-store/referensi-balis'
import { insertDocSumber } from '@/redux-store/validasi-data'
import FormUploadDocnew from './FormUploadDocnew'

const FormDokumen = ({ regsrpId, fasId, open, jenis, handleClose, onSuccess }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const username = session?.user?.name || ''
  const bgColors = useSettings()

  const { listDokumen = [], numOfPages, per_page, current_page } = useSelector(store => store.refbalis)

  // state untuk dialog upload dokumen
  const [openUpload, setOpenUpload] = useState(false)

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

  const handlePilihDokumen = id => {
    const dataform = {
      reg_srp_id: regsrpId,
      username: username,
      dok_file_id: id,
      jenis_dokumen_id: jenis
    }

    dispatch(insertDocSumber(dataform)).then(result => {
      if (insertDocSumber.fulfilled.match(result)) {
        onSuccess?.()
        handleClose()
      }
    })
  }

  const handleOpenUpload = () => {
    setOpenUpload(true)
  }

  const handleCloseUpload = () => {
    setOpenUpload(false)
  }

  return (
    <>
      {/* Dialog Upload Dokumen */}
      {openUpload && (
        <FormUploadDocnew
          regsrpId={regsrpId}
          open={openUpload}
          jenis={jenis}
          handleClose={handleCloseUpload}
          onSuccess={() => {
            setOpenUpload(false)
          }}
        />
      )}

      {/* Dialog Pilih Dokumen */}
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
            fontSize: '1.2rem !important',
            pb: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            <span>Pilih Dokumen Sumber</span>

            <Button variant='contained' size='medium' onClick={handleOpenUpload}>
              <Icon icon='tabler:plus' fontSize='1.25rem' style={{ marginRight: 4 }} />
              Tambah Dokumen
            </Button>
          </Box>
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
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listDokumen.map((item, index) => {
                  const { dok_file_id, nama_file, uraian_file } = item

                  return (
                    <Fragment key={dok_file_id}>
                      <TableRow>
                        <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                        <TableCell>
                          {nama_file} <br /> ID: {dok_file_id}
                        </TableCell>
                        <TableCell>{uraian_file}</TableCell>

                        <TableCell padding='checkbox'>
                          <Button
                            variant='tonal'
                            color='primary'
                            size='small'
                            onClick={() => handlePilihDokumen(dok_file_id)}
                          >
                            <Icon icon='tabler:select' fontSize={15} style={{ marginRight: 4 }} />
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

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination color='primary' count={numOfPages} page={current_page} onChange={handlePageChange} />
          </Box>

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
    </>
  )
}

export default FormDokumen
