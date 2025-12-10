'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

export async function fetchListSrp(params = {}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const url = `/api/registrasi/srp/list`

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    params: {
      page: params.page || 1,
      limit: params.limit || 20,
      fas_id: session?.user?.fas_id ?? '',
      cari: params.cari || '',
      jenis_sumber_id: params.jenis_sumber_id || '',
      kat_sumber_id: params.kat_sumber_id || '',
      status: params.status || ''
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get(url, config)

    return resp?.data?.response || { data: [], total: 0 }
  } catch (error) {
    console.error('Error fetching sumber:', error)

    return { data: [], total: 0 }
  }
}
