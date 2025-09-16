'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

export async function fetchKonfirmasiInspektur(page = 1, per_page = 20) {
  const session = await getServerSession(authOptions)

  if (!session) throw new Error('Unauthorized')

  const url = `/api/konfirmInspektur`

  const config = {
    headers: {
      'balis-token': session.user?.accessToken || ''
    },
    params: {
      page: page,
      limit: per_page
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
