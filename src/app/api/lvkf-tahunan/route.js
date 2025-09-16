// src/app/api/lvkf-tahunan/route.js
import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(req.url)
    const sp = url.searchParams

    // Kumpulkan semua parameter yang diterima dari client
    const page = sp.get('page') ?? '1'
    const limit = sp.get('limit') ?? '10'
    const jenis_lkf_id = sp.get('jenis_lkf_id') ?? '1'
    const propinsi_id = sp.get('propinsi_id')
    const bidang_id = sp.get('bidang_id')
    const fas_id = sp.get('fas_id')

    // Terima baik 'status[]' maupun 'status'
    const statuses = [...sp.getAll('status[]'), ...sp.getAll('status')]

    const qp = new URLSearchParams()

    qp.set('page', String(page))
    qp.set('limit', String(limit))
    if (jenis_lkf_id != null) qp.append('jenis_lkf_id', String(jenis_lkf_id))
    if (propinsi_id != null) qp.append('propinsi_id', String(propinsi_id))
    if (bidang_id != null) qp.append('bidang_id', String(bidang_id))
    if (fas_id != null) qp.append('fas_id', String(fas_id))
    statuses.forEach(s => qp.append('status[]', String(s)))

    // Proxy ke backend lama
    const resp = await customFetch.get('/api/lkf', {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
      },
      params: qp
    })

    if (resp?.status === 200 && resp?.data?.status === 200) {
      // Samakan format balikannya agar page bisa langsung pakai
      return NextResponse.json(resp.data.response, { status: 200 })
    }

    // Non-200 dari API lama -> bubble up info minimal
    return NextResponse.json(
      {
        error: 'LKF_API_ERROR',
        httpStatus: resp?.status,
        apiStatus: resp?.data?.status,
        data: resp?.data
      },
      { status: 502 }
    )
  } catch (error) {
    // Error jaringan / exception
    return NextResponse.json(
      {
        error: 'LKF_FETCH_FAILED',
        message: error?.message,
        httpStatus: error?.response?.status,
        data: error?.response?.data
      },
      { status: 500 }
    )
  }
}
