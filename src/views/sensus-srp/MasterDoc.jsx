'use client'

import React, { useEffect, useState } from 'react'

import { useParams, useSearchParams } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent,
  Pagination,
  Button,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch } from 'react-redux'

import FormUploadDoc from '@/views/sensus-srp/FormUploadDoc'
import { fullDayTime } from '@/utils/helper'
import { downloadDokfile, setNamadoc } from '@/redux-store/pdf'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { deleteSrpDok } from '@/redux-store/validasi-data'

const MasterDoc = ({ dataMasterDoc }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const [previewUrl, setPreviewUrl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const id = params.id

  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10 // bisa diubah sesuai kebutuhan
  const totalData = dataMasterDoc?.data?.length || 0

  const totalPages = Math.ceil(totalData / perPage)

  const indexOfLastItem = currentPage * perPage
  const indexOfFirstItem = indexOfLastItem - perPage

  const currentItems = dataMasterDoc?.data?.slice(indexOfFirstItem, indexOfLastItem) || []

  const startEntry = totalData === 0 ? 0 : indexOfFirstItem + 1
  const endEntry = Math.min(indexOfLastItem, totalData)

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleFormOpen = () => {
    setOpen(true)
  }

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

  const handleDeleteClick = data => {
    setDataId(data.id)
    setShowConfirmationDel(true)
  }

  return (
    <>
      <Card>
        <CardContent>
          <Button variant='contained' size='medium' onClick={() => handleFormOpen()}>
            <Icon icon='tabler:plus' /> Tambah Dokumen
          </Button>
          {open && <FormUploadDoc masterSumberId={id} open={open} handleClose={handleClose} />}
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>NO</TableCell>
                  <TableCell>Uraian</TableCell>
                  <TableCell>Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalData === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align='center'>
                      Tidak ada data MasterDoc Validasi
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                      <TableCell>{item.data_dok?.uraian_file}</TableCell>
                      <TableCell>
                        {item.data_dok && (
                          <>
                            <IconButton
                              color='primary'
                              onClick={() => handleClickDownload(item.data_dok.dok_file_id, item.data_dok.nama_file)}
                            >
                              <Icon icon='tabler:download' fontSize={20} /> &nbsp;
                              <Typography variant='body1' sx={{ mt: 0.5 }}>
                                {item.data_dok.nama_file}
                              </Typography>
                            </IconButton>
                            <IconButton color='primary' onClick={() => handleDeleteClick(item)}>
                              <Icon icon='tabler:trash' fontSize={20} />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
            <Typography color='text.disabled'>
              {`Showing ${startEntry} to ${endEntry} of ${totalData} entries`}
            </Typography>

            <Pagination
              shape='rounded'
              color='primary'
              variant='tonal'
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='lg' fullWidth>
        <DialogContent>
          {previewUrl ? (
            <iframe src={previewUrl} width='100%' height='600px' style={{ border: 'none' }} title='File Preview' />
          ) : (
            'Tidak ada file untuk ditampilkan.'
          )}
        </DialogContent>
      </Dialog>

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          if (dataId !== 'no') {
            dispatch(deleteSrpDok({ id: dataId }))
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default MasterDoc
