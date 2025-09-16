'use client'

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'

import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import CustomTabList from '@/@core/components/mui/TabList'
import KegiatanContainer from '@/views/admin-referensi/KegiatanContainer'
import KelKegiatanContainer from '@/views/admin-referensi/KelKegiatanContainer'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Kelompok Kegiatan' }]

const Index = () => {
  // ** State
  const [value, setValue] = useState('kelompok')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <TabContext value={value}>
          <CustomTabList
            onChange={handleChange}
            aria-label='card navigation example'
            sx={{ '& .MuiTab-root': { py: 3.5 } }}
          >
            <Tab value='kelompok' label='Kelompok' />
            <Tab value='kegiatan' label='Kegiatan' />
          </CustomTabList>
          <CardContent>
            <TabPanel value='kelompok' sx={{ p: 0 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                <KelKegiatanContainer />
              </Typography>
            </TabPanel>
            <TabPanel value='kegiatan' sx={{ p: 0 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                <KegiatanContainer />
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
