'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

export async function fetchRegistrasiSrpDetail(id) {
  const session = await getServerSession(authOptions)

  if (!session || !id) {
    return null
  }

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get(`/api/registrasi/srp/${id}`, config)

    return resp?.data?.response ?? null
  } catch (error) {
    console.error('Error fetching detail registrasi SRP:', error)

    return null
  }
}

