import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 20

const emptyResponse = {
  data: [],
  current_page: DEFAULT_PAGE,
  per_page: DEFAULT_PER_PAGE,
  last_page: 1,
  total: 0
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const page = Number(searchParams.get('page')) || DEFAULT_PAGE
  const limitParam = searchParams.get('limit') ?? searchParams.get('per_page')
  const perPage = Number(limitParam) || DEFAULT_PER_PAGE
  const status = searchParams.get('status') || ''
  const jenis_sumber_id = searchParams.get('jenis_sumber_id') || ''
  const kat_sumber_id = searchParams.get('kat_sumber_id') || ''
  const cari = searchParams.get('cari') || ''

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(emptyResponse, { status: 401 })
  }

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`
    },
    params: {
      page,
      limit: perPage,
      fas_id: session.user.fas_id,
      cari,
      jenis_sumber_id,
      kat_sumber_id,
      status
    }
  }

  try {
    const resp = await customFetch.get('/api/registrasi/srp/list', config)
    const responseData = resp?.data?.response || {}
    const total = Number(responseData.total ?? 0)

    const normalizedResponse = {
      data: Array.isArray(responseData.data) ? responseData.data : [],
      current_page: Number(responseData.current_page ?? page),
      per_page: Number(responseData.per_page ?? perPage),
      last_page: Number(
        responseData.last_page ??
          responseData.total_pages ??
          (responseData.per_page || perPage
            ? Math.ceil(total / (responseData.per_page || perPage))
            : 1)
      ),
      total
    }

    return NextResponse.json(normalizedResponse)
  } catch (error) {
    console.error('Error fetching SRP list:', error)
    
return NextResponse.json(emptyResponse, { status: 500 })
  }
}
