'use client'

import { useEffect, useState } from 'react'

import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { Card, CardContent } from '@mui/material'
import Tab from '@mui/material/Tab'

import { useDispatch } from 'react-redux'

import CustomTabList from '@/@core/components/mui/TabList'
import { setStatusFihi } from '@/redux-store/fihi'
import { setStatus } from '@/redux-store/jadwal'
import ArsipFihi from '@/views/fihi/ArsipFihi'
import { JadwalFihi } from '@/views/jadwal/inspektur/JadwalFihi'

const Fihi = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('pelaksanaan')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatusFihi(newValue))
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
              <Tab value='1' label='Arsip' />
            </CustomTabList>
            <TabPanel value='pelaksanaan'>
              <JadwalFihi view='inspektur' />
            </TabPanel>
            <TabPanel value='1'>
              <ArsipFihi />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

export default Fihi
