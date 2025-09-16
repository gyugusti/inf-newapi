import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const prisma = new PrismaClient()

export const getUniqueValues = (data, key) => {
  if (!Array.isArray(data)) return []

  return [...new Set(data.map(item => item[key]))]
}

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        token: { label: 'Token', type: 'text' }
      },
      async authorize(credentials) {
        if (credentials.token) {
          // Login Virtual (ADMIN)
          console.log('Mencoba login virtual dengan token:', credentials.token)

          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/virtualLogin/${credentials.token}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token: credentials.token })
            })

            console.log('Status login virtual:', res.status)

            const raw = await res.json()

            //console.log('Data user login virtual:', raw)

            const user = raw.response

            if (res.ok && user) {
              const level = getUniqueValues(user.akses_inspeksi, 'nama')

              return {
                id: user.id,
                username: user.username,
                token: user.token,
                expired_token: user.expired_token || Date.now(),
                fas_id: user.fas_id,
                insp_master_id: user.insp_master_id,
                roles: level,

                accessToken: user.token,
                isVirtual: true
              }
            }

            return null
          } catch (error) {
            console.error('Virtual login error:', error)

            return null
          }
        } else {
          const payload = {
            username: credentials.username,
            password: credentials.password
          }

          if (!process.env.NEXT_PUBLIC_API_URL) {
            console.error('❌ NEXT_PUBLIC_API_URL tidak ditemukan dalam environment variables.')

            return null
          }

          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
              method: 'POST',
              body: JSON.stringify(payload),
              headers: { 'Content-Type': 'application/json' }
            })

            const data = await res.json()

            if (!res.ok) {
              console.error('❌ Gagal autentikasi:', data.message)

              return null
            }

            const level = getUniqueValues(data.response.akses_inspeksi, 'nama')

            return {
              id: data.response.id,
              username: data.response.username,
              token: data.response.token,
              expired_token: data.response.expired_token || Date.now(),
              fas_id: data.response.fas_id,
              insp_master_id: data.response.insp_master_id,
              roles: level
            }
          } catch (error) {
            console.error('❌ Error di fungsi authorize:', error.message)

            return null
          }
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },

  pages: {
    signIn: '/login',
    error: '/api/auth/error'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
        token.accessTokenExpires = user.expired_token
        token.id = user.id
        token.username = user.username
        token.fas_id = user.fas_id
        token.insp_master_id = user.insp_master_id
        token.roles = user.roles
        token.isVirtual = user.isVirtual || false
      }

      // Cek apakah token sudah expired
      const isExpired = token.accessTokenExpires && new Date(token.accessTokenExpires).getTime() < Date.now()

      if (isExpired) {
        console.warn('⚠️ Token expired, menghapus session...')

        //return {} // Kosongkan token agar session invalid
        return { expired: true } // Ini penting
      }

      return token
    },

    async session({ session, token }) {
      if (token?.expired || !token?.accessToken) {
        console.warn('⚠️ Token tidak valid.')

        return {
          ...session,
          user: null
        }
      }

      session.user = {
        id: token.id,
        name: token.username,
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
        fas_id: token.fas_id,
        insp_master_id: token.insp_master_id,
        roles: token.roles,
        isVirtual: token.isVirtual
      }

      return session
    }
  }
}

export default NextAuth(authOptions)
