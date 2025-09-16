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
import { setStatus } from '@/redux-store/lkf'

const Index = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('daftar')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatus(newValue))
  }

  useEffect(() => {
    dispatch(setStatus(value))
  }, [dispatch, value])

  const breadcrumbs = [{ name: 'LVKF Jadwal', path: '/lvkf-jadwal' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='daftar' label=' Verifikasi LVKF' />
              <Tab value='arsip' label='Arsip' />
            </CustomTabList>
            <TabPanel value={value}>
              <VerLkf view='koordinator' />
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
