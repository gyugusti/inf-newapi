'use client'

import { useMemo } from 'react'

import { useSearchParams } from 'next/navigation'

import { Box, CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useDispatch } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import FormInstansi from '@/views/sensus-srp/FormInstansi'
import DetailSrp from '@/views/validasi-srp/DetailSrp'

const Page = () => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()

  const params = useMemo(() => {
    const obj = {}

    searchParams.forEach((value, key) => {
      try {
        obj[key] = JSON.parse(value)
      } catch {
        obj[key] = value
      }
    })

    return obj
  }, [searchParams]) // aman: dependency jadi string, bukan ekspresi complex

  const masterId = params.id || params.master_sumber_id
  const breadcrumbs = [{ name: 'Sensus Sumber', path: '/sensus-srp' }, { name: 'Tambah Instansi' }]
  const detailData = Object.keys(params).length > 0 ? params : null

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />

      <Grid container spacing={1} sx={{ mt: 1 }} alignItems='flex-start'>
        {/* kiri: Form Instansi */}
        <Grid size={{ xs: 12, md: 6 }}>
          {masterId ? (
            <FormInstansi masterId={masterId} dense />
          ) : (
            <Box className='flex justify-center items-center h-40 text-center'>
              <div>
                <div className='font-medium mb-1'>Master Sumber belum terdeteksi</div>
                <div className='text-sm opacity-70'>
                  Tambahkan query <code>?id=</code> atau <code>?master_sumber_id=</code> pada URL.
                </div>
              </div>
            </Box>
          )}
        </Grid>
        {/* Kanan: Detail SRP */}
        <Grid size={{ xs: 12, md: 6 }}>
          {detailData ? (
            <DetailSrp detailRegsrp={detailData} assign={false} dense />
          ) : (
            <Box className='flex justify-center items-center h-40'>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Page
