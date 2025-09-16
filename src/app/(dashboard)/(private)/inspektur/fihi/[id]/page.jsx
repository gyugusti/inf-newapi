'use client'

// ** React Imports
import { useState, useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardContent } from '@mui/material'
import Grid from '@mui/material/Grid2'

import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { Icon } from '@iconify/react/dist/iconify.js'
import Tab from '@mui/material/Tab'

import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Box from '@mui/material/Box'

import { CustomTabList } from '@/components/styles/TabPIlls'
import { getdetailJadwal, setFihi } from '@/redux-store/jadwal'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import Priview from '@/views/jadwal/Priview'

import DetailBar from '@/views/fihi/DetailBar'
import { getfihiJadwal, setStatusFihi } from '@/redux-store/fihi'

const Index = () => {
  const [value, setValue] = useState('0')

  const router = useRouter()

  const params = useParams()
  const id = params.id

  const dispatch = useDispatch()

  const { detailJadwal } = useSelector(store => store.jadwal)
  const { status, fihiJadwal, isLoading, tab } = useSelector(store => store.fihi)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(setStatusFihi(value))
      dispatch(getdetailJadwal(id))
      dispatch(getfihiJadwal(id))
    }
  }, [id, dispatch, tab, status, value])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatusFihi(newValue))
  }

  const breadcrumbs = [{ name: 'FIHI', path: '/inspektur/fihi' }, { name: 'Daftar FIHI' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <br />
      <Grid> {detailJadwal && <Priview detail={detailJadwal} />}</Grid>
      <Grid marginTop={4}>
        <TabContext value={value}>
          <CustomTabList onChange={handleChange} aria-label='simple tabs example'>
            <Tab value='0' label='Draft' sx={{ backgroundColor: 'background.paper', borderRadius: 1 }} />
            <Tab value='1' label='Arsip' sx={{ backgroundColor: 'background.paper', borderRadius: 1 }} />
          </CustomTabList>
          <TabPanel value='0' sx={{ padding: 0 }}>
            {isLoading ? (
              <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <Grid>{detailJadwal && <DetailBar detail={detailJadwal} fihiJadwal={fihiJadwal} />}</Grid>
            )}
          </TabPanel>
          <TabPanel value='1' sx={{ padding: 0 }}>
            {isLoading ? (
              <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <Grid>{detailJadwal && <DetailBar detail={detailJadwal} fihiJadwal={fihiJadwal} />}</Grid>
            )}
          </TabPanel>
        </TabContext>
      </Grid>
    </>
  )
}

Index.acl = {
  action: 'all',
  subject: 'inspektur-page'
}

export default Index
