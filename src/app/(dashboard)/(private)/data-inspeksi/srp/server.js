'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

export async function fetchDataSrp(params = {}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const url = `/api/validasi/sumber`

  const config = {
    headers: {
      'balis-token': session.user?.accessToken || ''
    },
    params: {
      page: params.page || 1,
      limit: params.limit || 20,
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
