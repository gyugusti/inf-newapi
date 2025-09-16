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
import { CircularProgress, Pagination } from '@mui/material'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { fetchDatakamera } from '@/app/(dashboard)/(private)/data-inspeksi/kamera/server'

const breadcrumbs = [{ name: 'Data Kamera' }]

export default function Kamera() {
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

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetchDatakamera(page, perPage)

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
  }, [page, perPage])

  const handlePageChange = (_, value) => {
    router.push(`?page=${value}`, { scroll: false })
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Grid>
        <Card>
          <CardContent>
            <Typography variant='h6' mb={2}>
              Daftar Kamera
            </Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='kamera table'>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Merk</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Tipe</TableCell>
                    <TableCell>No Seri</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>KTUN</TableCell>
                    <TableCell>Fasilitas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} align='center'>
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align='center'>
                        Tidak ada data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((row, idx) => (
                      <TableRow key={row.kamera_id}>
                        <TableCell>{(pagination.current_page - 1) * pagination.per_page + idx + 1}</TableCell>
                        <TableCell>{row.merk?.nama || '-'}</TableCell>
                        <TableCell>{row.nama_kamera}</TableCell>
                        <TableCell>{row.tipe}</TableCell>
                        <TableCell>{row.no_seri}</TableCell>
                        <TableCell>{row.status_id === 1 ? 'Aktif' : 'Non Aktif'}</TableCell>
                        <TableCell>{row.jmlKtun}</TableCell>
                        <TableCell>{row.jmlFas}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

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
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
