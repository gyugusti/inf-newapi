import { forwardRef, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import Button from '@mui/material/Button'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useSession } from 'next-auth/react'

import CustomTextField from '@/@core/components/mui/TextField'
import Loading from '@/components/Loading'
import { resetSaveSuccess, validasiSrpSimpan } from '@/redux-store/validasi-data'

const FormValidasiSrp = ({ detailRegsrp, id, mastersumber }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { data: session } = useSession()
  const username = session?.user?.name || ''

  const { isLoading, saveSuccess } = useSelector(store => store.validasiData)

  const defaultValues = {
    flag_valid: detailRegsrp ? detailRegsrp.flag_valid : '',
    flag_lengkap: detailRegsrp ? detailRegsrp.flag_lengkap : '',
    catatan: detailRegsrp?.catatan ?? '', // Pastikan tidak null
    catatan_lengkap: detailRegsrp?.catatan_lengkap ?? ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues })

  useEffect(() => {
    if (detailRegsrp) {
      reset({
        flag_valid: detailRegsrp.flag_valid || '',
        flag_lengkap: detailRegsrp.flag_lengkap || '',
        catatan: detailRegsrp.catatan ?? '',
        catatan_lengkap: detailRegsrp.catatan_lengkap ?? ''
      })
    }
  }, [detailRegsrp, reset])

  const onSubmit = data => {
    const dataform = {
      ...data,
      master_sumber_id: mastersumber ? Number(mastersumber) : '',
      username: username
    }

    dispatch(validasiSrpSimpan({ id, dataform }))
  }

  // ⏳ Tunggu simpan berhasil lalu redirect
  useEffect(() => {
    if (saveSuccess && !isLoading) {
      const tujuan = detailRegsrp?.tahap_reg_id === 1 ? '/validasi-srp' : '/koor-validasi-srp'

      router.push(tujuan)

      dispatch(resetSaveSuccess())
    }
  }, [saveSuccess, isLoading, detailRegsrp?.tahap_reg_id, dispatch, router])

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  if (isLoading) {
    return <Loading />
  }

  if (!detailRegsrp) {
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
          <Grid item='true' xs={12} sm={6}>
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
          <Grid item='true' xs={12} sm={6}>
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
          <Grid item='true' xs={12} sm={6}>
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

        {[1, 2].includes(detailRegsrp.tahap_reg_id) && (
          <Grid item='true' xs={12}>
            <Button type='submit' variant='contained' sx={{ float: 'right' }}>
              Submit
            </Button>
          </Grid>
        )}
      </form>
    </>
  )
}

export default FormValidasiSrp
