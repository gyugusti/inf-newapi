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

import { useSession } from 'next-auth/react'

import TabelSrp from './TabelSrp'
import { setKoordinator, setTahapan } from '@/redux-store/validasi-data'
import CustomTabList from '@core/components/mui/TabList'

const KoordinatorSrp = () => {
  // States
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const user_id = session?.user?.id || ''
  const roles = session?.user?.roles || ''
  const [activeTab, setActiveTab] = useState('daftar')
  const [title, setTitle] = useState('Pengajuan')
  const [val, setVal] = useState(2)

  const { tahap_reg_id, isLoading } = useSelector(store => store.validasiData)

  const handleChange = (event, value) => {
    setActiveTab(value)

    if (value === 'daftar') {
      setTitle('Pengajuan')
      dispatch(setTahapan([2]))
    } else {
      setTitle('Arsip')
      dispatch(setTahapan([3, 4, -1]))
    }
  }

  useEffect(() => {
    dispatch(setTahapan([val]))
  }, [dispatch, val])

  useEffect(() => {
    const isKoord = Array.isArray(roles) && roles.includes('koordinator')

    if (isKoord) {
      dispatch(setKoordinator(user_id))
    }
  }, [user_id, roles, dispatch])

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
                <TabelSrp view='koordinator' />
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default KoordinatorSrp
