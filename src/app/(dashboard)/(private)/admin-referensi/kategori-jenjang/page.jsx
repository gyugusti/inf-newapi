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
import Kategori from '@/views/admin-referensi/kategori-jenjang/Kategori'
import Jenjang from '@/views/admin-referensi/kategori-jenjang/Jenjang'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

const Index = () => {
  const router = useRouter()
  let value = 'kategori'

  const [tab, setTab] = useState(value)

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }

  const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Kategori' }]

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
            <Tab value='kategori' label='Kategori Inspektur' />
            <Tab value='jenjang' label='Jenjang Inspektur' />
          </CustomTabList>
          <CardContent>
            <TabPanel value='kategori' sx={{ p: 0 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                <Kategori />
              </Typography>
            </TabPanel>
            <TabPanel value='jenjang' sx={{ p: 0 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                <Jenjang />
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
