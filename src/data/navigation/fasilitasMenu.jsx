// ** Icons Import
import CustomChip from '@core/components/mui/Chip'

const fasilitasMenu = [
  {
    label: 'Data Fasilitas',
    icon: <i className='tabler-smart-home' />,
    suffix: <CustomChip label='0' size='small' color='error' round='true' />,
    roles: ['pemohon_admin', 'pemohon_tambahan'], // Accessible by these roles
    children: [
      { label: 'Data Sumber', href: '/jadwal', roles: [] },
      { label: 'Data Lokasi', href: '/data-inspeksi/inspektur', roles: ['pemohon_admin', 'admin'] },
      { label: 'Data Pekerja', href: '/view-jadwal', roles: ['pemohon_admin', 'admin'] },
      { label: 'Data Alat Ukur radiasi', href: '/data-inspeksi-srp/academy', roles: ['pemohon_admin'] },
      { label: 'Data KTUN', href: '/data-inspeksi-srp/academy', roles: ['pemohon_admin'] }
    ]
  },
  {
    label: 'Inspeksi',
    icon: <i className='tabler-smart-home' />,
    suffix: <CustomChip label='0' size='small' color='error' round='true' />,
    roles: ['pemohon_admin', 'pemohon_tambahan'], // Accessible by these roles
    children: [
      { label: 'SBI', href: '/frontend/sbi', roles: [] },
      {
        label: 'Surat Konfirmasi',
        href: '/frontend/surat-konfirmasi',
        roles: ['pemohon_admin', 'pemohon_tambahan', 'admin']
      },
      { label: 'LVKF', href: '/frontend/lvkf', roles: ['pemohon_admin', 'pemohon_tambahan', 'admin'] },
      { label: 'SPHI dan LHI', href: '/data-inspeksi-srp/academy', roles: ['pemohon_admin', 'pemohon_tambahan'] },
      { label: 'TLHI', href: '/data-inspeksi-srp/academy', roles: ['pemohon_admin', 'pemohon_tambahan'] },
      { label: 'IKK', href: '/data-inspeksi-srp/academy', roles: ['pemohon_admin', 'pemohon_tambahan'] }
    ]
  },
  {
    label: 'Pelaporan',
    icon: <i className='tabler-smart-home' />,
    suffix: <CustomChip label='0' size='small' color='error' round='true' />,
    roles: ['pemohon_admin', 'pemohon_tambahan'], // Accessible by these roles
    children: [
      { label: 'LVKF Tahunan', href: '/frontend/lvkf-tahunan', roles: [] },
      { label: 'Validasi Data Sumber', href: '/lvkf-jadwal', roles: ['pemohon_admin', 'pemohon_tambahan', 'admin'] },
      { label: 'Validasi Data Pekerja', href: '/frontend/lvkf', roles: ['pemohon_admin', 'pemohon_tambahan', 'admin'] }
    ]
  }
]

export default fasilitasMenu
