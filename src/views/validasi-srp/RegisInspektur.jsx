'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import Grid2 from '@mui/material/Grid'
import { Card, CardHeader, Divider, Typography, IconButton, Button } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid2'

import { useDispatch } from 'react-redux'

import { useSession } from 'next-auth/react'

import TabelSrp from './TabelSrp'
import { setInspektur, setTahapan } from '@/redux-store/validasi-data'
import CustomTabList from '@core/components/mui/TabList'

const RegisInspektur = () => {
  // States
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const insp_master_id = session?.user?.insp_master_id || ''
  const roles = session?.user?.roles || ''

  const [activeTab, setActiveTab] = useState('daftar')
  const [title, setTitle] = useState('Daftar')
  const [val, setVal] = useState(0)

  const handleChange = (event, value) => {
    setActiveTab(value)

    if (value === 'daftar') {
      setTitle('Daftar')
      dispatch(setTahapan([0]))
    } else {
      setTitle('Arsip')
      dispatch(setTahapan([1, 2, 3, 4]))
    }
  }

  useEffect(() => {
    dispatch(setTahapan([val]))
  }, [dispatch, val])

  useEffect(() => {
    const isAdmin = Array.isArray(roles) && roles.includes('admin')

    if (!isAdmin) {
      dispatch(setInspektur([insp_master_id]))
    }
  }, [insp_master_id, roles, dispatch])

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab icon={<i className='tabler-user' />} value='daftar' label='Daftar' iconPosition='start' />
              <Tab icon={<i className='tabler-lock' />} value='arsip' label='Arsip' iconPosition='start' />
            </CustomTabList>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TabPanel value={activeTab} className='p-0'>
              <Card>
                <CardHeader
                  title={`${title} Registrasi SRP`}
                  action={
                    <Link href='/inspektur/registrasi-srp/form-registrasi' passHref>
                      <Button variant='contained' color='primary'>
                        Create Registrasi SRP
                      </Button>
                    </Link>
                  }
                />

                <Divider />
                <TabelSrp view='registrasi' />
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default RegisInspektur
