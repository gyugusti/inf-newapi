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
import BebanKerja from '@/views/data-inspeksi/inspeksi/BebanKerja'
import Sdm from '@/views/data-inspeksi/inspeksi/Sdm'

const Index = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('beban')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const breadcrumbs = [{ name: 'Data Inspektur', path: '/data-inspeksi/inspektur' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='beban' label='Beban Kerja' />
              <Tab value='sdm' label='Detail SDM' />
            </CustomTabList>
            <TabPanel value='beban'>
              <BebanKerja />
            </TabPanel>
            <TabPanel value='sdm'>
              <Sdm />
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
