import React from 'react'

import SpiSbiClient from './SpiSbiClient'
import { fetchBidangOptions, fetchPropinsiOptions, fetchSpiSbiList } from './server'

const DEFAULT_LIMIT = 20

const Page = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1
  const limitParam = searchParams?.per_page ?? searchParams?.limit
  const limit = Number(limitParam) || DEFAULT_LIMIT
  const tabParam = searchParams?.tab === 'arsip' ? 'arsip' : 'sbi'
  const propinsiId = searchParams?.propinsi_id ?? ''
  const bidangId = searchParams?.bidang_id ?? ''
  const cari = searchParams?.cari ?? ''
  const fasId = searchParams?.fas_id ?? ''
  const inspMasterId = searchParams?.insp_master_id ?? ''
  const suratKatId = searchParams?.surat_kat_id ?? ''

  const [listResponse, propinsiResponse, bidangResponse] = await Promise.all([
    fetchSpiSbiList({
      page,
      limit,
      tab: tabParam,
      propinsi_id: propinsiId,
      bidang_id: bidangId,
      cari,
      fas_id: fasId,
      insp_master_id: inspMasterId,
      surat_kat_id: suratKatId
    }),
    fetchPropinsiOptions(),
    fetchBidangOptions()
  ])

  const data = listResponse?.data ?? []
  const currentPage = Number(listResponse?.current_page ?? page)
  const perPage = Number(listResponse?.per_page ?? limit)
  const total = Number(listResponse?.total ?? data.length ?? 0)
  const totalPages = Number(
    listResponse?.last_page ?? (total && perPage ? Math.ceil(total / perPage) : 1)
  )

  const propinsiOptions = Array.isArray(propinsiResponse)
    ? propinsiResponse.map(option => ({
        value: option.propinsi_id ?? option.value ?? '',
        label: option.nama ?? option.label ?? ''
      }))
    : []

  const bidangOptions = Array.isArray(bidangResponse)
    ? bidangResponse.map(option => ({
        value: option.bidang_id ?? option.value ?? '',
        label: option.nama ?? option.label ?? ''
      }))
    : []

  return (
    <SpiSbiClient
      initialTab={tabParam}
      data={data}
      currentPage={currentPage}
      perPage={perPage}
      totalPages={totalPages}
      propinsiOptions={propinsiOptions}
      bidangOptions={bidangOptions}
      cari={cari}
      propinsiId={propinsiId}
      bidangId={bidangId}
    />
  )
}

Page.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default Page
