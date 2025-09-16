'use client'

import { useState, forwardRef, useEffect, Fragment } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  Pagination,
  DialogTitle,
  Grid,
  Paper,
  CircularProgress
} from '@mui/material'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTheme } from '@mui/material/styles'

import Tab from '@mui/material/Tab'

import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import { CustomTabList } from '@/components/styles/TabPIlls'
import { StyledTableCell, StyledTableRow, TableCellNoRow } from '@/components/styles/StyledTable'
import { getLhiPihak, getdataLhi, setTab } from '@/redux-store/lhi'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import Loading from '@/components/Loading'
import { formatDates, fullDay } from '@/utils/helper'
import Action from '@/views/lhi/Action'
import DetailJadwal from '@/components/jadwal/DetailJadwal'
import { SIFAT_BERKALA, TERLAKSANA } from '@/configs/jadwalConfig'
import LhiPihak from '@/views/lhi/LhiPihak'
import LhiLokasi from '@/views/lhi/LhiLokasi'
import LhiHasil from '@/views/lhi/LhiHasil'
import { getIkk } from '@/redux-store/admin-referensi/ikk'
import LhiTemuan from '@/views/lhi/LhiTemuan'
import FormLhisewaktu from '@/views/lhi/form/FormLhisewaktu'
import PenilaianIkk from '@/views/lhi/PenilaianIkk'
import FormKesimpulanLhi from '@/views/lhi/form/FormKesimpulanLhi'
import Dokumentasi from '@/views/lhi/Dokumentasi'

