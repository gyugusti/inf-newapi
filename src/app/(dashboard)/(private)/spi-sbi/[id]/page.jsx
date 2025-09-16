'use client'

import { useState, useEffect } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardContent } from '@mui/material'

// ** MUI Imports
import Grid from '@mui/material/Grid2'

import Priview from '@/views/jadwal/Priview'

import { getdetailJadwal } from '@/redux-store/jadwal'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import ListSbi from '@/views/jadwal/sbi/ListSbi'

const Sbi = () => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const id = params.id

  const dispatch = useDispatch()

  const { detailJadwal, isLoading, tab } = useSelector(store => store.jadwal)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getdetailJadwal(id))
    }
  }, [id, dispatch, tab])

  const breadcrumbs = [{ name: 'SPI SBI', path: '/spi-sbi' }, { name: 'Detail' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <br />
      <Grid>{detailJadwal && <Priview detail={detailJadwal} />}</Grid>
      <Grid marginTop={4}>{detailJadwal && <ListSbi detail={detailJadwal} />}</Grid>
    </>
  )
}

Sbi.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default Sbi
