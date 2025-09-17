import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Checkbox,
  Pagination,
  useColorScheme,
  CircularProgress,
  Grid,
  Grid2
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import CustomDialog from '@/components/widget/CustomDialog'
import Loading from '@/components/Loading'
import { useSettings } from '@/@core/hooks/useSettings'
import { dispoManualSrp, resetSaveSuccess } from '@/redux-store/validasi-data'
import { fullDayTime } from '@/utils/helper'
import UserInspeksiAutocomplete from '@/components/widget/UserInspeksiAutocomplete'

const FormDisposisi = ({ datasrp, regsrpId, open, handleClose }) => {
  const dispatch = useDispatch()

  const { isLoading, detailRegsrp, tahap_reg_id, saveSuccess } = useSelector(store => store.validasiData)

  useEffect(() => {}, [dispatch, regsrpId])

  const defaultValues = {
    validator_id: ''
  }

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    //console.log(dataform.validator_id.id)
    const dataforms = {
      validator_id: dataform.validator_id.id
    }

    dispatch(dispoManualSrp({ id: regsrpId, dataforms }))
  }

  useEffect(() => {
    if (saveSuccess && !isLoading) {
      dispatch(resetSaveSuccess())
      handleClose()
    }
  }, [saveSuccess, isLoading, dispatch, handleClose])

  return (
    <Fragment>
      <CustomDialog
        open={open} // Show Modal1 only if Modal2 is not open
        handleClose={handleClose}
        title='Form Disposisi Sumber'
        maxWidth='xs'
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <div>
              <h4>No reg: {datasrp.no_reg}</h4>
              <h4>Fasilitas : {datasrp.fasilitas.nama}</h4>
              <h4>Validator Saat Ini : {datasrp.validator?.nama}</h4>
              <br />
            </div>
            <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1} alignItems='center'>
                <Grid item='true' size={{ xs: 12, sm: 8 }}>
                  <Controller
                    name='validator_id'
                    control={control}
                    rules={{ required: 'Verifikator wajib dipilih' }}
                    render={({ field, fieldState }) => (
                      <div>
                        <label className='text-md'>Validator dipilih</label>
                        <UserInspeksiAutocomplete
                          value={field.value}
                          onChange={selected => setValue('validator_id', selected)} // simpan seluruh data atau ubah sesuai kebutuhan
                        />
                        {fieldState.error && <p className='text-red text-sm'>{fieldState.error.message}</p>}
                      </div>
                    )}
                  />
                </Grid>

                <Grid item='true' size={{ xs: 12, sm: 2 }}>
                  <Button type='submit' variant='outlined' sx={{ mt: 5 }}>
                    disposisi
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Fragment>
        )}
      </CustomDialog>
    </Fragment>
  )
}

export default FormDisposisi
