'use client'

import { useEffect, useState } from 'react'

import { useParams, useSearchParams } from 'next/navigation'

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

import { fetchSyaratKegiatan } from '@/app/server/tarik'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'Syarat', path: '/admin-referensi/syarat-item' },
  { name: 'Kelompok Detail' }
]

export default function DetailKelompok() {
  const params = useParams()
  const searchParams = useSearchParams()
  const nama = searchParams.get('nama') || ''
  const kelompok_id = params.kelompok_id

  const [kegiatan, setKegiatan] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (kelompok_id) {
      const fetchData = async () => {
        setLoading(true)
        const data = await fetchSyaratKegiatan(kelompok_id)

        setKegiatan(data)
        setLoading(false)
      }

      fetchData()
    }
  }, [kelompok_id])

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Grid>
        <Card>
          <CardContent>
            <Grid container justifyContent='space-between' alignItems='center' mb={2}>
              <Typography variant='h6'>
                Kelompok: {nama} (ID. {kelompok_id})
              </Typography>
              <Button variant='outlined'>Update Kelompok</Button>
            </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='syarat table'>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Kelompok ID</TableCell>
                    <TableCell>Nama Syarat</TableCell>
                    <TableCell>Urutan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align='center'>
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : kegiatan.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align='center'>
                        Tidak ada data syarat kegiatan.
                      </TableCell>
                    </TableRow>
                  ) : (
                    kegiatan
                      .sort((a, b) => a.syarat_item.urutan - b.syarat_item.urutan)
                      .map((item, index) => (
                        <TableRow key={item.syarat_id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Button size='small' variant='text'>
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell>{item.kelompok_id}</TableCell>
                          <TableCell>{item.syarat_item.nama}</TableCell>
                          <TableCell>{item.syarat_item.urutan}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
