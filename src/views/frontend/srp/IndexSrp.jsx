'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { Controller, useForm } from 'react-hook-form'

export default function IndexSrp() {
  const { control, handleSubmit } = useForm()
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = Number(searchParams.get('page')) || 1

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [perPage, setPerPage] = useState(20)

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    last_page: 1
  })

  const [filters, setFilters] = useState({
    status: '',
    jenis_sumber_id: '',
    kat_sumber_id: '',
    cari: ''
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)

      try {
        const queryParams = new URLSearchParams()

        queryParams.set('page', page)
        queryParams.set('limit', perPage)

        if (filters.status !== '') queryParams.set('status', filters.status)
        if (filters.jenis_sumber_id !== '') queryParams.set('jenis_sumber_id', filters.jenis_sumber_id)
        if (filters.kat_sumber_id !== '') queryParams.set('kat_sumber_id', filters.kat_sumber_id)
        if (filters.cari) queryParams.set('cari', filters.cari)

        const response = await fetch(`/frontend/srp-sensus/list?${queryParams.toString()}`, {
          method: 'GET',
          cache: 'no-store'
        })

        if (!response.ok) {
          console.error('Failed to fetch SRP list:', response.statusText)

          if (isMounted) {
            setData([])
            setPagination({
              current_page: 1,
              per_page: perPage,
              last_page: 1
            })
          }

          return
        }

        const responseData = await response.json()

        if (isMounted) {
          setData(responseData.data || [])
          setPagination({
            current_page: responseData.current_page ?? 1,
            per_page: responseData.per_page ?? perPage,
            last_page: responseData.last_page ?? 1
          })
        }
      } catch (e) {
        console.error(e)

        if (isMounted) {
          setData([])
          setPagination({
            current_page: 1,
            per_page: perPage,
            last_page: 1
          })
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [page, filters, perPage])

  const handlePageChange = (_, value) => {
    router.push(`?page=${value}`, { scroll: false })
  }

  const onSubmit = values => {
    setFilters(values)
    router.push(`?page=1`, { scroll: false }) // Reset ke page 1 saat filter
  }

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={2}>
          <Grid size={2}>
            <Controller
              name='status'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <FormControl fullWidth size='small'>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label='Status'>
                    <MenuItem value=''>Semua Status</MenuItem>
                    <MenuItem value={1}>Aktif (1)</MenuItem>
                    <MenuItem value={0}>Non Aktif (0)</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={2}>
            <Controller
              name='jenis_sumber_id'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <FormControl fullWidth size='small'>
                  <InputLabel>Jenis</InputLabel>
                  <Select {...field} label='Jenis'>
                    <MenuItem value=''>Semua</MenuItem>
                    <MenuItem value='2'>ZRA</MenuItem>
                    <MenuItem value='1'>PRP</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={2}>
            <Controller
              name='kat_sumber_id'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <FormControl fullWidth size='small'>
                  <InputLabel>Kategori</InputLabel>
                  <Select {...field} label='Kategori'>
                    <MenuItem value=''>Semua</MenuItem>
                    <MenuItem value='1'>Tunggal</MenuItem>
                    <MenuItem value='2'>Curah</MenuItem>
                    <MenuItem value='3'>Imaginer</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <Controller
              name='cari'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} label='Cari MasterID, Tipe, NoSeri' size='small' fullWidth />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button type='submit' variant='contained'>
              Cari
            </Button>
          </Grid>
        </Grid>
      </form>

      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Master ID</TableCell>
              <TableCell>Jenis/Kat</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Tipe Unit</TableCell>
              <TableCell>No Seri Unit</TableCell>
              <TableCell>Tipe Tabung</TableCell>
              <TableCell>No Seri Tabung</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>KTUN</TableCell>
              <TableCell>Fasilitas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={11} align='center'>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align='center'>
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
                <TableRow key={row.master_id}>
                  <TableCell>{(pagination.current_page - 1) * pagination.per_page + i + 1}</TableCell>
                  <TableCell>{row.master_id || 'XXXXXX'}</TableCell>
                  <TableCell>
                    {row.jenis_sumber?.keterangan}/{row.kat_sumber?.nama}
                  </TableCell>
                  <TableCell>{row.model_sumber}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.tipe}</TableCell>
                  <TableCell>{row.no_seri}</TableCell>
                  <TableCell>{row.tipe_tabung}</TableCell>
                  <TableCell>{row.no_seri_tabung}</TableCell>
                  <TableCell>
                    {row.status_sumber_id === 1 ? 'aktif' : row.status_sumber_id === 0 ? 'nonaktif' : '-'}
                  </TableCell>
                  <TableCell>{row.ktun}</TableCell>
                  <TableCell>{row.fasilitas}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display='flex' justifyContent='center'>
        {!loading && pagination.last_page > 1 && (
          <Grid container justifyContent='center' mt={3}>
            <Pagination
              count={pagination.last_page}
              page={pagination.current_page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              size='small'
            />
          </Grid>
        )}
      </Box>
    </Box>
  )
}
