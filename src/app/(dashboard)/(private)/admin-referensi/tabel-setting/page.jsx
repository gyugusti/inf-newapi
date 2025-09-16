'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'

import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import { CustomTabList } from '@/components/styles/TabPIlls'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import Kelompok from '@/views/admin-referensi/tabel-setting/Kelompok'
import LibTabel from '@/views/admin-referensi/tabel-setting/LibTabel'

const Index = () => {
  const router = useRouter()
  let value = 'kelompok'

  const [tab, setTab] = useState(value)

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }

  const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Setting Tabel' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <TabContext value={tab}>
          <CustomTabList
            onChange={handleChange}
            aria-label='card navigation example'
            sx={{ '& .MuiTab-root': { py: 3.5 } }}
          >
            <Tab value='kelompok' label='Kelompok Temuan' />
            <Tab value='lib' label='Library Tabel' />
          </CustomTabList>
          <CardContent>
            <TabPanel value='kelompok' sx={{ p: 0 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                <Kelompok />
              </Typography>
            </TabPanel>
            <TabPanel value='lib' sx={{ p: 0 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                <LibTabel />
              </Typography>
            </TabPanel>
          </CardContent>
        </TabContext>
      </Card>
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default Index
