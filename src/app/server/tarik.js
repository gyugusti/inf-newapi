'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

export async function fetchKegiatan() {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  // Ensure query is an object
  const url = `/apiBalis/kegiatan`

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get(url, config)

    return resp?.data?.response?.data || []
  } catch (error) {
    console.error('Error fetching data:', error)

    return []
  }
}

export async function fetchSyaratKegiatan(kelompok_id) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const url = `/api/syarat/${kelompok_id}`

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get(url, config)

    const responseData = resp?.data?.response

    if (!Array.isArray(responseData)) {
      console.warn('Unexpected response format:', resp?.data)

      return []
    }

    return responseData
  } catch (error) {
    console.error('Error fetching syarat kegiatan:', error)

    return []
  }
}
