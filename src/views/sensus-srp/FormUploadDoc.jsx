import React, { Fragment, useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { Button, Typography, Box, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'

import { useDispatch } from 'react-redux'

import CustomDialog from '@/components/widget/CustomDialog'
import { uploadSrpDok } from '@/redux-store/validasi-data'

const FormUploadDoc = ({ masterSumberId, open, handleClose }) => {
  const { register, handleSubmit } = useForm()
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => previewUrl && URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  const onDrop = acceptedFiles => {
    const selectedFile = acceptedFiles[0]

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File terlalu besar. Maksimum 5MB.')

      return
    }

    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png']
    }
  })

  const onSubmit = data => {
    if (!file) return alert('Silakan pilih dokumen terlebih dahulu.')

    const formData = new FormData()

    formData.append('file', file)
    formData.append('master_sumber_id', masterSumberId)
    formData.append('judul_dokumen', data.judul_dokumen)
    formData.append('keterangan', data.keterangan)

    //console.log('Data to upload:', formData)

    // //uploadSrpDok
    dispatch(uploadSrpDok({ master_sumber_id: masterSumberId, dokumen: file, ...data }))

    handleClose()
  }

  return (
    <Fragment>
      <CustomDialog open={open} handleClose={handleClose} title='Upload Dokumen' maxWidth='xs'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                {...register('judul_dokumen', { required: 'Judul wajib diisi' })}
                fullWidth
                label='Judul Dokumen'
                variant='outlined'
              />
            </Grid>
            <Grid size={12}>
              <TextField
                {...register('keterangan', { required: 'Keterangan wajib diisi' })}
                fullWidth
                label='Keterangan'
                variant='outlined'
              />
            </Grid>
            <Grid size={12}>
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed #aaa',
                  padding: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: isDragActive ? '#f0f0f0' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <input {...getInputProps()} />
                <Typography variant='body1'>
                  {isDragActive
                    ? 'Lepaskan file di sini...'
                    : 'Tarik & jatuhkan dokumen di sini, atau klik untuk memilih'}
                </Typography>
                <Typography variant='caption' color='textSecondary'>
                  Format diperbolehkan: PDF, JPG, PNG. Maks 5MB.
                </Typography>
              </Box>
              {previewUrl && (
                <Box mt={2}>
                  <Typography variant='subtitle2'>Preview:</Typography>
                  {file?.type.startsWith('image/') ? (
                    <img
                      src={previewUrl}
                      alt='preview'
                      style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
                    />
                  ) : (
                    <iframe src={previewUrl} title='PDF preview' width='100%' height='300px' />
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
          <Box mt={3} display='flex' justifyContent='flex-end'>
            <Button variant='contained' color='primary' type='submit'>
              Upload
            </Button>
          </Box>
        </form>
      </CustomDialog>
    </Fragment>
  )
}

export default FormUploadDoc
