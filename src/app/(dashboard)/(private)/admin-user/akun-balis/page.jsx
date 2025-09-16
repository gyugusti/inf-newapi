'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, FormControl, Grid2, InputLabel, MenuItem, Select } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { signIn, useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import Pagination from '@mui/material/Pagination'

import { Icon } from '@iconify/react/dist/iconify.js'

import CustomTextField from '@/@core/components/mui/TextField'
import OptionMenu from '@/@core/components/option-menu'
import Loading from '@/components/Loading'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import {
  changePage,
  clearFilters,
  getAkunInspeksi,
  getRoleInspeksi,
  getTokenVirtual,
  handleChange
} from '@/redux-store/admin-user'

function Index() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()
  const tokens = session?.user?.accessToken || ''

  const { roleInspeksi, listAkun, numOfPages, current_page, per_page, tab, isLoading, cari, fas_id, akses_inspeksi } =
    useSelector(store => store.akun)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const [tknId, setTknId] = useState()

  const [showConfirmationVirtual, setShowConfirmationVirtual] = useState(false)

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    if (tokens) {
      dispatch(getAkunInspeksi(tokens)) // Only dispatch if tokens are valid
    }
  }, [tab, current_page, cari, fas_id, akses_inspeksi, dispatch, tokens])

  useEffect(() => {
    dispatch(getRoleInspeksi())
  }, [dispatch])

  const optRole = Object.values(
    roleInspeksi.reduce((acc, { id, nama }) => {
      if (!acc[nama]) {
        acc[nama] = { label: nama, value: id }
      }

      return acc
    }, {})
  )

  let defaultValues = {
    cari: cari,
    fas_id: fas_id,
    akses_inspeksi: akses_inspeksi
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    dispatch(handleChange({ name: 'cari', value: dataform.cari }))
    dispatch(handleChange({ name: 'fas_id', value: dataform.fas_id }))
    dispatch(handleChange({ name: 'akses_inspeksi', value: dataform.akses_inspeksi }))
  }

  const handleReset = () => {
    dispatch(clearFilters())
    reset({ ...defaultValues, cari: '', fas_id: '' })
  }

  const handleVirtual = tkn => {
    setTknId(tkn)
    setShowConfirmationVirtual(true)
  }

  const handleGetVirtual = id => {
    dispatch(getTokenVirtual(id))
  }

  const breadcrumbs = [{ name: 'Referensi', path: '/admin-user' }, { name: 'Akun Bapeten' }]

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2} columns={{ xs: 12, md: 12 }} alignItems='center' sx={{ mb: 2 }}>
          {/* cari */}
          <Grid2 xs={12} md={3}>
            <Controller
              name='cari'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  value={value}
                  label=''
                  onChange={onChange}
                  placeholder='cari..'
                  error={Boolean(errors.cari)}
                  fullWidth
                  aria-describedby='validation-basic-first-name'
                  {...(errors.cari && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid2>

          {/* fasilitas */}
          <Grid2 xs={12} md={4}>
            <Controller
              name='fas_id'
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControl fullWidth size='small'>
                  <InputLabel id='fasid-label'>Fasilitas</InputLabel>
                  <Select labelId='fasid-label' label='Fasilitas' value={value} onChange={onChange}>
                    <MenuItem value='4100'>Dalam Bapeten</MenuItem>
                    <MenuItem value=''>Luar Bapeten</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid2>

          {/* akses */}
          <Grid2 xs={12} md={3}>
            <CustomAutocomplete
              control={control}
              errors={errors.merk}
              name='akses_inspeksi'
              label='Akses'
              options={optRole}
              required={false}
              fullWidth
            />
          </Grid2>

          {/* tombol */}
          <Grid2 xs={12} md={1}>
            <Button type='submit' fullWidth variant='contained' startIcon={<Icon icon='tabler:search' fontSize={18} />}>
              cari
            </Button>
          </Grid2>

          <Grid2 xs={12} md={1}>
            <Button variant='tonal' color='primary' type='reset' onClick={handleReset} fullWidth>
              Reset
            </Button>
          </Grid2>
        </Grid2>
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Nama / Username</TableCell>
              <TableCell>Bidang</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Expired</TableCell>
              <TableCell>Status Akun</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAkun.map((item, index) => {
              let status

              if (item.status === -1) {
                status = 'non aktif'
              } else if (item.status === 2) {
                status = 'expired'
              } else if (item.status === 10) {
                status = 'aktif'
              } else {
                status = 'unknown'
              }

              return (
                <TableRow key={item.id}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <OptionMenu
                      iconButtonProps={{ size: 'medium' }}
                      iconClassName='text-textSecondary'
                      options={[
                        {
                          text: 'detail',
                          icon: 'tabler-eye text-[22px]',
                          menuItemProps: {
                            onClick: () => handleClickOpen(item),
                            className: 'flex items-center gap-2 text-textSecondary'
                          }
                        },
                        {
                          text: 'Update',
                          icon: 'tabler-pencil',
                          href: { pathname: `${item.id}`, query: { id: item.jadwal_id, ...item } },
                          linkProps: {
                            className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                          }
                        },
                        {
                          text: 'Akses',
                          icon: 'tabler-users',
                          href: { pathname: 'assign', query: { id: item.jadwal_id, ...item } },
                          linkProps: {
                            className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                          }
                        },
                        ...(item.virtual_token
                          ? [
                              {
                                text: 'Virtual Akun',
                                icon: 'tabler-login',
                                menuItemProps: { onClick: () => handleVirtual(item.virtual_token) }
                              }
                            ]
                          : [
                              {
                                text: 'Buat Virtual Akun',
                                icon: 'tabler-login',
                                menuItemProps: { onClick: () => handleGetVirtual(item.id) }
                              }
                            ])
                      ]}
                    />
                  </TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.bidang_id}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.level?.nama || 'N/A'}</TableCell>
                  <TableCell>{item.expired}</TableCell>
                  <TableCell>{status}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />

      <KonfirmasiDialog
        open={showConfirmationVirtual}
        setOpen={setShowConfirmationVirtual}
        Id={tknId}
        onConfirm={async tknId => {
          if (tknId !== 'no') {
            localStorage.setItem('adminAccessToken', session.user.accessToken)

            const res = await signIn('credentials', {
              token: tknId,
              redirect: false
            })

            if (res?.ok && !res.error) {
              router.replace('/')
            } else {
              console.error('Gagal login virtual:', res?.error)
            }
          }

          setShowConfirmationVirtual(false)
        }}
        message='Login Virtual ke akun ini ?'
      />
    </>
  )
}

export default Index
