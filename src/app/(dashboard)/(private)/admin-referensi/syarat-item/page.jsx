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
import Kelompok from '@/views/admin-referensi/syarat-item/Kelompok'
import Item from '@/views/admin-referensi/syarat-item/Item'

const Index = () => {
  const router = useRouter()
  let value = 'kelompok'

  const [tab, setTab] = useState(value)

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }

  const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Syarat SBI' }]

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
            <Tab value='kelompok' label='Syarat Kelompok' />
            <Tab value='item' label='Syarat Item' />
          </CustomTabList>
          <CardContent>
            <TabPanel value='kelompok' sx={{ p: 0 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                <Kelompok />
              </Typography>
            </TabPanel>
            <TabPanel value='item' sx={{ p: 0 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                <Item />
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
