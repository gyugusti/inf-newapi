import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import Index from '@/views/frontend/lvkf-tahunan/Index'
import { getLkfData } from './server'

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }) {
  const sp = await searchParams

  const tab = sp?.tab === 'arsip' ? 'arsip' : 'daftar'

  const page = sp?.page ? Number(sp.page) : 1
  const limit = sp?.limit ? Number(sp.limit) : 10

  const status = tab === 'arsip' ? undefined : Array.isArray(sp?.status) ? sp.status : sp?.status

  const propinsi_id = sp?.propinsi_id
  const bidang_id = sp?.bidang_id

  const session = await getServerSession(authOptions)
  const fas_id = session?.user?.fas_id

  const data = await getLkfData({
    page,
    limit,
    status,
    propinsi_id,
    bidang_id,
    fas_id,
    tab
  })

  return <Index data={data} tab={tab} searchParams={{ page, limit, status, propinsi_id, bidang_id }} />
}
