'use client'

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import Tab from '@mui/material/Tab'

//import { CustomTabList } from '@/components/styles/TabPIlls'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Button, Card, CardContent } from '@mui/material'

import { useDispatch } from 'react-redux'

import CustomTabList from '@/@core/components/mui/TabList'
import SearchContainer from '@/components/jadwal/SearchContainer'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { DataSbi } from '@/views/frontend/sbi/DataSbi'

import { setStatus } from '@/redux-store/sbi'

const Index = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const fas_id = session?.user?.fas_id
  const [value, setValue] = useState('pelaksanaan')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatus(newValue))
  }

  useEffect(() => {
    dispatch(setStatus(value))
  }, [dispatch, value])

  return (
    <>
      <TabContext value={value}>
        <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
          <Tab value='pelaksanaan' label='SBI Baru' />
          <Tab value='arsip' label='Arsip' />
        </CustomTabList>
        <Card>
          <CardContent>
            <TabPanel value={value}>
              <DataSbi />
            </TabPanel>
          </CardContent>
        </Card>
      </TabContext>
    </>
  )
}

export default Index
