'use client'

import React, { Fragment, useEffect, useState } from 'react'

import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Button, Card, CardContent } from '@mui/material'

import { useDispatch } from 'react-redux'

import CustomTabList from '@/@core/components/mui/TabList'
import { setStatus } from '@/redux-store/jadwal'
import { JadwalFihi } from '@/views/jadwal/inspektur/JadwalFihi'
import ArsipFihi from '@/views/fihi/ArsipFihi'

const Fihi = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('pelaksanaan')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatus(newValue))
  }

  useEffect(() => {
    if (value === 'pelaksanaan') {
      dispatch(setStatus(value))
    }
  }, [dispatch, value])

  return (
    <>
      <Card>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
              <Tab value='pelaksanaan' label='Pembuatan FIHI' />
              <Tab value='arsip' label='Arsip' />
            </CustomTabList>
            <TabPanel value='pelaksanaan'>
              <JadwalFihi view='inspektur' />
            </TabPanel>
            <TabPanel value='arsip'>
              <ArsipFihi />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

export default Fihi
