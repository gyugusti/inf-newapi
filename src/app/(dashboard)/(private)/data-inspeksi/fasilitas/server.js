'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

export async function fetchDataFasilitas(params = {}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      data: [],
      current_page: params.page || DEFAULT_PAGE,
      per_page: params.limit || DEFAULT_LIMIT,
      last_page: 1,
      total: 0
    }
  }

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    params: {
      page: params.page || DEFAULT_PAGE,
      limit: params.limit || DEFAULT_LIMIT,
      fas_id: params.fas_id || '',
      cari: params.cari || ''
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get('/api/data/fasilitas', config)
    const responseData = resp?.data?.response

    if (!responseData) {
      return {
        data: [],
        current_page: params.page || DEFAULT_PAGE,
        per_page: params.limit || DEFAULT_LIMIT,
        last_page: 1,
        total: 0
      }
    }

    return {
      data: Array.isArray(responseData.data) ? responseData.data : [],
      current_page: Number(responseData.current_page ?? params.page ?? DEFAULT_PAGE),
      per_page: Number(responseData.per_page ?? params.limit ?? DEFAULT_LIMIT),
      last_page: Number(
        responseData.last_page ??
          responseData.total_pages ??
          (responseData.total && (responseData.per_page || params.limit)
            ? Math.ceil(responseData.total / (responseData.per_page || params.limit))
            : 1)
      ),
      total: Number(responseData.total ?? responseData.data?.length ?? 0)
    }
  } catch (error) {
    console.error('Error fetching fasilitas:', error)

    return {
      data: [],
      current_page: params.page || DEFAULT_PAGE,
      per_page: params.limit || DEFAULT_LIMIT,
      last_page: 1,
      total: 0
    }
  }
}
