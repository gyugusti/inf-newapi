'use client'

import React, { useEffect } from 'react'

// ** MUI Imports
import { useRouter, useSearchParams } from 'next/navigation'

import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import { useDispatch, useSelector } from 'react-redux'

import { getSpi } from '@/redux-store/sbi'
import Loading from '@/components/Loading'
import SpiPdf from '@/components/cetak/SpiPdf'

const Spi = () => {
  const searchParams = useSearchParams()

  const surat_id = searchParams.get('surat_id')

  const dispatch = useDispatch()

  const { spi } = useSelector(store => store.sbi)

  useEffect(() => {
    if (surat_id !== undefined && surat_id !== '') {
      dispatch(getSpi(surat_id))
    }
  }, [dispatch, surat_id])

  if (!spi || spi == '') {
    return <Loading />
  }

  return (
    <div>
      <SpiPdf data={spi} />
    </div>
  )
}

Spi.acl = {
  action: 'read',
  subject: 'all-page'
}

export default Spi
