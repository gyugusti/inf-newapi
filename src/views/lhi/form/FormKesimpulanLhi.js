import { useState, forwardRef, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

import CustomTextField from '@/@core/components/mui/TextField'

const FormKesimpulanLhi = () => {
  const dispatch = useDispatch()

  const defaultValues = {
    tgl_komitmen: '',
    saran_peningkatan: '',
    praktek_baik: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (isEditing) {
      //   dispatch(editInkf({ inkf_id: inkf_id, dataform }))
    } else {
      console.log(dataform)
    }
  }

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid size={{ xs: 12, sm: 6 }} marginTop={1}>
              <Controller
                name='saran_peningkatan'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    multiline
                    maxRows={2}
                    minRows={2}
                    value={value}
                    label='Saran Peningkatan Kinerja Keselamatan dan Keamanan'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.saran_peningkatan)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.saran_peningkatan && {
                      helperText: 'This field is required'
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} marginTop={2}>
              <Controller
                name='praktek_baik'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    multiline
                    maxRows={2}
                    minRows={2}
                    value={value}
                    label='Praktek keselamatan dan keamanan yang baik (Good Practice)'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.praktek_baik)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.praktek_baik && {
                      helperText: 'This field is required'
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} marginTop={2}>
              <Controller
                name='tgl_komitmen'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  let vals = value

                  if (value === '0000-00-00') {
                    vals = null
                  }

                  const formattedDate = vals ? new Date(vals) : null

                  return (
                    <AppReactDatepicker
                      dateFormat='yyyy-MM-dd'
                      selected={formattedDate}
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      placeholderText='MM/DD/YYYY'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={val => onChange(new Date(val))}
                          label='Tanggal Komitmen Tindak Lanjut'
                          error={Boolean(errors.tgl_komitmen)}
                          aria-describedby='validation-basic-dob'
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>

            <Grid container spacing={5} marginTop={2}>
              <Grid size={{ xs: 12 }}>
                <Button type='submit' variant='contained' sx={{ float: 'right' }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default FormKesimpulanLhi
