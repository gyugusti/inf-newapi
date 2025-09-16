import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DialogActions, Button, MenuItem } from '@mui/material'

import CustomDialog from '@/components/widget/CustomDialog'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import { getAlamat, getBidang, getModelSumber, getSatuan } from '@/redux-store/referensi-balis'
import { editLkfSumber } from '@/redux-store/lkf/dataLkf'
import { setTab } from '@/redux-store/lkf'

const FormSrpLkf = ({ data, edit, handleClose }) => {
  const dispatch = useDispatch()

  const [jenisSbr, setJenisSbr] = useState(data ? data.jenis_sumber_id : 1)

  const { dafSatuan, dafModelSumber } = useSelector(store => store.refbalis)

  useEffect(() => {
    dispatch(getModelSumber())
    dispatch(getSatuan())
  }, [dispatch])

  useEffect(() => {
    if (data) {
      setJenisSbr(data.jenis_sumber_id)
    }
  }, [data])

  const optSatuan = dafSatuan.map(({ satuan_id, nama_satuan }) => ({
    label: nama_satuan,
    value: satuan_id
  }))

  const optMerk = dafModelSumber.map(({ model_sumber_id, nama }) => ({
    label: nama,
    value: model_sumber_id
  }))

  const defaultValues = {
    jenis_sumber_id: data ? data.jenis_sumber_id : '',
    nama: data ? data.nama : '',
    tipe: data ? data.tipe : '',
    no_seri: data ? data.no_seri : '',
    model_sumber_id: data ? data.model_sumber_id : '',
    aktivitas: data ? data.aktivitas : '',
    tgl_aktivitas: data ? data.tgl_aktivitas : '',
    satuan_id: data ? data.satuan_id : '',
    kv: data ? data.kv : '',
    ma: data ? data.ma : '',
    no_ktun: data ? data.no_ktun : '',
    tgl_berlaku: data ? data.tgl_berlaku : ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      dispatch(editLkfSumber({ id: data.id, dataform }))
      dispatch(setTab(dataform))
      handleClose()
    }
  }

  return (
    <CustomDialog open={edit} handleClose={handleClose} title='Form Data Sumber' maxWidth='xs'>
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='jenis_sumber_id'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              select
              label='Jenis Sumber'
              value={value}
              onChange={e => {
                onChange(e)
                setJenisSbr(e.target.value)
              }}
              error={Boolean(errors.jenis_sumber_id)}
              helperText={errors.jenis_sumber_id && 'This field is required'}
            >
              <MenuItem value='1'>Pembangkit Radiasi Pengion</MenuItem>
              <MenuItem value='2'>Zat Radioaktif</MenuItem>
            </CustomTextField>
          )}
        />
        {/* Other Fields */}
        <Controller
          name='nama'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='Nama'
              onChange={onChange}
              placeholder=''
              error={Boolean(errors.nama)}
              {...(errors.nama && { helperText: 'This field is required' })}
            />
          )}
        />
        <Controller
          name='tipe'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='Tipe'
              onChange={onChange}
              placeholder=''
              error={Boolean(errors.tipe)}
              {...(errors.tipe && { helperText: 'This field is required' })}
            />
          )}
        />
        <Controller
          name='no_seri'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='No Seri'
              onChange={onChange}
              placeholder=''
              error={Boolean(errors.no_seri)}
              {...(errors.no_seri && { helperText: 'This field is required' })}
            />
          )}
        />

        {/* CustomAutocomplete and other fields */}
        <br />
        <br />
        <CustomAutocomplete
          control={control}
          errors={errors.model_sumber_id}
          name='model_sumber_id'
          label='Model Sumber'
          options={optMerk}
        />

        <Controller
          name='no_ktun'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='No KTUN'
              onChange={onChange}
              placeholder=''
              error={Boolean(errors.no_ktun)}
              {...(errors.no_ktun && { helperText: 'This field is required' })}
            />
          )}
        />

        <Controller
          name='tgl_berlaku'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              type='date'
              value={value}
              label='Tanggal Berlaku'
              onChange={onChange}
              placeholder=''
              error={Boolean(errors.tgl_berlaku)}
              {...(errors.tgl_berlaku && { helperText: 'This field is required' })}
            />
          )}
        />

        {/* Conditionally Render Forms based on jenisSbr */}
        {jenisSbr === 2 && (
          <div id='formZra'>
            <Controller
              name='aktivitas'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Aktivitas'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.aktivitas)}
                  {...(errors.aktivitas && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='tgl_aktivitas'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type='date'
                  value={value}
                  label='Tanggal Aktivitas '
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.tgl_aktivitas)}
                  {...(errors.tgl_aktivitas && { helperText: 'This field is required' })}
                />
              )}
            />
            <br />
            <br />
            <CustomAutocomplete
              control={control}
              errors={errors.satuan_id}
              name='satuan_id'
              label='Satuan Aktivitas'
              options={optSatuan}
            />
          </div>
        )}

        {jenisSbr === 1 && (
          <div id='formPrp'>
            <Controller
              name='kv'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='KV'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.kv)}
                  {...(errors.kv && { helperText: 'This field is required' })}
                />
              )}
            />

            <Controller
              name='ma'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='MA'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.ma)}
                  {...(errors.ma && { helperText: 'This field is required' })}
                />
              )}
            />
          </div>
        )}

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
    </CustomDialog>
  )
}

export default FormSrpLkf
