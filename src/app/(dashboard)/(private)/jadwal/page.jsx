'use client'

import { Fragment, useState } from 'react'

// ** MUI Imports

import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'

import { CustomTabList } from '@/components/styles/TabPIlls'
import ListJadwal from '@/views/jadwal/ListJadwal'

const Index = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
        <Tab value='1' label='Jadwal' />
        <Tab value='2' label='Monitoring' />
        <Tab value='3' label='Perencanaan' />
      </CustomTabList>
      <TabPanel value='1'>
        <ListJadwal />
      </TabPanel>
      <TabPanel value='2'>grid</TabPanel>
      <TabPanel value='3'>
        <Typography>Perencanaan</Typography>
      </TabPanel>
    </TabContext>
  )
}

Index.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default Index
