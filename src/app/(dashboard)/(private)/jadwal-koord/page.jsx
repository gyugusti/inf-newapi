'use client'

import React, { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'

//import { CustomTabList } from '@/components/styles/TabPIlls'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Button, Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'

import CustomTabList from '@/@core/components/mui/TabList'
import ListJadwal from '@/views/jadwal/ListJadwal'
import JadwalContainer from '@/views/jadwal/JadwalContainer'
import { setStatus } from '@/redux-store/jadwal'
import SearchContainer from '@/components/jadwal/SearchContainer'

const Index = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('persetujuan')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatus(newValue))
  }

  useEffect(() => {
    dispatch(setStatus(value))
  }, [dispatch, value])

  return (
    <>
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='persetujuan' label='Persetujuan' />
              <Tab value='terjadwal' label='Terjadwal' />
              <Tab value='pelaksanaan' label='Pelaksanaan' />
              <Tab value='arsip' label='Arsip' />
            </CustomTabList>
            <TabPanel value={value}>
              <SearchContainer view='koordinator' />

              <JadwalContainer view='koordinator' />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'koor-page'
}

export default Index
