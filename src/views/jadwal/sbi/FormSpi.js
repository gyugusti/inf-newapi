import React, { forwardRef, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, IconButton, Checkbox } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react/dist/iconify.js'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'


import { format } from 'date-fns/format'

import { useForm, Controller } from 'react-hook-form'

import { useSession } from 'next-auth/react'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'

import { getPenandatangan } from '@/redux-store/referensi-balis'
import { createSpi, editSbi, editSpi } from '@/redux-store/sbi'

const FormSpi = ({ dataForm, dataSurat, open, edit, handleClose }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [ttd, setTtd] = useState('')
  const [nip, setNip] = useState(dataSurat.nip_ttd)
  const [namaCetak, setNamaCetak] = useState(dataSurat.nama_cetak)
  const [jabatan, setJabatan] = useState(dataSurat.jabatan_ttd)
  const { listTtd, listAlamat } = useSelector(store => store.refbalis)

  useEffect(() => {
    dispatch(getPenandatangan())
  }, [dispatch])

  console.log(dataSurat)

  const defaultValues = {
    tgl_surat: dataSurat ? dataSurat.tgl_surat : '',
    no_surat: dataSurat ? dataSurat.no_surat : '',
    jabatan_ttd: dataSurat ? dataSurat.jabatan_ttd : jabatan,
    nip_ttd: dataSurat ? dataSurat.nip_ttd : nip,
    ttd_id: dataSurat ? dataSurat.ttd_id : ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ defaultValues })

  const onSubmit = datas => {
    const dataform = {
      ...datas,
      jadwal_id: dataForm.jadwal_id,
      tgl_surat: format(new Date(datas.tgl_surat), 'yyyy-MM-dd'),
      user_id: session?.user?.id,
      jabatan_ttd: jabatan,
      nip_ttd: nip,
      nama_cetak: namaCetak
    }

    if (edit) {
      dispatch(editSpi({ id: dataSurat.surat_id, dataform }))
    } else {
      dispatch(createSpi(dataform))
    }

    handleClose()
  }

  const CustomCloseButton = styled(IconButton)(({ theme }) => ({
    top: 0,
    right: 0,
    color: 'grey.500',
    position: 'absolute',
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.paper} !important`,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      transform: 'translate(7px, -5px)'
    }
  }))

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
  })

  return (
    <Dialog
      fullWidth
      open={open}
      scroll='body'
      maxWidth='lg'
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <CustomCloseButton onClick={handleClose}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1rem !important'
        }}
      >
        Form SPI
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='tgl_surat'
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
                          label='Tanggal Surat'
                          error={Boolean(errors.tgl_surat)}
                          aria-describedby='validation-basic-dob'
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='ttd_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='Penandatangan'
                    SelectProps={{
                      value: value,
                      onChange: e => {
                        onChange(e)
                        const selectedItem = listTtd.find(item => item.ttd_id === e.target.value)

                        if (selectedItem) {
                          setTtd(selectedItem.ttd_id)
                          setNip(selectedItem.nip)
                          setNamaCetak(selectedItem.nama_cetak)
                          setJabatan(selectedItem.jabatan)

                          // Update the form values explicitly
                          // Update the form values explicitly
                          setValue('jabatan_ttd', selectedItem.jabatan)
                          setValue('nip_ttd', selectedItem.nip)
                        }
                      }
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.ttd_id)}
                    aria-describedby='validation-basic-select'
                    {...(errors.ttd_id && { helperText: 'This field is required' })}
                  >
                    {listTtd.map((item, index) => {
                      const { ttd_id, nama, nip, nama_cetak, jabatan } = item

                      return (
                        <MenuItem key={index} value={ttd_id}>
                          {nama}
                        </MenuItem>
                      )
                    })}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='jabatan_ttd'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Jabatan'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.jabatan_ttd)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.jabatan_ttd && {
                      helperText: 'This field is required'
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='nip_ttd'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Nip'
                    onChange={onChange}
                    placeholder=''
                    name='nip_ttd'
                  />
                )}
              />
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

export default FormSpi
