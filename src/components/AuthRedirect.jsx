'use client'

import { useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSession, signOut } from 'next-auth/react'
import { CircularProgress, Box } from '@mui/material'

const AuthRedirect = ({ locale }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = useCallback(() => {
    console.warn('🔴 Token expired! Logging out...')
    signOut({ redirect: true, callbackUrl: locale ? `/${locale}/login` : '/login' })
  }, [locale])

  useEffect(() => {
    if (status === 'loading') return

    const isExpired =
      session?.user?.accessTokenExpires && new Date(session.user.accessTokenExpires).getTime() < Date.now()

    if (!session?.user || isExpired) {
      handleSignOut()
    }
  }, [session, status, handleSignOut])

  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
      <CircularProgress color='inherit' />
    </Box>
  )
}

export default AuthRedirect
