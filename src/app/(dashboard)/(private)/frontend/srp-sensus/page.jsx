import IndexSensus from '@/views/frontend/srp/IndexSensus'
import { fetchSensusSrp } from './server'

const DEFAULT_LIMIT = 20

const Page = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1
  const limitParam = searchParams?.per_page ?? searchParams?.limit
  const limit = Number(limitParam) || DEFAULT_LIMIT
  const tahapRegId = searchParams?.tahap_reg_id ?? ''
  const validatorId = searchParams?.validator_id ?? ''
  const otorisatorId = searchParams?.otorisator_id ?? ''
  const inspMasterId = searchParams?.insp_master_id ?? ''
  const cari = searchParams?.cari ?? ''

  const response = await fetchSensusSrp({
    page,
    limit,
    tahap_reg_id: tahapRegId,
    cari
  })

  const dataSrp = response?.data ?? []
  const currentPage = Number(response?.current_page ?? page)
  const perPage = Number(response?.per_page ?? limit)
  const total = Number(response?.total ?? data.length ?? 0)
  const totalPages = Number(response?.last_page ?? (total && perPage ? Math.ceil(total / perPage) : 1))

  return <IndexSensus data={dataSrp} />
}

Page.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Page