const Index = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [value, setValue] = useState('jadwal')

  const { dataLhi, isLoading, tab, lhiPihak } = useSelector(store => store.lhi)
  const { ikk } = useSelector(store => store.ikk)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getdataLhi(id))
      dispatch(getLhiPihak(id))
    }
  }, [id, dispatch, tab])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    dispatch(getIkk())
  }, [dispatch])

  const shouldRenderExtraTabs =
    dataLhi.sifat?.sifat_insp_id === SIFAT_BERKALA && dataLhi.jadwal_tujuan?.jadwal_fas?.status_inspeksi === TERLAKSANA

  const breadcrumbs = [
    { name: 'LHI', path: '/inspektur/lhi' },
    { name: 'Daftar LHI', path: '/inspektur/lhi/' + dataLhi.jadwal_id },
    { name: 'Form LHI' }
  ]

  return (
    <>
      <Fragment>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />

        <Accordion defaultExpanded>
          <AccordionSummary
            id='panel-header-1'
            aria-controls='panel-content-1'
            expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
          >
            <Typography>
              <b>FORMULIR ISIAN HASIL INSPEKSI</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableBody>
                <StyledTableRow>
                  <TableCellNoRow>Nomor LHI</TableCellNoRow>
                  <TableCellNoRow>{dataLhi.no_master_lhi}</TableCellNoRow>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCellNoRow>Tanggal LHI</TableCellNoRow>
                  <TableCellNoRow>{dataLhi.tgl_lhi}</TableCellNoRow>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCellNoRow>Nama Instansi</TableCellNoRow>
                  <TableCellNoRow>{dataLhi.fas?.nama}</TableCellNoRow>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCellNoRow>Kelompok Kegiatan / Sifat </TableCellNoRow>
                  <TableCellNoRow>
                    {dataLhi.kelompok?.nama} ({dataLhi?.sifat?.nama} )
                  </TableCellNoRow>
                </StyledTableRow>
                <TableRow>
                  <TableCellNoRow colSpan={2}>
                    <Action dataLhi={dataLhi} />
                  </TableCellNoRow>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
        <Grid marginTop={4}>
          <TabContext value={value}>
            <CustomTabList onChange={handleChange} aria-label='simple tabs example'>
              <Tab value='jadwal' label='Jadwal' sx={{ backgroundColor: 'background.paper', borderRadius: 1 }} />
              <Tab
                value='lokasi'
                label='Lokasi'
                sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 2 }}
              />
              <Tab
                value='pihak'
                label='Pihak Fasilitas'
                sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 2 }}
              />
              {shouldRenderExtraTabs ? (
                <Tab
                  value='temuan'
                  label='Temuan & Rekomendasi'
                  sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 2 }}
                />
              ) : (
                <Tab
                  value='lhi'
                  label='LHI'
                  sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 2 }}
                />
              )}

              {shouldRenderExtraTabs && [
                <Tab
                  key='hasil'
                  value='hasil'
                  label='Hasil'
                  sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 2 }}
                />,
                <Tab
                  key='ikk'
                  value='ikk'
                  label='Penilaian IKK'
                  sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 2 }}
                />,
                <Tab
                  key='kesimpulan'
                  value='kesimpulan'
                  label='Kesimpulan'
                  sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 2 }}
                />
              ]}

              <Tab
                value='dokumentasi'
                label='Dokumentasi'
                sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 2 }}
              />
            </CustomTabList>

            <TabPanel value='jadwal' sx={{ padding: 0 }}>
              <Paper>
                {dataLhi.jadwal ? (
                  <DetailJadwal
                    dataLhi={dataLhi}
                    kodearea={dataLhi.jadwal.kode_area}
                    propinsi={dataLhi.jadwal.propinsi.nama}
                    fasilitas={dataLhi.fas.nama}
                    status_inspeksi={dataLhi.jadwal_tujuan?.jadwal_fas?.status_inspeksi}
                    tgl_mulai={dataLhi.jadwal.tgl_mulai}
                    tgl_akhir={dataLhi.jadwal.tgl_akhir}
                    tim={dataLhi.jadwal.jadwal_tim}
                  />
                ) : (
                  <Loading />
                )}
              </Paper>
            </TabPanel>
            <TabPanel value='lokasi' sx={{ padding: 0 }}>
              {dataLhi ? <LhiLokasi dataLhi={dataLhi} /> : <Loading />}
            </TabPanel>
            <TabPanel value='pihak' sx={{ padding: 0 }}>
              <Paper sx={{ padding: 3 }}>
                <LhiPihak dataLhi={dataLhi} />
              </Paper>
            </TabPanel>
            <TabPanel value='hasil' sx={{ padding: 0 }}>
              {dataLhi.inkf && dataLhi.inkf.length > 0 ? (
                dataLhi.inkf.map((item, index) => (
                  <LhiHasil ikk={ikk} item={item} dataLhi={dataLhi} key={index} no={index + 1} action='non-view' />
                ))
              ) : (
                <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              )}
            </TabPanel>
            <TabPanel value='ikk' sx={{ padding: 0 }}>
              <Paper sx={{ padding: 3 }}>
                {dataLhi.inkf && dataLhi.inkf.length > 0 ? (
                  <PenilaianIkk ikk={ikk} dataLhi={dataLhi} action='non-view' />
                ) : (
                  <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <CircularProgress sx={{ mb: 4 }} />
                    <Typography>Loading...</Typography>
                  </Box>
                )}
              </Paper>
            </TabPanel>
            <TabPanel value='kesimpulan' sx={{ padding: 0 }}>
              <Paper sx={{ padding: 3 }}>
                <FormKesimpulanLhi />
              </Paper>
            </TabPanel>
            <TabPanel value='temuan' sx={{ padding: 0 }}>
              {dataLhi.inkf && dataLhi.inkf.length > 0 ? (
                dataLhi.inkf.map((item, index) => (
                  <LhiTemuan ikk={ikk} item={item} dataLhi={dataLhi} key={index} no={index + 1} action='non-view' />
                ))
              ) : (
                <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              )}
            </TabPanel>
            <TabPanel value='lhi' sx={{ padding: 0 }}>
              <Paper sx={{ padding: 3 }}>{dataLhi ? <FormLhisewaktu /> : <Loading />}</Paper>
            </TabPanel>
            <TabPanel value='dokumentasi' sx={{ padding: 0 }}>
              {dataLhi.dokumen && <Dokumentasi />}
            </TabPanel>
          </TabContext>
        </Grid>
      </Fragment>
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'inspektur-page'
}

export default Index
