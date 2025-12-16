'use client'

import { useMemo } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
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

  const Placeholder = ({ message }) => (
    <Box
      sx={{
        minHeight: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        fontStyle: 'italic',
        px: 2
      }}
    >
      <Typography variant='body1'>{message}</Typography>
    </Box>
  )

  return (
    <Stack spacing={4} sx={{ width: '100%' }}>
      <Grid container spacing={4} sx={{ width: '100%' }}>
        <Grid xs={12} md={6} sx={{ width: '100%', minWidth: 0 }}>
          <Accordion
            defaultExpanded
            elevation={0}
            sx={{
              borderRadius: 3,
              border: theme => `1px solid ${theme.palette.divider}`,
              boxShadow: theme => `0px 10px 25px 0px ${theme.palette.divider}`,
              width: '100%'
            }}
          >
            <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
              <Typography variant='h6'>Data Registrasi</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {detailData ? (
                <DetailGrid data={detailData} fields={registrasiFields} />
              ) : (
                <Placeholder message='Konten Grid Kosong' />
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid xs={12} md={6} sx={{ width: '100%', minWidth: 0 }}>
          <Accordion
            defaultExpanded
            elevation={0}
            sx={{
              borderRadius: 3,
              border: theme => `1px solid ${theme.palette.divider}`,
              boxShadow: theme => `0px 10px 25px 0px ${theme.palette.divider}`,
              width: '100%'
            }}
          >
            <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
              <Typography variant='h6'>Data Master Sumber</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {detailData?.master_sumber ? (
                <DetailGrid data={detailData.master_sumber} fields={masterFields} />
              ) : (
                <Placeholder message='Data master belum tersedia' />
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant='body2' color='text.secondary' sx={{ textTransform: 'lowercase' }}>
          form srp
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <Accordion
        defaultExpanded
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          border: 'none',
          boxShadow: 'none',
          width: '100%'
        }}
      >
        <AccordionSummary
          expandIcon={<i className='tabler-chevron-down' style={{ color: '#fff' }} />}
          sx={{
            backgroundColor: '#4b3bf1',
            color: '#fff',
            '& .MuiAccordionSummary-content': { alignItems: 'flex-start', flexDirection: 'column' }
          }}
        >
          <Typography variant='h5' fontWeight={700}>
            Formulir Data
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.9 }}>
            Keterangan Data Form
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: 'transparent', px: { xs: 0, md: 2 } }}>
          <FormSrpReg data={detailData} action={updateAction} />
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}

export default SrpSensusUpdateTabs
