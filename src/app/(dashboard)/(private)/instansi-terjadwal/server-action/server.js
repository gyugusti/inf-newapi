'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

/**
 * Fetch daftar instansi yang terjadwal
 */
export async function fetchInstansiTerjadwal(tahun = '') {
  const session = await getServerSession(authOptions)

  if (!session) throw new Error('Unauthorized')

  const url = `/api/ver/instansiTerjadwal`

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    params: {
      limit: 1000,
      tahun
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get(url, config)
    const responseData = resp?.data?.response

    // Pastikan responsenya adalah array
    return Array.isArray(responseData) ? responseData : []
  } catch (error) {
    console.error('Error fetching instansi:', error)

    return []
  }
}

/**
 * Fetch daftar kelompok kegiatan
 * Mengambil data dari endpoint /api/kelKegiatan
 */
export async function fetchKelompok() {
  const session = await getServerSession(authOptions)

  if (!session) throw new Error('Unauthorized')

  const url = `/api/kelKegiatan`

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get(url, config)
    const kelompokData = resp?.data?.response?.data

    // Pastikan responsenya adalah array
    return Array.isArray(kelompokData) ? kelompokData : []
  } catch (error) {
    console.error('Error fetching kelompok:', error)

    return []
  }
}
