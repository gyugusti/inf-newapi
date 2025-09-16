'use client'

// ** React Imports
import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardContent, TableRow, TableBody, TableContainer, TableCell, Table } from '@mui/material'
import Grid from '@mui/material/Grid2'


import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'


import { Icon } from '@iconify/react/dist/iconify.js'
import Box from '@mui/material/Box'

import { styled, useTheme } from '@mui/material/styles'

import DetailBar from '@/views/fihi/DetailBar'

import { getdetailJadwal, setFihi } from '@/redux-store/jadwal'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

import { getfihiJadwal, setStatusFihi } from '@/redux-store/fihi'
import ShadowBox from '@/components/styles/ShadowBox'
import DaftarLhi from '@/views/lhi/DaftarLhi'

const Index = () => {
  const theme = useTheme()

  const router = useRouter()
  const query = router.query
  const id = query.id

  const dispatch = useDispatch()

  const { detailJadwal, tab, isLoading } = useSelector(store => store.jadwal)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getdetailJadwal(id))
    }
  }, [id, dispatch, tab])

  const breadcrumbs = [{ name: 'LHI', path: '/inspektur/lhi' }, { name: 'Daftar LHI' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <br />
      <Grid>
        {detailJadwal && (
          <ShadowBox>
            <TableContainer>
              <Table>
                <TableBody
                  sx={{
                    '& .MuiTableCell-root': {
                      py: `${theme.spacing(2.5)} !important`,
                      fontSize: theme.typography.body1.fontSize
                    }
                  }}
                >
                  <TableRow>
                    <TableCell>Kode Area / Pelaksanaan</TableCell>
                    <TableCell>
                      {detailJadwal.kode_area} / {detailJadwal.tgl_mulai} s/d {detailJadwal.tgl_akhir} ,{' '}
                      {detailJadwal.hari} Hari
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status Jadwal </TableCell>
                    <TableCell>{detailJadwal.status?.nama}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tim Inspektur </TableCell>
                    <TableCell>
                      {detailJadwal.jadwal_tim &&
                        detailJadwal.jadwal_tim.map((tim, index) => (
                          <span key={index}>
                            {index + 1} . {tim.inspektur.nama} ({tim.jabatan.nama})
                          </span>
                        ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ShadowBox>
        )}
      </Grid>
      <Grid marginTop={4}>
        {isLoading ? (
          <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <Grid>{detailJadwal && <DaftarLhi detail={detailJadwal} />}</Grid>
        )}
      </Grid>
    </>
  )
}

Index.acl = {
  action: 'all',
  subject: 'inspektur-page'
}

export default Index
