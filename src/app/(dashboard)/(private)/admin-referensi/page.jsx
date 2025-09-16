'use client'
import { Fragment, useContext } from 'react'

import Link from 'next/link'

import Grid from '@mui/material/Grid2'

import CustomerStats from '@components/card-statistics/CustomerStats'
import { stringLimit } from '@/utils/helper'

const Index = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='kel-kegiatan' title='Pengelompokan Kegiatan Perizinan ke Kelompok Inspeksi'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-brand-javascript'
            color='warning'
            stats='Kelompok Kegiatan'
            title={`${stringLimit('Pengelompokan Kegiatan Perizinan ke Kelompok Inspeksi', 50)}..`}
          />
        </Link>
      </Grid>

      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='kategori-jenjang' title='Pengaturan Bidang, Kategori dan Jenjang Inspektur'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-server'
            color='success'
            stats='Kategori dan Jenjang'
            title={`${stringLimit('Pengaturan Bidang, Kategori dan Jenjang Inspektur', 50)}..`}
          />
        </Link>
      </Grid>

      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='jadwal' title='Nama Penanda Tangan Persuratan Inspeksi'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-activity'
            color='danger'
            stats='Tanda Tangan'
            title={`${stringLimit('Nama Penanda Tangan Persuratan Inspeksi', 50)}..`}
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='lkf-jenis-tabel'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-activity'
            color='warning'
            stats='Pengaturan Jenis Tabel'
            title='Pengaturan Data Referensi'
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='syarat-item' title='Pengaturan Item Persyaratan Keselamatan dan Keamanan  untuk SBI'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-activity'
            color='danger'
            stats='Item Persyaratan'
            title={`${stringLimit('Pengaturan Item Persyaratan Keselamatan dan Keamanan  untuk SBI', 50)}..`}
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='inkf' title='Pengaturan Data Referensi Index Keamanaan dan Keselamatan Fasilitas'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-activity'
            color='warning'
            stats='Pengaturan IKF'
            title={`${stringLimit('Pengaturan Data Referensi Index Keamanaan dan Keselamatan Fasilitas', 50)}..`}
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='/admin-referensi/temuan'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-activity'
            color='warning'
            stats='Pengaturan Temuan'
            title='Pengaturan Data Referensi Temuan dan LHI'
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='/admin-referensi/ikk' title='Pengaturan Data Referensi Index Keselamatan Kerja'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-activity'
            color='warning'
            stats='Pengaturan IKK'
            title={`${stringLimit('Pengaturan Data Referensi Index Keselamatan Kerja', 50)}..`}
          />
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 4, sm: 6 }}>
        <Link href='/admin-referensi/tabel-setting' title='Pengaturan Data Tabel Laporan Keselamatan Fasilitas (LKF)'>
          <CustomerStats
            avatarColor='primary'
            avatarIcon='tabler-settings'
            color='warning'
            stats='Pengaturan LKF'
            title={`${stringLimit('Pengaturan Data Tabel Laporan Keselamatan Fasilitas (LKF) ', 50)}..`}
          />
        </Link>
      </Grid>
    </Grid>
  )
}

// Index.acl = {
//   action: 'read',
//   subject: 'admin-page'
// }

export default Index
