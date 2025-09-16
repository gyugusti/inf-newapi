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

import { fetchDataKtun } from '@/app/(dashboard)/(private)/data-inspeksi/server-action/server'

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
    cari: ''
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetchDataKtun({
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
              name='bidang'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <FormControl fullWidth size='small'>
                  <InputLabel>Bidang</InputLabel>
                  <Select {...field} label='Bidang'>
                    <MenuItem value=''>Semua</MenuItem>
                    <MenuItem value='2'>Medik</MenuItem>
                    <MenuItem value='1'>Industri</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid xs={12} sm={3}>
            <Controller
              name='cari'
              control={control}
              defaultValue=''
              render={({ field }) => <TextField {...field} label='Cari No ktun, No reg' size='small' fullWidth />}
            />
          </Grid>

          <Grid xs={12}>
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
              <TableCell>No KTUN </TableCell>
              <TableCell>No Registrasi</TableCell>
              <TableCell>Nama Instansi</TableCell>
              <TableCell>Lokasi Usaha</TableCell>
              <TableCell>Lingkup Kegiatan</TableCell>
              <TableCell>SubLingkup</TableCell>
              <TableCell>Berlaku</TableCell>
              <TableCell>Status</TableCell>
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
                  <TableCell>{row.no_ktun}</TableCell>
                  <TableCell>{row.no_reg}</TableCell>
                  <TableCell>{row.fasilitas?.nama}</TableCell>
                  <TableCell>{row.alamat_instansi}</TableCell>
                  <TableCell>{row.daf_kegiatan?.nama}</TableCell>
                  <TableCell>
                    {Array.isArray(row.daf_kegiatan?.jenis_kegiatan)
                      ? row.daf_kegiatan.jenis_kegiatan.map((item, index) => <div key={index}>-{item.nama}</div>)
                      : row.daf_kegiatan?.jenis_kegiatan || '-'}
                  </TableCell>
                  <TableCell>{row.tgl_expired}</TableCell>
                  <TableCell>{row.status_ktun?.nama}</TableCell>
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
              color='primary'
            />
          </Grid>
        )}
      </Box>
    </Box>
  )
}
