// src/app/api/lvkf/[id]/route.js
import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

export async function GET(_req, { params }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    const resp = await customFetch.get(`/api/lkf/${id}`, {
      headers: { 'balis-token': session.user?.accessToken || '' }
    })

    if (resp?.status === 200 && resp?.data?.status === 200) {
      return NextResponse.json(resp.data.response, { status: 200 })
    }

    return NextResponse.json(
      {
        error: 'LKF_API_ERROR',
        httpStatus: resp?.status,
        apiStatus: resp?.data?.status,
        data: resp?.data
      },
      { status: 502 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: 'LKF_FETCH_FAILED',
        message: error?.message,
        httpStatus: error?.response?.status,
        data: error?.response?.data
      },
      { status: 500 }
    )
  }
}
