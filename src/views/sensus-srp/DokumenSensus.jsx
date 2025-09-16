import { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogContent,
  Box,
  Button
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch } from 'react-redux'

import { downloadDokfile, setNamadoc } from '@/redux-store/pdf'

const DokumenSensus = ({ listDokumenSrp }) => {
  const dispatch = useDispatch()

  const [previewUrl, setPreviewUrl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickDownload = (id, nama) => {
    dispatch(setNamadoc(nama))
    dispatch(downloadDokfile(id)).then(result => {
      if (downloadDokfile.fulfilled.match(result)) {
        const blob = result.payload
        const fileUrl = URL.createObjectURL(blob)

        setPreviewUrl(fileUrl)
        setOpenDialog(true)
      } else {
        alert('Gagal mengunduh file.')
      }
    })
  }

  const handleCloseDialog = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setOpenDialog(false)
  }

  // Optional: cleanup on component unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

    const handleUpload = () => {
    }

  return (
    <>
    <Button variant='contained' color='error' onClick={handleUpload}>
                            upload doc
                          </Button>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>Jenis Dokumen </TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Registrasi Dokumen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listDokumenSrp &&
              listDokumenSrp.map((item, index) => {
                const jenisDokumen =
                  item.jenis_dokumen_id === 1 ? 'Foto SRP' : item.jenis_dokumen_id === 2 ? 'Sertifikat' : 'Lainnya' // Default jika ada jenis lain

                return (
                  <TableRow key={index}>
                    <TableCell scope='row'>{index + 1}</TableCell>
                    <TableCell>{jenisDokumen}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>
                      {item.reg_doc.length > 0
                        ? item.reg_doc.map((doc, idx) => (
                            <div key={idx}>
                              {doc.data_dok && (
                                <>
                                  <IconButton
                                    color='primary'
                                    onClick={() =>
                                      handleClickDownload(doc.data_dok.dok_file_id, doc.data_dok.nama_file)
                                    }
                                  >
                                    <Icon icon='tabler:download' fontSize={20} />
                                  </IconButton>
                                  <label htmlFor='' fontSize={1}>
                                    {doc.data_dok.nama_file}
                                  </label>
                                </>
                              )}
                            </div>
                          ))
                        : 'Tidak ada dokumen'}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='lg' fullWidth>
        <DialogContent>
          {previewUrl ? (
            <iframe src={previewUrl} width='100%' height='600px' style={{ border: 'none' }} title='File Preview' />
          ) : (
            'Tidak ada file untuk ditampilkan.'
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DokumenSensus

