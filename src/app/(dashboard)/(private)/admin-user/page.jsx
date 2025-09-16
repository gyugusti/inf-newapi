'use client'
import { Fragment, useContext } from 'react'

import Link from 'next/link'

import { useSession } from 'next-auth/react'

import Grid from '@mui/material/Grid2'

import CustomerStats from '@components/card-statistics/CustomerStats'

import { stringLimit } from '@/utils/helper'

const Index = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 6, sm: 6 }}>
        <Link href='admin-referensi/kel-kegiatan' title='Update Data Profile dan Ganti Password'>
          <CustomerStats
            color='warning'
            stats='Profile'
            title={`${stringLimit('Update Data Profile dan Ganti Password', 50)}..`}
            avatarColor='primary'
            avatarIcon='tabler-user'
          />
        </Link>
      </Grid>

      <Grid size={{ xs: 12, md: 6, sm: 6 }}>
        <Link href='/admin-user/akun-balis' title='Pengaturan Akun User Balis Inspeksi FRZR'>
          <CustomerStats
            color='success'
            stats='USER BALIS INSPEKSI'
            title={`${stringLimit('Pengaturan Akun User Balis Inspeksi FRZR', 50)}..`}
            avatarIcon='tabler-users'
            avatarColor='primary'
          />
        </Link>
      </Grid>

      <Grid size={{ xs: 12, md: 6, sm: 6 }}>
        <Link href='/admin-user/akses' title='Pengaturan Hak Akses Menu'>
          <CustomerStats
            color='primary'
            stats='HAK AKSES (ROLE)'
            title={`${stringLimit('Pengaturan Hak Akses Menu', 50)}..`}
            avatarIcon='tabler-settings'
            avatarColor='primary'
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 6 }}>
        <Link href='/admin-referensi/lkf-jenis-tabel'>
          <CustomerStats
            avatarIcon='tabler-activity'
            color='primary'
            avatarColor='primary'
            stats='LOG'
            title='Riwayat Proses'
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 6 }}>
        <Link href='/admin-referensi/syarat-item' title='Info tentang BALIS Inspeksi'>
          <CustomerStats
            avatarIcon='tabler-activity'
            color='primary'
            stats='BALIS INFO'
            title='Info tentang BALIS Inspeksi'
            avatarColor='primary'
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 6 }}>
        <Link href='/admin-referensi/inkf' title='Pengaturan Akun User Balis Stakeholder'>
          <CustomerStats
            avatarIcon='tabler-activity'
            color='warning'
            stats='USER BALIS STAKEHOLDER'
            title='Pengaturan Stakeholder'
            avatarColor='primary'
          />
        </Link>
      </Grid>
    </Grid>
  )
}

export default Index
