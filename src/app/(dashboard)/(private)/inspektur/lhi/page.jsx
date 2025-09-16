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
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import VerLkf from '@/views/lvkf/VerLkf'
import { setStatus } from '@/redux-store/jadwal'
import { JADWAL_PELAKSANAAN } from '@/configs/jadwalConfig'
import { JadwalLvkf } from '@/views/jadwal/inspektur/JadwalLvkf'
import LhiInpektur from '@/views/lhi/LhiInpektur'
import { setStatusLhi } from '@/redux-store/lhi'
import { JadwalLhi } from '@/views/jadwal/inspektur/JadwalLhi'

const Index = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('draft_inspektur')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatusLhi(newValue))
  }

  useEffect(() => {
    if (value === 'jadwal') {
      dispatch(setStatus([JADWAL_PELAKSANAAN]))
    } else {
      dispatch(setStatusLhi(value))
    }
  }, [dispatch, value])

  return (
    <>
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='draft_inspektur' label='Draft LHI' />
              <Tab value='jadwal' label='LHI Perjadwal' />
              <Tab value='arsip_inspektur' label='Arsip' />
            </CustomTabList>
            <TabPanel value='draft_inspektur'>
              <LhiInpektur />
            </TabPanel>
            <TabPanel value='jadwal'>
              <JadwalLhi />
            </TabPanel>
            <TabPanel value='arsip_inspektur'>
              <LhiInpektur />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

Index.acl = {
  action: 'all',
  subject: 'inspektur-page'
}

export default Index
