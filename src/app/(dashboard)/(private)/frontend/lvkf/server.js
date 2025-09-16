// server.js
import { cookies, headers as nextHeaders } from 'next/headers'

import { getServerSession } from 'next-auth'

import { STATUS_LKF } from '@/configs/lkfConfig'
import { authOptions } from '@/libs/auth'

export async function getLkfData(params = {}) {
  const {
    page = 1,
    limit = 10,
    jenis_lkf_id = 4,
    status: statusParam,
    tab = 'daftar',
    propinsi_id,
    bidang_id,
    fas_id
  } = params

  // Ensure user exists (route also checks; fail fast)
  const session = await getServerSession(authOptions)

  if (!session) throw new Error('Unauthorized')

  let effectiveStatus = statusParam

  if (effectiveStatus === undefined) {
    effectiveStatus =
      tab === 'arsip' ? [STATUS_LKF.LKF_ARSIP] : [STATUS_LKF.LKF_DRAFT, STATUS_LKF.LKF_VERI, STATUS_LKF.LKF_KEMBALI]
  }

  const statusArray = Array.isArray(effectiveStatus)
    ? effectiveStatus
    : effectiveStatus != null
      ? [effectiveStatus]
      : []

  const qp = new URLSearchParams()

  qp.set('page', String(page))
  qp.set('limit', String(limit))
  if (jenis_lkf_id != null) qp.append('jenis_lkf_id', String(jenis_lkf_id))
  if (propinsi_id != null) qp.append('propinsi_id', String(propinsi_id))
  if (bidang_id != null) qp.append('bidang_id', String(bidang_id))
  if (fas_id != null) qp.append('fas_id', String(fas_id))
  statusArray.forEach(s => qp.append('status[]', String(s)))

  // Build absolute base URL from headers (works on Vercel & dev)
  const h = nextHeaders()
  const host = h.get('host')
  const protocol = host && (host.includes('localhost') || host.startsWith('127.')) ? 'http' : 'https'
  const base = `${protocol}://${host}`

  try {
    const cookieHeader = cookies().toString()

    const res = await fetch(`${base}/api/lvkf?${qp.toString()}`, {
      method: 'GET',
      headers: {
        // Forward cookies so getServerSession in API Route works
        cookie: cookieHeader
      },
      cache: 'no-store' // dynamic, matches previous behaviour
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))

      return { error: err?.error || 'LKF_API_ERROR', httpStatus: res.status, apiStatus: err?.apiStatus }
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching LKF data via internal API', {
      message: error?.message,
      query: qp.toString()
    })

    return { error: 'LKF_FETCH_FAILED' }
  }
}
