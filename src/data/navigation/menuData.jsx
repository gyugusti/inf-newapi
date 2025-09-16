import CustomChip from '@core/components/mui/Chip'

const menuData = [
  {
    label: 'Data Umum',
    icon: <i className='tabler-smart-home' />,

    // suffix: <CustomChip label='5' size='small' color='error' round='true' />,
    roles: ['inspektur', 'verifikator', 'admin'], // Accessible by these roles
    children: [
      { label: 'View Instansi', href: '/data-inspeksi/fasilitas', roles: [] },
      { label: 'View SDM', href: '/data-inspeksi/inspektur', roles: ['inspektur', 'verifikator', 'admin'] },
      { label: 'View Jadwal', href: '/data-umum/jadwal', roles: ['inspektur', 'verifikator', 'admin'] },
      { label: 'View Srp', href: '/data-inspeksi/srp', roles: [] },
      { label: 'View Registrasi Srp', href: '/data-umum/view-registrasi-srp', roles: [] }
    ]
  },
  {
    label: 'Data Inspeksi',
    icon: <i className='tabler-files' />,
    roles: [],
    children: [
      { label: 'Data Pengawasan', href: '/data-inspeksi/pengawasan-ondev', target: '_blank', roles: [] },
      { label: 'Data Jadwal', href: '/data-inspeksi/jadwal', roles: [] },
      { label: 'SDM', href: '/data-inspeksi/inspektur', roles: [] },
      { label: 'Fasilitas', href: '/data-inspeksi/fasilitas', roles: [] },
      { label: 'Kamera', href: '/data-inspeksi/kamera', roles: [] },
      { label: 'KTUN', href: '/data-inspeksi/ktun', roles: [] }
    ]
  },
  {
    section: 'KOORDINATOR',
    roles: ['koordinator', 'admin'],
    items: [
      {
        label: 'Persetujuan Jadwal',
        icon: <i className='tabler-box' />,
        roles: ['koordinator', 'admin'],
        href: '/jadwal-koord'
      },
      {
        label: 'Disposisi LVKF',
        href: '/lvkf-koor',
        icon: <i className='tabler-message-circle-2' />,
        roles: ['koordinator', 'admin']
      },
      {
        label: 'Persetujuan LHI',
        href: '/lhi-koor',
        icon: <i className='tabler-calendar' />,
        roles: ['koordinator', 'admin']
      },
      {
        label: 'Persetujuan LHI',
        href: '/lhi/persetujuan',
        icon: <i className='tabler-copy' />,
        roles: ['koordinator', 'admin']
      }
    ]
  },
  {
    section: 'Inspektur',
    roles: ['inspektur', 'admin'],
    items: [
      {
        label: 'Konfirmasi Jadwal',
        href: '/jadwal-inspektur',
        icon: <i className='tabler-layout' />,
        roles: ['inspektur']
      },
      {
        label: 'FIHI',
        href: '/inspektur/fihi',
        icon: <i className='tabler-checkup-list' />,
        roles: ['inspektur', 'admin']
      },
      { label: 'LHI', href: '/inspektur/lhi', icon: <i className='tabler-git-merge' />, roles: ['inspektur', 'admin'] }
    ]
  },
  {
    label: 'Validasi Registrasi SRP',
    isSection: true,
    suffix: (roles, totalRegsrpval, totalRegsrpoto) => {
      if (roles.includes('admin')) return null
      if (roles.includes('verifikator'))
        return <CustomChip label={totalRegsrpval} size='small' color='error' round='true' />
      if (roles.includes('koordinator'))
        return <CustomChip label={totalRegsrpoto} size='small' color='error' round='true' />

      return null
    },
    roles: ['verifikator', 'admin', 'inspektur', 'koordinator'],
    children: [
      {
        id: 'registrasi-srp',
        label: 'Registrasi SRP',
        href: '/inspektur/registrasi-srp',
        roles: ['inspektur', 'admin']
      },
      {
        id: 'validator', // <== penting!
        label: 'Validasi SRP',
        href: '/validasi-srp',
        roles: ['verifikator', 'admin']
      },
      {
        id: 'dispo-registrasi',
        label: 'Disposisi Manual',
        href: '/koor-validasi-srp/disposisi',
        roles: ['koordinator', 'admin']
      },
      {
        id: 'koordinator', // <== penting!
        label: 'Persetujuan Validasi SRP',
        href: '/koor-validasi-srp',
        roles: ['koordinator', 'admin']
      }
    ]
  },
  {
    label: 'Validasi Sensus SRP ',
    isSection: true,

    roles: ['verifikator', 'admin', 'inspektur', 'koordinator'],
    children: [
      {
        id: 'validasi', // <== penting!
        label: 'Validasi ',
        href: '/sensus-srp',
        roles: ['verifikator', 'admin']
      },
      {
        id: 'non-aktif', // <== penting!
        label: 'Non Aktif',
        href: '/koor-sensus-srp',
        roles: ['koordinator', 'admin']
      }
    ]
  },
  {
    section: 'Verifikator',
    roles: ['verifikator', 'admin'],
    items: [{ label: 'Konfirmasi Jadwal', href: '/jadwal-inspektur', icon: <i className='tabler-layout' /> }]
  },
  {
    label: 'Jadwal',
    icon: <i className='tabler-smart-home' />,
    isSection: true,

    //suffix: <CustomChip label='5' size='small' color='error' round='true' />,
    roles: ['verifikator', 'admin'], // Accessible by these roles
    children: [
      { id: 'jadwal-1', label: 'Jadwal Inspeksi', href: '/jadwal', roles: ['verifikator', 'admin'] },
      {
        id: 'jadwal-2',
        label: 'Konfirmasi Instansi',
        href: '/konfirmasi-instansi',
        roles: ['verifikator', 'admin']
      },
      {
        id: 'jadwal-3',
        label: 'Instansi Terjadwal & Belum Terjadwal',
        href: '/instansi-terjadwal1',
        roles: ['verifikator', 'admin']
      }
    ]
  },
  {
    label: 'LVKF',
    icon: <i className='tabler-smart-home' />,
    isSection: true,

    // suffix: <CustomChip label='5' size='small' color='error' round='true' />,
    roles: ['verifikator', 'admin'], // Accessible by these roles
    children: [
      { id: 'verifikasi-lvkf', label: 'Verifikasi LVKF', href: '/lvkf-jadwal', roles: ['verifikator', 'admin'] },
      {
        id: 'lvkf-jadwal',
        label: 'LVKF Perjadwal',
        href: '/lvkf-jadwal',
        roles: ['verifikator', 'admin']
      },
      {
        id: 'lvkf-tahun',
        label: 'Lvkf Tahunan',
        href: '/view-jadwal',
        roles: ['verifikator', 'admin']
      }
    ]
  },
  {
    label: 'Persuratan',
    icon: <i className='tabler-smart-home' />,
    isSection: true,

    //suffix: <CustomChip label='5' size='small' color='error' round='true' />,
    roles: ['verifikator', 'admin'], // Accessible by these roles
    children: [
      { id: 'spi-sbi', label: 'SPI / SBI', href: '/spi-sbi', roles: ['verifikator', 'admin'] },
      {
        id: 'sphi',
        label: 'SPHI',
        href: '/lvkf-jadwal',
        roles: ['verifikator', 'admin']
      },
      {
        id: 'surat-konfirmasi',
        label: 'Surat Konfirmasi',
        href: '/view-jadwal',
        roles: ['verifikator', 'admin']
      }
    ]
  },
  {
    section: 'CONTROL PANEL',
    roles: ['admin'], // Accessible by these roles
    items: [
      { label: 'Users', href: '/admin-user', icon: <i className='tabler-user' />, roles: ['admin'] },
      { label: 'Referensi', href: '/admin-referensi', icon: <i className='tabler-checkup-list' />, roles: ['admin'] },
      { label: 'Khusus', href: '/admin-khusus', icon: <i className='tabler-git-merge' />, roles: ['admin'] }
    ]
  }
]

export default menuData
