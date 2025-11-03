'use client'

import { useEffect, useState } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { useSession } from 'next-auth/react'

import AuthRedirect from '@/components/AuthRedirect'

export default function AuthGuard({ children, locale }) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false)
    }
  }, [status])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress color='inherit' />
      </Box>
    )
  }

  if (!session?.user) {
    return <AuthRedirect locale={locale} />
  }

  return <>{children}</>
}
