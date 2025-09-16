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
import { setSbi, setStatus } from '@/redux-store/jadwal'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import KonfirmasiJadwal from '@/views/jadwal/KonfirmasiJadwal'
import { JADWAL_TERJADWAL, JADWAL_PELAKSANAAN, JADWAL_SELESAI } from '@/configs/jadwalConfig'

const Index = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('daftar')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (value === 'arsip') {
      dispatch(setStatus(value))
    } else {
      dispatch(setStatus([JADWAL_TERJADWAL, JADWAL_PELAKSANAAN]))
    }
  }, [dispatch, value])

  return (
    <>
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='daftar' label='Daftar Jadwal' />
              <Tab value='arsip' label='Arsip' />
            </CustomTabList>
            <TabPanel value={value}>
              <SearchContainer view='verifikator' />
              <KonfirmasiJadwal />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default Index
