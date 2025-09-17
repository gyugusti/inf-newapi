'use client'

import { useEffect, useState } from 'react'

import { useParams, useSearchParams, useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'

import { fetchDataSrp } from '@/app/(dashboard)/(private)/data-inspeksi/srp/server'

export default function Index() {
  const { control, handleSubmit, setValue, watch } = useForm()
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = Number(searchParams.get('page')) || 1
  const nama = searchParams.get('nama') || ''

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
        const response = await fetchDataSrp({
          ...filters,
          page,
          limit: perPage
        })

        if (isMounted && response?.data) {
          setData(response.data)
          setPagination({
            current_page: response.current_page,
            per_page: response.per_page,
            last_page: response.last_page
          })
        }
      } catch (e) {
        console.error(e)
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
