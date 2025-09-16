import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import FormTabel from '@/components/lvkf/FormTabel'

const ContohForm = ({ data, open, handleClose, tabelHeader, tipeKolom, strukturTabel }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    catatan_koordinator: data.catatan_koordinator ? data.catatan_koordinator : ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      handleClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.2rem !important'
        }}
      >
        Form {data.nama}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={12}>
            <Grid size={{ xs: 12, sm: 12 }}>
              {strukturTabel.map((datas, index) =>
                datas.kolom.map((prop, propIndex) => (
                  <div key={propIndex} style={{ margin: 10 }}>
                    <Controller
                      name={prop.nama}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <FormTabel
                          data={prop}
                          tipe={prop.tipe}
                          value={value}
                          label={prop.label}
                          onChange={onChange}
                          placeholder=''
                          error={Boolean(errors.uraian)}
                        />
                      )}
                    />
                  </div>
                ))
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='tonal' color='primary' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ContohForm
