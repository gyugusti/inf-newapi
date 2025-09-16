'use client'

import { useState, forwardRef, useEffect, Fragment } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { useSession } from 'next-auth/react'

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
  Paper,
  CircularProgress
} from '@mui/material'
import Grid from '@mui/material/Grid2'

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
import { getFihiPihak, getdataFihi, setTab, simpanForm } from '@/redux-store/fihi'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import Loading from '@/components/Loading'
import { formatDates, fullDay } from '@/utils/helper'
import DetailJadwal from '@/components/jadwal/DetailJadwal'
import FihiPihak from '@/views/fihi/FihiPihak'
import FihiPemeriksaan from '@/views/fihi/FihiPemeriksaan'
import { getIkk } from '@/redux-store/admin-referensi/ikk'
import Kesimpulan from '@/views/fihi/Kesimpulan'
import Dokumentasi from '@/views/fihi/Dokumentasi'
import Action from '@/views/fihi/Action'

const Index = () => {
  const { data: session, status } = useSession()
  const theme = useTheme()
  const router = useRouter()
  const dispatch = useDispatch()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [value, setValue] = useState('1')

  const { dataFihi, isLoading, tab, fihiPihak } = useSelector(store => store.fihi)
  const { ikk } = useSelector(store => store.ikk)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getdataFihi(id))
      dispatch(getFihiPihak(id))
    }
  }, [id, dispatch, tab, value])

  useEffect(() => {
    dispatch(getIkk())
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)

    if (newValue === 2) {
      dispatch(getFihiPihak(id))
    }
  }

  if (isLoading || !dataFihi || !id) {
    return <Loading />
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target

    const inkfIds = [...form.querySelectorAll('[name="inkf_id"]')].map(({ value }) => value)

    const temuanIds = [...form.querySelectorAll('[name="temuan_id"]')].map(({ value }) => value)

    const hasilTemuans = temuanIds.map(temuanId => {
      const group = document.getElementById(`hasil-temuan${temuanId}`)
      const checkedRadio = group?.querySelector('input[type="radio"]:checked')

      return checkedRadio?.value ?? null
    })

    const catatans = temuanIds.map(temuanId => {
      const input = document.getElementById(`catatan${temuanId}`)

      return input ? input.value : null
    })

    const ikkItems = inkfIds.map(inkfId => {
      const group = document.getElementById(`ikk_item${inkfId}`)
      const checkedRadio = group?.querySelector('input[type="radio"]:checked')

      return checkedRadio?.value ?? null
    })

    // Do something with the form values
    const dataform = {
      inkf_id: inkfIds,
      ikk_item_id: ikkItems,
      hasil_temuan_id: hasilTemuans,
      uraian: catatans,
      temuan_id: temuanIds,
      user_nama: session.user.nama
    }

    dispatch(simpanForm({ id: id, dataform }))
    dispatch(setTab(dataform))
  }

  const breadcrumbs = [
    { name: 'FIHI', path: '/inspektur/fihi' },
    { name: 'Daftar FIHI', path: '/inspektur/fihi/' + dataFihi.jadwal_fas?.jadwal_id },
    { name: 'Form FIHI' }
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
            <Grid>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <TableCellNoRow>Nama Instansi</TableCellNoRow>
                    <TableCellNoRow>{dataFihi.jadwal_fas?.fas.nama}</TableCellNoRow>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCellNoRow>Lokasi Pemanfaatan</TableCellNoRow>
                    <TableCellNoRow> {dataFihi.lokasi}</TableCellNoRow>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCellNoRow>Kelompok Kegiatan / Sifat </TableCellNoRow>
                    <TableCellNoRow>
                      {dataFihi.kelompok?.nama} ({dataFihi.jadwal_fas?.sifat?.nama} )
                    </TableCellNoRow>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCellNoRow>Tanggal Pelaksanaan</TableCellNoRow>
                    <TableCellNoRow>
                      {dataFihi.tgl_mulai && formatDates(dataFihi.tgl_mulai, dataFihi.tgl_akhir)}
                    </TableCellNoRow>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCellNoRow>No FIHI</TableCellNoRow>
                    <TableCellNoRow>{dataFihi.no_fihi}</TableCellNoRow>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCellNoRow>Tanggal FIHI</TableCellNoRow>
                    <TableCellNoRow>{dataFihi.tgl_fihi}</TableCellNoRow>
                  </StyledTableRow>
                  <TableRow>
                    <TableCellNoRow colSpan={2}>
                      <Action dataFihi={dataFihi} />
                    </TableCellNoRow>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Grid marginTop={4}>
          <TabContext value={value}>
            <CustomTabList onChange={handleChange} aria-label='simple tabs example'>
              <Tab value='1' label='Jadwal' sx={{ backgroundColor: 'background.paper', borderRadius: 1 }} />
              <Tab
                value='6'
                label='Lokasi'
                sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 3 }}
              />
              <Tab
                value='2'
                label='Pihak Instansi'
                sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 3 }}
              />
              <Tab
                value='3'
                label='FIHI'
                sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 3 }}
              />
              <Tab
                value='4'
                label='Kesimpulan'
                sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 3 }}
              />
              <Tab
                value='5'
                label='Dokumentasi'
                sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 3 }}
              />
            </CustomTabList>
            <TabPanel value='1' sx={{ padding: 0 }}>
              <Paper>{dataFihi && <DetailJadwal dataFihi={dataFihi} />}</Paper>
            </TabPanel>
            <TabPanel value='6' sx={{ padding: 0 }}>
              <Paper sx={{ padding: 3 }}>lokasi</Paper>
            </TabPanel>
            <TabPanel value='2' sx={{ padding: 0 }}>
              <Paper sx={{ padding: 3 }}>
                <FihiPihak dataFihi={dataFihi} />
              </Paper>
            </TabPanel>
            <TabPanel value='3' sx={{ padding: 0 }}>
              <Grid>
                <form id='myForm' onSubmit={handleSubmit}>
                  <div id='loop'>
                    {dataFihi.inkf && dataFihi.inkf.length > 0 ? (
                      dataFihi.inkf.map((item, index) => (
                        <FihiPemeriksaan
                          ikk={ikk}
                          item={item}
                          dataFihi={dataFihi}
                          key={index}
                          no={index + 1}
                          action='non-view'
                        />
                      ))
                    ) : (
                      <Box
                        sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                      >
                        <CircularProgress sx={{ mb: 4 }} />
                        <Typography>Loading...</Typography>
                      </Box>
                    )}
                  </div>
                  <Grid container spacing={5}>
                    <Grid size={{ xs: 6, md: 8, sm: 8 }}>
                      {dataFihi.inkf && (
                        <Button variant='contained' type='submit'>
                          Submit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </TabPanel>
            <TabPanel value='4' sx={{ padding: 0 }}>
              {dataFihi.inkf && dataFihi.inkf.length > 0 ? (
                <Kesimpulan fihi_id={id} dataFihi={dataFihi} />
              ) : (
                <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              )}
            </TabPanel>
            <TabPanel value='5' sx={{ padding: 0 }}>
              <Paper sx={{ padding: 3 }}>
                <Dokumentasi dataFihi={dataFihi} />
              </Paper>
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
