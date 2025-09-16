'use client'

// ** React Imports
import { forwardRef, useCallback, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import

// ** Third Party Imports

import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

// ** Icon Imports
import { Icon } from '@iconify/react/dist/iconify.js'

import CustomTextField from '@/@core/components/mui/TextField'
import { createCategori, getjenInspektur } from '@/redux-store/admin-referensi/kategori-jenjang'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

const CreateCategori = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const insp_jenjang_id = searchParams.insp_jenjang_id || ''

  const { jenjangInsp } = useSelector(store => store.kategoriJenjang)

  let jenjang = []

  if (jenjangInsp) {
    jenjang = jenjangInsp.filter(item => item.status_id === 1)
  }

  const fetchJenjang = useCallback(() => {
    dispatch(getjenInspektur())
  }, [dispatch])

  useEffect(() => {
    fetchJenjang()
  }, [fetchJenjang])

  const defaultValues = {
    insp_jenjang_id: insp_jenjang_id,
    insp_bidang_id: ''
  }

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    dispatch(createCategori(dataform))

    const queryParams = new URLSearchParams({ tab: 'kategori' }).toString()

    router.push(`/admin-referensi/kategori-jenjang?${queryParams}`)
  }

  const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Buat Kategori' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader title='Form Input Kategori Baru' />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='insp_jenjang_id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Jenjang'
                      SelectProps={{
                        value: value,
                        onChange: e => onChange(e)
                      }}
                      id='validation-basic-select'
                      error={Boolean(errors.select)}
                      aria-describedby='validation-basic-select'
                      {...(errors.select && { helperText: 'This field is required' })}
                    >
                      {jenjang.map((item, index) => {
                        const { insp_jenjang_id, nama } = item

                        return (
                          <MenuItem key={index} value={insp_jenjang_id}>
                            {nama}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='insp_bidang_id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      defaultValue=''
                      label='Bidang'
                      SelectProps={{
                        value: value,
                        onChange: e => onChange(e)
                      }}
                      id='validation-basic-select'
                      error={Boolean(errors.select)}
                      aria-describedby='validation-basic-select'
                      {...(errors.select && { helperText: 'This field is required' })}
                    >
                      <MenuItem value='1'>Instalasi Bahan Nuklir (IBN)</MenuItem>
                      <MenuItem value='2'>Fasilitas Radiasi (FRZR)</MenuItem>
                      <MenuItem value='3'> Safeguards (SG)</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button type='submit' variant='contained'>
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

CreateCategori.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default CreateCategori
