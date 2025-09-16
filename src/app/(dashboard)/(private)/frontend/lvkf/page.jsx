'use client'

import { useEffect, useState } from 'react'

import Tab from '@mui/material/Tab'
import { useSession } from 'next-auth/react'

//import { CustomTabList } from '@/components/styles/TabPIlls'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import { Card, CardContent } from '@mui/material'
import { useDispatch } from 'react-redux'

import CustomTabList from '@/@core/components/mui/TabList'

import { setFasilitas, setStatus } from '@/redux-store/lkf/index'
import IndexLvkf from '@/views/lvkf/frontend/IndexLvkf'

const Page = () => {
  const { data: session } = useSession()
  const [value, setValue] = useState('draft_frontend')
  const fas_id = session?.user?.fas_id
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setStatus(newValue))
  }

  useEffect(() => {
    dispatch(setFasilitas(fas_id))
    dispatch(setStatus(value))
  }, [dispatch, fas_id, value])

  return (
    <>
      <TabContext value={value}>
        <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
          <Tab value='draft_frontend' label=' Daftar LVKF' />
          <Tab value='arsip_frontend' label='Arsip LVKF' />
        </CustomTabList>
        <Card>
          <CardContent>
            <TabPanel value={value}>
              <IndexLvkf fas_id={fas_id} />
            </TabPanel>
          </CardContent>
        </Card>
      </TabContext>
    </>
  )
}

Page.acl = {
  action: 'read',
  subject: 'fasilitas-page'
}

export default Page
