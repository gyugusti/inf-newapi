'use client'

import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { Box, CardContent, CircularProgress, Tab } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { TabContext, TabPanel } from '@mui/lab'

import { getSensusSrpDetail } from '@/redux-store/validasi-data'

import CustomTabsWithBadges from '@/components/styles/CustomTabsWithBadges'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import Fasilitas from '@/views/sensus-srp/Fasilitas'
import FormSensus from '@/views/sensus-srp/FormSensus'
import Ktun from '@/views/sensus-srp/Ktun'
import MasterData from '@/views/sensus-srp/MasterData'
import MasterDoc from '@/views/sensus-srp/MasterDoc'
import Mohon from '@/views/sensus-srp/Mohon'
import RiwayatValidasi from '@/views/sensus-srp/RiwayatValidasi'

const Page = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const id = params.id

  const [value, setValue] = useState('form')

  const { current_page, tab, cari, detailSrp } = useSelector(store => store.validasiData)

  useEffect(() => {
    if (id) {
      dispatch(getSensusSrpDetail(id))
    }
  }, [dispatch, current_page, id, tab, cari])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const tabs = [
    { value: 'form', label: 'form validasi', icon: 'tabler-user' },
    { value: 'dokumen', label: 'dokumen', icon: 'tabler-lock' },
    { value: 'data-master', label: 'Data Master', icon: 'tabler-clock', badgeColor: 'success' },
    { value: 'fasilitas', label: 'Fasilitas', icon: 'tabler-clock', badge: 1, badgeColor: 'success' },
    { value: 'riwayat-validasi', label: 'Riwayat Validasi', icon: 'tabler-clock', badge: 1, badgeColor: 'success' },
    { value: 'ktun', label: 'KTUN', icon: 'tabler-clock', badge: 1, badgeColor: 'success' },

    { value: 'permohonan', label: 'Permohonan', icon: 'tabler-clock', badge: 1, badgeColor: 'success' }
  ]

  const breadcrumbs = [{ name: 'Sensus Sumber', path: `/sensus-srp` }, { name: 'Detail Sensus Sumber' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />

      <TabContext value={value}>
        <CustomTabsWithBadges value={value} onChange={handleChange}>
          <Tab value='form' icon={<i className='tabler-user' />} iconPosition='start' label='Form Validasi Sensus' />
          <Tab value='dokumen' icon={<i className='tabler-lock' />} iconPosition='start' label='Dokumen Sensus' />
          {/* <Tab value='data-master' icon={<i className='tabler-clock' />} iconPosition='start' label='Data Master' /> */}
          <Tab value='fasilitas' icon={<i className='tabler-clock' />} iconPosition='start' label='Fasilitas' />
          <Tab
            value='riwayat-validasi'
            icon={<i className='tabler-clock' />}
            iconPosition='start'
            label='Riwayat Validasi'
          />
          <Tab value='ktun' icon={<i className='tabler-clock' />} iconPosition='start' label='KTUN' />
          <Tab value='permohonan' icon={<i className='tabler-clock' />} iconPosition='start' label='Permohonan' />
          <Tab value='aspak' icon={<i className='tabler-clock' />} iconPosition='start' label='Sinkorn Aspak' />
          {/* <Tab value='kelompok' icon={<i className='tabler-clock' />} iconPosition='start' label='Kelompok Kegiatan' /> */}
        </CustomTabsWithBadges>

        <Box sx={{ flexGrow: 1, p: 2 }}>
          <CardContent>
            <TabPanel value='form'>
              {detailSrp != '' ? (
                <MasterData detail={detailSrp} masterId={id} />
              ) : (
                <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
              )}
              {detailSrp != '' ? (
                <FormSensus detailSrp={detailSrp} id={id} />
              ) : (
                <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
            <TabPanel value='dokumen'>
              {detailSrp != '' ? (
                <MasterDoc dataMasterDoc={detailSrp?.sumber_doc} />
              ) : (
                <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
            <TabPanel value='data-master'>
              {detailSrp != '' ? (
                <MasterData detail={detailSrp} masterId={id} />
              ) : (
                <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
            <TabPanel value='fasilitas'>
              {detailSrp != '' ? (
                <Fasilitas dataFasilitas={detailSrp?.fas} dataSrp={detailSrp} />
              ) : (
                <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
            <TabPanel value='riwayat-validasi'>
              {detailSrp != '' ? (
                <RiwayatValidasi dataRiwayatValidasi={detailSrp?.validasi} />
              ) : (
                <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
            <TabPanel value='ktun'>
              {detailSrp != '' ? (
                <>
                  <Ktun dataKtun={detailSrp?.ktun} view='25' />
                  <Ktun dataKtun={detailSrp?.ktun20} view='20' />
                </>
              ) : (
                <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
            <TabPanel value='permohonan'>
              {detailSrp != '' ? (
                <Mohon dataMohon={detailSrp?.mohon} />
              ) : (
                <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
            {/* <TabPanel value='kelompok'>Konten Kelompok Kegiatan</TabPanel> */}
          </CardContent>
        </Box>
      </TabContext>
    </>
  )
}

export default Page
