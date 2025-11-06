'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'
import {
  JADWAL_PERSETUJUAN,
  JADWAL_TERJADWAL,
  JADWAL_PELAKSANAAN,
  JADWAL_SELESAI
} from '@/configs/jadwalConfig'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

async function getSessionOrFallback() {
  try {
    return await getServerSession(authOptions)
  } catch (error) {
    console.error('Failed to resolve server session:', error)

    return null
  }
}

function normalizeStatusIds(statusId, tab) {
  if (Array.isArray(statusId) && statusId.length > 0) {
    return statusId
  }

  if (typeof statusId === 'string' && statusId.trim() !== '') {
    return statusId
      .split(',')
      .map(value => Number(value.trim()))
      .filter(Number.isFinite)
  }

  if (typeof statusId === 'number' && Number.isFinite(statusId)) {
    return [statusId]
  }

  if (tab === 'arsip') {
    return [JADWAL_SELESAI]
  }

  return [JADWAL_PERSETUJUAN, JADWAL_TERJADWAL, JADWAL_PELAKSANAAN]
}

function buildDefaultListResponse(params = {}) {
  return {
    data: [],
    current_page: Number(params.page ?? DEFAULT_PAGE) || DEFAULT_PAGE,
    per_page: Number(params.limit ?? DEFAULT_LIMIT) || DEFAULT_LIMIT,
    last_page: 1,
    total: 0
  }
}

export async function fetchSpiSbiList(params = {}) {
  const session = await getSessionOrFallback()

  if (!session) {
    return buildDefaultListResponse(params)
  }

  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    tab = 'sbi',
    propinsi_id = '',
    bidang_id = '',
    cari = '',
    fas_id = '',
    insp_master_id = '',
    surat_kat_id = '',
    status_id
  } = params

  const normalizedStatus = normalizeStatusIds(status_id, tab)
  const spiValue = tab === 'arsip' ? 1 : 0
  const sbiValue = tab === 'arsip' ? 1 : 0

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    params: {
      page,
      limit,
      status_id: normalizedStatus,
      propinsi_id,
      bidang_id,
      cari,
      fas_id,
      insp_master_id,
      surat_kat_id,
      sbi: sbiValue,
      spi: spiValue
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get('/api/ver/jadwal', config)
    const responseData = resp?.data?.response

    if (!responseData) {
      return buildDefaultListResponse({ page, limit })
    }

    return {
      data: Array.isArray(responseData.data) ? responseData.data : [],
      current_page: Number(responseData.current_page ?? page ?? DEFAULT_PAGE) || DEFAULT_PAGE,
      per_page: Number(responseData.per_page ?? limit ?? DEFAULT_LIMIT) || DEFAULT_LIMIT,
      last_page: Number(
        responseData.last_page ??
          responseData.total_pages ??
          (responseData.total && (responseData.per_page || limit)
            ? Math.ceil(responseData.total / (responseData.per_page || limit))
            : 1)
      ) || 1,
      total: Number(responseData.total ?? responseData.data?.length ?? 0) || 0
    }
  } catch (error) {
    console.error('Error fetching SPI/SBI list:', error)

    return buildDefaultListResponse({ page, limit })
  }
}

async function fetchReference(url) {
  const session = await getSessionOrFallback()

  if (!session) {
    return []
  }

  try {
    const resp = await customFetch.get(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
      },
      withCredentials: true
    })

    const responseData = resp?.data?.response

    if (!responseData) {
      return []
    }

    if (Array.isArray(responseData)) {
      return responseData
    }

    if (Array.isArray(responseData.data)) {
      return responseData.data
    }

    return []
  } catch (error) {
    console.error(`Error fetching reference from ${url}:`, error)

    return []
  }
}

export async function fetchPropinsiOptions() {
  return fetchReference('apiBalis/getPropinsi')
}

export async function fetchBidangOptions() {
  return fetchReference('apiBalis/getBidang')
}
