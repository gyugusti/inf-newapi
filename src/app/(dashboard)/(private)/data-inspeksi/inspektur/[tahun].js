'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import Sdm from '@/views/data-inspeksi/inspeksi/Sdm'
import ShadowBox from '@/components/styles/ShadowBox'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

const InspekturTahun = () => {
  const router = useRouter()
  const query = router.query
  const tahun = query.tahun

  const breadcrumbs = [
    { name: 'Beban Kerja Tahunan', path: '/data-inspeksi/inspektur' },
    { name: 'Beban Kerja SDM per Tahun' }
  ]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <ShadowBox>
        <Sdm tahun={tahun} />
      </ShadowBox>
    </>
  )
}

InspekturTahun.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default InspekturTahun
