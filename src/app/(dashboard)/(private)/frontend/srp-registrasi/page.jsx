import IndexReg from '@/views/frontend/srp/IndexReg.js'
import { fetchRegistrasiSrp } from './server'

const DEFAULT_LIMIT = 20

const Page = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1
  const limitParam = searchParams?.per_page ?? searchParams?.limit
  const limit = Number(limitParam) || DEFAULT_LIMIT
  const tahapRegParam = searchParams?.tahap_reg_id
  const defaultTahapRegIds = ['0', '3']

  const tahapRegId = Array.isArray(tahapRegParam)
    ? tahapRegParam
    : typeof tahapRegParam === 'string' && tahapRegParam.length > 0
      ? tahapRegParam.split(',')
      : defaultTahapRegIds

  const validatorId = searchParams?.validator_id ?? ''
  const otorisatorId = searchParams?.otorisator_id ?? ''
  const inspMasterId = searchParams?.insp_master_id ?? ''
  const cari = searchParams?.cari ?? ''

  const response = await fetchRegistrasiSrp({
    page,
    limit,
    tahap_reg_id: tahapRegId,
    validator_id: validatorId,
    otorisator_id: otorisatorId,
    cari
  })

  const data = response?.data ?? []
  const currentPage = Number(response?.current_page ?? page)
  const perPage = Number(response?.per_page ?? limit)
  const total = Number(response?.total ?? data.length ?? 0)
  const totalPages = Number(response?.last_page ?? (total && perPage ? Math.ceil(total / perPage) : 1))

  return (
    <IndexReg
      data={data}
      currentPage={currentPage}
      perPage={perPage}
      total={total}
      totalPages={totalPages}
      searchTerm={cari}
      tahapRegId={tahapRegId}
    />
  )
}

Page.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Page
