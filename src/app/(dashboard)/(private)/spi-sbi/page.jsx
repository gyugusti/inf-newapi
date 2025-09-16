'use client'

import React, { useEffect, useState } from 'react'

import Tab from '@mui/material/Tab'

//import { CustomTabList } from '@/components/styles/TabPIlls'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Button, Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'

import CustomTabList from '@/@core/components/mui/TabList'
import SearchContainer from '@/components/jadwal/SearchContainer'
import { JadwalSbi } from '@/views/jadwal/sbi/JadwalSbi'
import { setSbi, setStatus } from '@/redux-store/jadwal'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

const SpiSbi = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('sbi')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatus(newValue))
    dispatch(setSbi(newValue))
  }

  useEffect(() => {
    dispatch(setStatus(value))
    dispatch(setSbi(value))
  }, [dispatch, value])

  const breadcrumbs = [{ name: 'SPI-SBI', path: '/spi-sbi' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='sbi' label='Daftar Jadwal' />
              <Tab value='arsip' label='Arsip' />
            </CustomTabList>
            <TabPanel value={value}>
              <SearchContainer view='verifikator' />
              <JadwalSbi view='verifikator' />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

SpiSbi.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default SpiSbi
