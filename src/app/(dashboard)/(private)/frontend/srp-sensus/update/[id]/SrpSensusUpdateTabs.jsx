'use client'

import { useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import CustomTabList from '@/@core/components/mui/TabList'
import FormSrpReg from '@/views/frontend/srp/FormSrpReg'

const renderFieldValue = value => {
  if (value === null || value === undefined || value === '') return '-'

  return value
}

const DetailGrid = ({ data, fields }) => {
  const middleIndex = Math.ceil(fields.length / 2)
  const firstColumn = fields.slice(0, middleIndex)
  const secondColumn = fields.slice(middleIndex)

  const renderColumn = columnFields => (
    <Stack spacing={3}>
      {columnFields.map(field => (
        <Box key={field.label}>
          <Typography variant='caption' color='text.secondary'>
            {field.label}
          </Typography>
          <Typography variant='body1' sx={{ fontWeight: 600 }}>
            {renderFieldValue(field.value(data))}
          </Typography>
        </Box>
      ))}
    </Stack>
  )

  return (
    <Grid container spacing={4} sx={{ mt: 0 }}>
      <Grid xs={12} md={6}>
        {renderColumn(firstColumn)}
      </Grid>
      <Grid xs={12} md={6}>
        {renderColumn(secondColumn)}
      </Grid>
    </Grid>
  )
}

const SrpSensusUpdateTabs = ({ detailData, updateAction }) => {
  const [tabValue, setTabValue] = useState('registrasi')

  const registrasiFields = useMemo(
    () => [
      { label: 'Registrasi SRP ID', value: data => data?.reg_srp_id },
      { label: 'Nama Sumber', value: data => data?.nama },
      { label: 'Tipe', value: data => data?.tipe },
      { label: 'Nomor Seri', value: data => data?.no_seri },
      { label: 'Tipe Tabung', value: data => data?.tipe_tabung },
      { label: 'Nomor Seri Tabung', value: data => data?.no_seri_tabung },
      { label: 'Aktivitas', value: data => data?.aktivitas },
      { label: 'Tanggal Aktivitas', value: data => data?.tgl_aktivitas },
      { label: 'KV', value: data => data?.kv },
      { label: 'MA', value: data => data?.ma },
      { label: 'Fasilitas', value: data => data?.fasilitas?.nama },
      { label: 'Catatan', value: data => data?.catatan || data?.catatan_lengkap }
    ],
    []
  )

  const masterFields = useMemo(
    () => [
      { label: 'Master ID', value: data => data?.master_id },
      { label: 'Nama Master', value: data => data?.nama },
      { label: 'Tipe', value: data => data?.tipe },
      { label: 'Nomor Seri', value: data => data?.no_seri },
      { label: 'Nomor Seri Tabung', value: data => data?.no_seri_tabung_valid || data?.no_seri_tabung },
      { label: 'Tipe Tabung', value: data => data?.tipe_tabung_valid || data?.tipe_tabung },
      { label: 'Aktivitas', value: data => data?.aktivitas },
      { label: 'Tanggal Aktivitas', value: data => data?.tgl_aktivitas },
      { label: 'Status Sumber', value: data => data?.ket_status },
      { label: 'Kategori Sumber', value: data => data?.kat_sumber_id },
      { label: 'Jenis Sumber', value: data => data?.jenis_sumber_id },
      { label: 'Pabrikan', value: data => data?.pabrikan }
    ],
    []
  )

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Card>
      <CardContent>
        <TabContext value={tabValue}>
          <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='tab detail srp'>
            <Tab value='registrasi' label='Detail Registrasi' />
            <Tab value='master' label='Data Master Sumber' />
          </CustomTabList>

          <TabPanel value='registrasi' sx={{ px: 0 }}>
            {detailData ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Informasi Registrasi
                </Typography>
                <DetailGrid data={detailData} fields={registrasiFields} />
              </Box>
            ) : (
              <Typography sx={{ mt: 2 }}>Data registrasi tidak ditemukan.</Typography>
            )}

            <Divider sx={{ my: 4 }} />

            <FormSrpReg data={detailData} action={updateAction} />
          </TabPanel>

          <TabPanel value='master' sx={{ px: 0 }}>
            {detailData?.master_sumber ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Informasi Master Sumber
                </Typography>
                <DetailGrid data={detailData.master_sumber} fields={masterFields} />
              </Box>
            ) : (
              <Typography sx={{ mt: 2 }}>Data master sumber belum tersedia.</Typography>
            )}
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default SrpSensusUpdateTabs
