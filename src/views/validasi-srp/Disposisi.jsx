'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import Grid2 from '@mui/material/Grid'
import { Card, CardHeader, Divider, Typography, IconButton, Button } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid2'

import { useDispatch, useSelector } from 'react-redux'

import TabelSrp from './TabelSrp'
import { setTahapan } from '@/redux-store/validasi-data'
import CustomTabList from '@core/components/mui/TabList'

const Disposisi = () => {
  // States
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('daftar')
  const [title, setTitle] = useState('Disposisi')
  const [val, setVal] = useState(1)

  const { tahap_reg_id, isLoading } = useSelector(store => store.validasiData)

  const handleChange = (event, value) => {
    setActiveTab(value)

    if (value === 'daftar') {
      setTitle('Daftar')
      dispatch(setTahapan([1]))
    } else {
      setTitle('Arsip')
      dispatch(setTahapan([2, 3, 4, -1]))
    }
  }

  useEffect(() => {
    dispatch(setTahapan([val]))
  }, [dispatch, val])

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab icon={<i className='tabler-user' />} value='daftar' label='Pengajuan' iconPosition='start' />
              <Tab icon={<i className='tabler-lock' />} value='arsip' label='Arsip' iconPosition='start' />
            </CustomTabList>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TabPanel value={activeTab} className='p-0'>
              <Card>
                <CardHeader title={`${title} Validasi SRP`} />
                <Divider />
                <TabelSrp view='disposisi' />
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default Disposisi
