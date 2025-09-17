import { useState, forwardRef, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { Box } from '@mui/material'

import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useSession } from 'next-auth/react'

import { integer } from 'valibot'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

import CustomTextField from '@/@core/components/mui/TextField'
import { validasiSrpSimpan, resetSaveSuccess, validasiSensusSimpan } from '@/redux-store/validasi-data'
import Loading from '@/components/Loading'

const FormSensus = ({ detailSrp, id }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { data: session } = useSession()
  const username = session?.user?.name || ''

  const { isLoading, saveSuccess } = useSelector(store => store.validasiData)

  const defaultValues = {
    flag_valid: detailSrp ? detailSrp.flag_valid : '',
    flag_lengkap: detailSrp ? detailSrp.flag_lengkap : '',
    catatan: detailSrp?.catatan ?? '', // Pastikan tidak null
    catatan_lengkap: detailSrp?.catatan_lengkap ?? ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues })

  useEffect(() => {
    if (detailSrp) {
      reset({
        flag_valid: detailSrp.flag_valid || '',
        flag_lengkap: detailSrp.flag_lengkap || '',
        catatan: detailSrp.catatan ?? '',
        catatan_lengkap: detailSrp.catatan_lengkap ?? ''
      })
    }
  }, [detailSrp, reset])

  const onSubmit = data => {
    const dataform = {
      ...data,
      username: username
    }

    dispatch(validasiSensusSimpan({ id, dataform }))
  }

  // ⏳ Tunggu simpan berhasil lalu redirect
  useEffect(() => {
    if (saveSuccess && !isLoading) {
      const tujuan = `/sensus-srp/${id}`

      router.push(tujuan)

      dispatch(resetSaveSuccess())
    }
  }, [saveSuccess, isLoading, dispatch, router, id])

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  if (isLoading) {
    return <Loading />
  }

  if (!detailSrp) {
    return <Loading />
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={4}
          mt={1}
          sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: { xs: 2, md: 4 },
            overflow: 'hidden',
            whiteSpace: 'normal',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* VALIDITAS */}
          <Grid size={{ xl: 12, md: 6, xs: 12, sm: 12 }} paddingRight={2}>
            <FormControl error={Boolean(errors.konfirmasi)} fullWidth>
              <FormLabel sx={{ mb: 1 }}>
                <b>Validitas</b>
              </FormLabel>
              <Controller
                name='flag_valid'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup row {...field} name='flag_valid'>
                    <FormControlLabel
                      value='1'
                      label='Valid'
                      control={<Radio sx={errors.flag_valid ? { color: 'error.main' } : null} />}
                      sx={errors.flag_valid ? { color: 'error.main' } : null}
                    />
                    <FormControlLabel
                      value='-1'
                      label='Tidak Valid'
                      control={<Radio sx={errors.flag_valid ? { color: 'error.main' } : null} />}
                      sx={errors.flag_valid ? { color: 'error.main' } : null}
                    />
                  </RadioGroup>
                )}
              />
              {errors.flag_valid && <FormHelperText sx={{ color: 'error.main' }}>Harus dipilih...</FormHelperText>}
            </FormControl>
          </Grid>

          {/* CATATAN VALIDASI */}
          <Grid item='true' size={{ xs: 12, sm: 6 }}>
            <Controller
              name='catatan'
              control={control}
              rules={{ required: true }}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  fullWidth
                  multiline
                  maxRows={2}
                  minRows={2}
                  value={value}
                  label='Catatan Validasi'
                  onChange={onChange}
                  error={Boolean(errors.catatan)}
                  {...(errors.catatan && {
                    helperText: 'Field Tidak Boleh Kosong'
                  })}
                />
              )}
            />
          </Grid>
        </Grid>
        {/* KELENGKAPAN */}
        <Grid
          container
          spacing={4}
          mt={1}
          sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: { xs: 2, md: 4 },
            overflow: 'hidden',
            whiteSpace: 'normal',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Grid item='true' size={{ xs: 12, sm: 6 }}>
            <FormControl error={Boolean(errors.konfirmasi)} fullWidth>
              <FormLabel sx={{ mb: 1 }}>
                <b>Kelengkapan</b>
              </FormLabel>
              <Controller
                name='flag_lengkap'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup row {...field} name='flag_lengkap'>
                    <FormControlLabel
                      value='1'
                      label='Lengkap'
                      control={<Radio sx={errors.flag_lengkap ? { color: 'error.main' } : null} />}
                      sx={errors.flag_lengkap ? { color: 'error.main' } : null}
                    />
                    <FormControlLabel
                      value='-1'
                      label='Tidak Lengkap'
                      control={<Radio sx={errors.flag_lengkap ? { color: 'error.main' } : null} />}
                      sx={errors.flag_lengkap ? { color: 'error.main' } : null}
                    />
                  </RadioGroup>
                )}
              />
              {errors.flag_lengkap && <FormHelperText sx={{ color: 'error.main' }}>Harus dipilih...</FormHelperText>}
            </FormControl>
          </Grid>

          {/* CATATAN KELENGKAPAN */}
          <Grid item='true' size={{ xs: 12, sm: 6 }}>
            <Controller
              name='catatan_lengkap'
              control={control}
              rules={{ required: true }}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  fullWidth
                  multiline
                  maxRows={2}
                  minRows={2}
                  value={value}
                  label='Catatan Kelengkapan'
                  onChange={onChange}
                  error={Boolean(errors.catatan_lengkap)}
                  {...(errors.catatan_lengkap && {
                    helperText: 'Field Tidak Boleh Kosong'
                  })}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item='true' size={{ xs: 12 }}>
          <Button type='submit' variant='contained' sx={{ float: 'right' }}>
            Submit
          </Button>
        </Grid>
      </form>
    </>
  )
}

export default FormSensus
