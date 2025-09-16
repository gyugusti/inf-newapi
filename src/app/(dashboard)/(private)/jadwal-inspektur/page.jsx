'use client'

import React, { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Button, Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'

import CustomTabList from '@/@core/components/mui/TabList'
import ListJadwal from '@/views/jadwal/ListJadwal'
import { setStatus } from '@/redux-store/jadwal'
import SearchContainer from '@/components/jadwal/SearchContainer'
import { JadwalContainer } from '@/views/jadwal/inspektur/JadwalContainer'
import { JADWAL_TERJADWAL, JADWAL_PERSETUJUAN } from '@/configs/jadwalConfig'

const Index = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('konfirmasi')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (value === 'arsip') {
      dispatch(setStatus(value))
    } else {
      dispatch(setStatus([JADWAL_TERJADWAL, JADWAL_PERSETUJUAN]))
    }
  }, [dispatch, value])

  return (
    <>
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='konfirmasi' label='Konfirmasi' />
              <Tab value='arsip' label='Arsip' />
            </CustomTabList>
            <TabPanel value={value}>
              <SearchContainer view='inspektur' />
              {value && <JadwalContainer view='inspektur' />}
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'inspektur-page'
}

export default Index
