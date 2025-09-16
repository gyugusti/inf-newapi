import { forwardRef, useEffect, useMemo, useState } from 'react'

import { useSession } from 'next-auth/react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  CardHeader
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import Box from '@mui/material/Box'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

import Loading from '@/components/Loading'
import { StyledTableCell } from '@/components/styles/StyledTable'
import ShadowBox from '@/components/styles/ShadowBox'
import CustomTextField from '@/@core/components/mui/TextField'
import { warnaStriker } from '@/utils/colorUtils'
import { fihiSimpan, getdataFihi, setTab } from '@/redux-store/fihi'

const Kesimpulan = ({ fihi_id, dataFihi }) => {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  const nilaiIkk = dataFihi.ikk?.nilai_total
  const color = warnaStriker(nilaiIkk)

  const defaultValues = useMemo(
    () => ({
      tgl_komitmen: dataFihi ? dataFihi.tgl_komitmen : '',
      saran_peningkatan: dataFihi ? dataFihi.saran_peningkatan : '',
      praktek_baik: dataFihi ? dataFihi.praktek_baik : ''
    }),
    [dataFihi]
  )

  // Then use defaultValues in useForm
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const onSubmit = data => {
    const dataform = {
      ...data,
      nilai_ikk: nilaiIkk,
      tgl_komitmen: format(new Date(data.tgl_komitmen), 'yyyy-MM-dd'),
      nama: session.user.nama
    }

    console.log(dataform)

    dispatch(fihiSimpan({ fihi_id: dataFihi.fihi_id, dataform }))
    dispatch(setTab(data))
  }

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  if (!dataFihi) {
    return <Loading />
  }

  return (
    <Card>
      <CardHeader title='Hasil Inspeksi' />
      <CardContent>
        <Grid container>
          <Grid size={{ xl: 12, md: 4, xs: 12, sm: 12 }} paddingRight={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='tgl_komitmen'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <AppReactDatepicker
                    dateFormat='yyyy-MM-dd'
                    selected={value && value !== '0000-00-00' ? new Date(value) : null}
                    showYearDropdown
                    showMonthDropdown
                    onChange={date => onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomInput
                        label='Tanggal Komitmen Tindak Lanjut'
                        error={Boolean(errors.tgl_komitmen)}
                        aria-describedby='validation-basic-dob'
                      />
                    }
                  />
                )}
              />

              <Controller
                name='saran_peningkatan'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    maxRows={2}
                    minRows={2}
                    sx={{ marginTop: 2 }}
                    label='Saran Peningkatan Kinerja Keselamatan dan Keamanan'
                    error={Boolean(errors.saran_peningkatan)}
                    helperText={errors.saran_peningkatan && 'Field Belum di isi !'}
                    value={field.value || ''} // Ensure value is never null
                  />
                )}
              />

              <Controller
                name='praktek_baik'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    multiline
                    maxRows={2}
                    minRows={2}
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label='Praktek keselamatan dan keamanan yang baik (Good Practice)'
                    error={Boolean(errors.praktek_baik)}
                    helperText={errors.praktek_baik && 'Field Belum di isi !'}
                    value={field.value || ''} // Ensure value is never null
                  />
                )}
              />
              {nilaiIkk ? (
                <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                  Submit
                </Button>
              ) : (
                <Alert icon={<i className='tabler-info-circle' />} severity='warning' className='font-medium text-lg'>
                  Nilai ikk belom disimpan
                </Alert>
              )}
            </form>
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 12, xl: 6 }}>
            <ShadowBox>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center' sx={{ backgroundColor: '#FA1E1E', color: 'white' }}>
                      Kurang
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ backgroundColor: '#FCDB1E', color: 'white' }}>
                      Cukup
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ backgroundColor: '#1BC000', color: 'white' }}>
                      Baik / Baik Sekali
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCell align='center'>0 – 49</StyledTableCell>
                    <StyledTableCell align='center'>50 – 69</StyledTableCell>
                    <StyledTableCell align='center'>70 – 89 / 90 – 100</StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <b>Nilai IKK :</b>
              <div style={{ backgroundColor: color, color: 'white', padding: '10px', textAlign: 'center' }}>
                {nilaiIkk === 2 ? <h4>IKK Belum di evaluasi</h4> : <h2>{nilaiIkk}</h2>}
              </div>
            </ShadowBox>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Kesimpulan
