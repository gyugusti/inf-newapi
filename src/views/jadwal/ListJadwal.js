import React, { Fragment, useEffect, useState } from 'react'

import Link from 'next/link'

import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import Tab from '@mui/material/Tab'

import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'

import JadwalContainer from './JadwalContainer'
import { setStatus } from '@/redux-store/jadwal'

import { CustomTabList } from '@/components/styles/TabPIlls'

import SearchContainer from '@/components/jadwal/SearchContainer'

const ListJadwal = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('draft')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatus(newValue))
  }

  useEffect(() => {
    dispatch(setStatus(value))
  }, [dispatch, value])

  return (
    <>
      <Card>
        <Link
          href={{
            pathname: `form-jadwal`
          }}
        >
          <Button variant='tonal'>
            Buat Jadwal <Icon icon='tabler:plus' fontSize={25} />
          </Button>
        </Link>
        <CardContent>
          <TabContext value={value}>
            <CustomTabList onChange={handleChange} aria-label='nav tabs example'>
              <Tab value='draft' component='a' label='Draft' href='#' onClick={e => e.preventDefault()} />
              <Tab value='persetujuan' component='a' label='Persetujuan' href='#' onClick={e => e.preventDefault()} />
              <Tab value='terjadwal' component='a' label='Terjadwal' href='#' onClick={e => e.preventDefault()} />
              <Tab value='pelaksanaan' component='a' label='Pelaksanaan' href='#' onClick={e => e.preventDefault()} />
              <Tab value='arsip' component='a' label='Arsip' href='#' onClick={e => e.preventDefault()} />
            </CustomTabList>
            <TabPanel value={value}>
              <SearchContainer view='verifikator' />
              <JadwalContainer view='verifikator' />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

export default ListJadwal
