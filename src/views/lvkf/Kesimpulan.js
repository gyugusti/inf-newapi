import React, { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useForm, Controller } from 'react-hook-form'
import { Icon } from '@iconify/react/dist/iconify.js'

import Box from '@mui/material/Box'

import { useDispatch, useSelector } from 'react-redux'

import { useSession } from 'next-auth/react'

import CustomTextField from '@/@core/components/mui/TextField'

import { lkfNilai, lkfSimpan } from '@/redux-store/lkf'
import Loading from '@/components/Loading'

const Kesimpulan = ({ lkf_id, detailLkf }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { isLoading, nilaiLkf } = useSelector(store => store.lkf)
  const [nilaiTotal, setNilaiTotal] = useState(0)
  const [nilaiEva, setNilaiEva] = useState(0)

  let warna

  if (nilaiTotal >= 70 && nilaiTotal <= 100) {
    warna = 'green'
  } else if (nilaiTotal >= 50 && nilaiTotal <= 69) {
    warna = 'yellow'
  } else {
    warna = 'red'
  }

  useEffect(() => {
    dispatch(lkfNilai(lkf_id))
  }, [dispatch, lkf_id])

  useEffect(() => {
    let total = 0

    nilaiLkf.forEach(item => {
      setNilaiEva(1)

      if (item.evaluasi) {
        if (item.evaluasi.hasil_eva_id == 2) {
          setNilaiEva(2)
        }

        const sum = (item.evaluasi.nilai * item.bobot) / 100

        total += sum
      } else {
        setNilaiEva(0)
      }
    })
    setNilaiTotal(total)
  }, [nilaiLkf])

  const defaultValues = {
    catatan_inspektur: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    const dataform = {
      ...data,
      hasil_eva_id: nilaiEva,
      verifikator_id: session?.user?.id
    }

    dispatch(lkfSimpan({ lkf_id: detailLkf.lkf_id, dataform }))
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Grid container spacing={0}>
          <Grid size={{ xs: 7, md: 7, sm: 12 }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>NO</TableCell>
                  <TableCell>IKF</TableCell>
                  <TableCell>Hasil Evaluasi</TableCell>
                  <TableCell>Bobot</TableCell>
                  <TableCell>Nilai</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nilaiLkf.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>
                      {item.evaluasi?.hasil_eva_id ? (
                        item.evaluasi.hasil_eva_id === 1 ? (
                          <strong style={{ color: 'green' }}>Lengkap</strong>
                        ) : (
                          <strong style={{ color: 'red' }}>Tidak Lengkap</strong>
                        )
                      ) : (
                        <strong style={{ color: 'red' }}>Belum Di Evaluasi</strong>
                      )}
                    </TableCell>
                    <TableCell>{item.bobot}%</TableCell>
                    <TableCell>
                      {item.evaluasi?.nilai ? (
                        <strong>{(item.evaluasi.nilai * item.bobot) / 100}</strong>
                      ) : (
                        <strong style={{ color: 'red' }}>Data tidak tersedia</strong>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid size={{ xs: 12, md: 4, sm: 4 }}>
            <Box sx={{ mb: 6 }} margin={4}>
              <Grid sx={{ m: 2 }} size={{ xs: 12, sm: 12 }}>
                Hasil evaluasi:
                {nilaiEva === 1 ? (
                  <h4 style={{ color: 'green' }}>Lengkap </h4>
                ) : (
                  <h4 style={{ color: 'red' }}>Tidak Lengkap </h4>
                )}
              </Grid>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid size={{ xs: 12, sm: 12 }} sx={{ m: 2 }}>
                  <Controller
                    name='catatan_inspektur'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='catatan'
                        onChange={onChange}
                        placeholder=''
                        error={Boolean(errors.catatan_inspektur)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.catatan_inspektur && {
                          helperText: 'Field Belum di isi !'
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }} sx={{ m: 2 }}>
                  <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                    Submit
                  </Button>
                </Grid>
              </form>
              <Grid size={{ xs: 12, sm: 12 }} sx={{ m: 2 }}>
                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: warna }}>
                  <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 40
                      }}
                    >
                      {nilaiTotal}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Kesimpulan
