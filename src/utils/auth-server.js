'use server'

import { cookies } from 'next/headers'

import { getToken } from 'next-auth/jwt'

export async function getServerAccessToken() {
  // Ambil semua cookie dari request
  const cookieStore = cookies()

  const allCookies = cookieStore.getAll()

  console.log('🍪 cookies di request:', allCookies)

  // Build header "Cookie: ..."
  const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ')

  // Cek dulu: kalau tidak ada cookie next-auth sama sekali, pasti null
  const hasSessionCookie = allCookies.some(
    c => c.name === 'next-auth.session-token' || c.name === '__Secure-next-auth.session-token'
  )

  if (!hasSessionCookie) {
    console.warn('⚠️ Tidak ada cookie session next-auth di request')
  }

  // Panggil getToken
  const token = await getToken({
    req: {
      headers: {
        cookie: cookieHeader
      }
    },
    secret: process.env.NEXTAUTH_SECRET,

    // bantu tegasin nama cookie (dev vs prod)
    cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
  })

  console.log('🧾 token dari getToken:', token)

  if (!token || !token.accessToken) {
    return null
  }

  return token.accessToken
}
