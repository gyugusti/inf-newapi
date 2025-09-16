import React from 'react'

import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Box } from '@mui/material'
import Grid from '@mui/material/Grid2'

import FormTabel from '@/components/lvkf/FormTabel'
import { lhiFormTabel, lhiFormTabeledit } from '@/redux-store/lhi'

const FormLhiDinamis = ({ data, dataedit, open, handleClose, edit }) => {
  const dispatch = useDispatch()

  let defaultValues

  if (edit) {
    defaultValues = data.header.reduce((acc, header) => {
      header.kolom.forEach(prop => {
        // Find the isi_data value from dataEdit array based on kolom_id
        const dataEditValue = dataedit.data.find(item => item.kolom_id === prop.kolom_id)?.isi_data || ''

        acc[prop.kolom_id] = dataEditValue
      })

      return acc
    }, {})
  } else {
    defaultValues = data.header.reduce((acc, header) => {
      header.kolom.forEach(prop => {
        acc[prop.kolom_id] = data[prop.kolom_id] || ''
      })

      return acc
    }, {})
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = datas => {
    if (datas) {
      const kolom = Object.keys(datas)
        .filter(key => datas[key] !== '') // Filter out entries with empty values
        .map(key => ({ [key]: datas[key] })) // Map to the desired format

      const dataform = {
        tabel_id: data.tabel_id,
        lhi_id: data.lhi_id,
        kolom
      }

      if (edit) {
        dispatch(lhiFormTabeledit({ id: dataedit.baris_ke, dataform }))
      } else {
        dispatch(lhiFormTabel(dataform))
      }

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
      <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.2rem !important' }}>
        Form {data.nama}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              {data.header.map((datas, index) => {
                let itemData

                // Filter to get relevant columns
                if (datas.kolom_count > 1) {
                  itemData = datas.kolom.filter(a => a.header_id === Number(datas.header_id) && a.label !== datas.label)
                } else {
                  itemData = datas.kolom
                }

                // Return the mapped itemData as JSX elements
                return itemData.map((prop, propIndex) => (
                  <Box key={propIndex} sx={{ marginBottom: 2 }}>
                    <Controller
                      name={String(prop.kolom_id || 'defaultName')} // Ensure name is a string
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
                          error={Boolean(errors[prop.kolom_id])} // Fixed error prop
                        />
                      )}
                    />
                  </Box>
                ))
              })}
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
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default FormLhiDinamis
