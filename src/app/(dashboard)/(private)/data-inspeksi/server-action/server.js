'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

export async function fetchDataKtun(params = {}) {
  const session = await getServerSession(authOptions)

  if (!session) throw new Error('Unauthorized')

  const url = `/api/data/ktun25`

  const config = {
    headers: {
      'balis-token': session.user?.accessToken || ''
    },
    params: {
      page: params.page || 1,
      limit: params.limit || 20,
      cari: params.cari || '',
      bidang_id: params.bidang_id || ''
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get(url, config)
    const responseData = resp?.data?.response

    if (!responseData || !Array.isArray(responseData.data)) {
      console.warn('Unexpected response format:', responseData)

      return { data: [] }
    }

    return responseData
  } catch (error) {
    console.error('Error fetching ktun:', error)

    return { data: [] }
  }
}
