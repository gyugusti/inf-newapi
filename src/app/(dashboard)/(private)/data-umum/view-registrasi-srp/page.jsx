import ViewRegSrp from '@/views/data-umum/ViewRegSrp'

import { fetchRegistrasiSrp } from './server'

const DEFAULT_LIMIT = 20

const Page = async ({ searchParams }) => {
  const params = await searchParams
  // const page = params.page;

  const page = Number(params.page) || 1
  const limitParam = params?.per_page ?? params?.limit
  const limit = Number(limitParam) || DEFAULT_LIMIT
  const tahapRegId = params?.tahap_reg_id ?? ''
  const validatorId = params?.validator_id ?? ''
  const otorisatorId = params?.otorisator_id ?? ''
  const inspMasterId = params?.insp_master_id ?? ''
  const cari = params?.cari ?? ''

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
  const totalPages = Number(response?.last_page ?? (total && perPage ? Math.ceil(total / perPage) : 1))

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
