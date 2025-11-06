import React from 'react'

import ViewRegSrp from '@/views/data-umum/ViewRegSrp'

import { fetchRegistrasiSrp } from './server'

const DEFAULT_LIMIT = 20

const Page = async props => {
  const resolvedSearchParams = (await props.searchParams) ?? {}
  const page = Number(resolvedSearchParams?.page) || 1
  const limitParam = resolvedSearchParams?.per_page ?? resolvedSearchParams?.limit
  const limit = Number(limitParam) || DEFAULT_LIMIT
  const tahapRegId = resolvedSearchParams?.tahap_reg_id ?? ''
  const validatorId = resolvedSearchParams?.validator_id ?? ''
  const otorisatorId = resolvedSearchParams?.otorisator_id ?? ''
  const inspMasterId = resolvedSearchParams?.insp_master_id ?? ''
  const cari = resolvedSearchParams?.cari ?? ''

  const response = await fetchRegistrasiSrp({
    page,
    limit,
    tahap_reg_id: tahapRegId,
    validator_id: validatorId,
    otorisator_id: otorisatorId,
    insp_master_id: inspMasterId,
    cari
  })

  const data = response?.data ?? []
  const currentPage = Number(response?.current_page ?? page)
  const perPage = Number(response?.per_page ?? limit)
  const total = Number(response?.total ?? data.length ?? 0)
  const totalPages = Number(
    response?.last_page ?? (total && perPage ? Math.ceil(total / perPage) : 1)
  )

  return (
    <ViewRegSrp
      data={data}
      currentPage={currentPage}
      perPage={perPage}
      total={total}
      totalPages={totalPages}
      searchTerm={cari}
    />
  )
}

Page.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Page
