'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination'

import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'

import { CustomTabList } from '@/components/styles/TabPIlls'
import Loading from '@/components/Loading'
import { getInspekturDetail } from '@/redux-store/referensi-infara'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import ShadowBox from '@/components/styles/ShadowBox'
import Sdm from '@/views/data-inspeksi/inspeksi/Sdm'
import DetailInspektur from '@/views/data-inspeksi/inspeksi/DetailInspektur'
import RiwayatInspeksi from '@/views/data-inspeksi/inspeksi/RiwayatInspeksi'

const InspekturDetail = () => {
  const dispatch = useDispatch()

  const router = useRouter()
  const query = router.query
  const insp_master_id = query.insp_master_id

  const { InspekturDetail, isLoading, numOfPages, current_page, per_page, tab } = useSelector(store => store.refInfara)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    if (insp_master_id) {
      dispatch(getInspekturDetail(insp_master_id))
    }
  }, [dispatch, current_page, insp_master_id])

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const breadcrumbs = [{ name: 'Data Inspektur', path: '/data-inspeksi/inspektur' }, { name: 'Detail' }]

  if (isLoading || !InspekturDetail) {
    return <Loading />
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <ShadowBox>
        <ul>
          <li>Nama : {InspekturDetail.nama}</li>
          <li>Nip : {InspekturDetail.nip}</li>
          <li>Status : {InspekturDetail.status_id == 1 ? 'Aktif' : 'Tidak Aktif'} </li>
        </ul>
      </ShadowBox>
      <br />
      <ShadowBox>
        <TabContext value={value}>
          <CustomTabList onChange={handleChange} aria-label='customized tabs example'>
            <Tab value='1' label='Jenjang Inspektur' />
            <Tab value='2' label='Riwayat Inspeksi' />
            <Tab value='3' label='Penerimaan Dosis' />
          </CustomTabList>
          <TabPanel value='1'>
            {/* Jenjang inspektur */}
            <DetailInspektur jenjang={InspekturDetail.jenjang} />
          </TabPanel>
          <TabPanel value='2'>
            <RiwayatInspeksi riwayat={InspekturDetail.riwayat} />
          </TabPanel>
          <TabPanel value='3'>
            <Typography>Penerimaan Dosis</Typography>
          </TabPanel>
        </TabContext>
      </ShadowBox>
    </>
  )
}

InspekturDetail.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default InspekturDetail
