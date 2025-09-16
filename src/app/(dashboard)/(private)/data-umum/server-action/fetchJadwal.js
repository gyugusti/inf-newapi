'use server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

export async function fetchJadwal(searchParams = {}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      error: {
        status: 401,
        message: 'Unauthorized'
      }
    }
  }

  const { page = 1, limit = 10, status_id = '', propinsi_id = '', bidang_id = '', cari = '', tahun = '' } = searchParams

  const config = {
    headers: {
      'balis-token': session.user?.accessToken
    },
    params: {
      page,
      limit,
      status_id,
      propinsi_id,
      bidang_id,
      cari,
      tahun
    }
  }

  try {
    const resp = await customFetch.get('/api/jadwal', config)

    return resp.data.response || { data: [], total: 0, last_page: 1 }
  } catch (error) {
    const status = error.response?.status || 500
    const message = error.response?.data?.message || 'There was an error'

    console.error('Error response:', status, error.response?.data)

    return {
      error: {
        status,
        message
      }
    }
  }
}
