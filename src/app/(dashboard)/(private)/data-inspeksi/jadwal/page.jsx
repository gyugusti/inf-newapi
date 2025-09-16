'use client'
import React, { useEffect, useState } from 'react'

import Tab from '@mui/material/Tab'

import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Button, Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'

import CustomTabList from '@/@core/components/mui/TabList'

import SearchContainer from '@/components/jadwal/SearchContainer'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import VerLkf from '@/views/lvkf/VerLkf'
import JadwalProp from '@/views/data-inspeksi/jadwal/JadwalProp'
import JadwalTgl from '@/views/data-inspeksi/jadwal/JadwalTgl'

const Index = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('lokasi')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const breadcrumbs = [{ name: 'Jadwal Inspeksi', path: '/data-inspeksi/jadwal' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='lokasi' label='Per Lokasi' />
              <Tab value='tanggal' label='Per Tanggal' />
            </CustomTabList>
            <TabPanel value='lokasi'>
              <JadwalProp />
            </TabPanel>
            <TabPanel value='tanggal'>
              <JadwalTgl />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

Index.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Index
