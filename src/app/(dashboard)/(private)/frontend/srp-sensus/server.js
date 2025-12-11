'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

export async function fetchSensusSrp(params = {}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      data: [],
      current_page: params.page || DEFAULT_PAGE,
      per_page: params.limit || params.per_page || DEFAULT_LIMIT,
      last_page: 1,
      fas_id: session?.user?.fas_id ?? '',
      total: 0
    }
  }

  const page = Number(params.page) || DEFAULT_PAGE
  const limit = Number(params.limit || params.per_page) || DEFAULT_LIMIT

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    params: {
      page,
      limit,
      tahap_reg_id: params.tahap_reg_id || '',
      validator_id: params.validator_id || '',
      otorisator_id: params.otorisator_id || '',
      fas_id: session?.user?.fas_id ?? '',
      jenis_validasi_id: 2,
      cari: params.cari || ''
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get('/api/registrasi/srp', config)
    const responseData = resp?.data?.response

    if (!responseData) {
      return {
        data: [],
        current_page: page,
        per_page: limit,
        last_page: 1,
        total: 0
      }
    }

    return {
      data: Array.isArray(responseData.data) ? responseData.data : [],
      current_page: Number(responseData.current_page ?? page),
      per_page: Number(responseData.per_page ?? limit),
      last_page: Number(
        responseData.last_page ??
          responseData.total_pages ??
          (responseData.total && (responseData.per_page || limit)
            ? Math.ceil(responseData.total / (responseData.per_page || limit))
            : 1)
      ),
      total: Number(responseData.total ?? responseData.data?.length ?? 0)
    }
  } catch (error) {
    console.error('Error fetching registrasi SRP:', error)

    return {
      data: [],
      current_page: page,
      per_page: limit,
      last_page: 1,
      total: 0
    }
  }
}

export async function fetchListSrp(params = {}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  //const url = `/api/registrasi/srp/list`
  const url = `/api/validasi/sumber`

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
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
