export const alamatCetak = (data, fasilitas) => {
  // Hindari error jika data.nama atau data.alamat tidak ada
  let nama = (data?.nama || '').replace(new RegExp(escapeRegExp(fasilitas), 'g'), ' ')

  if (nama) nama += ', '

  let alamat = (data?.alamat || '').replace(new RegExp(escapeRegExp(fasilitas), 'g'), ' ')

  let kab = data?.kab?.keteranganKabupaten?.() ? `, ${data.kab.keteranganKabupaten()}` : ''
  let propinsi = data?.kab?.propinsi?.nama ? `, ${data.kab.propinsi.nama}` : ''
  let pos = data?.kode_pos ? `, ${data.kode_pos}, ` : ''
  let telp = data?.telp ? `Telp. ${data.telp}, ` : ' '
  let fax = data?.fax ? `Fax. ${data.fax}` : ' '

  return `${nama}${alamat}${kab}${propinsi}${pos}${telp}${fax}`
}

// Fungsi untuk menghindari error regex jika fasilitas mengandung karakter khusus

const escapeRegExp = string => {
  return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const alamatPusat = alamat => {
  const kodePos = alamat?.kode_pos ? `, ${alamat.kode_pos}` : ''
  const telp = alamat?.telp ? `, ${alamat.telp}` : ''
  const fax = alamat?.fax ? `, ${alamat.fax}` : ''
  const propinsi = alamat?.kab?.propinsi?.nama || ', '
  const kab = alamat?.kab_id ? (alamat.kab?.keteranganKabupaten ? `, ${alamat.kab.keteranganKabupaten()}` : '') : ''

  const alamatPusat = `${alamat?.alamat || ''}${kab}${propinsi}${kodePos}${telp}${fax}`

  return alamatPusat
}

export const alamatFas = alamat => {
  const kodePos = alamat?.kode_pos ? `, ${alamat.kode_pos}` : ''
  const telp = alamat?.telp ? `, ${alamat.telp}` : ''
  const fax = alamat?.fax ? `, ${alamat.fax}` : ''
  const propinsi = alamat?.kab_propinsi?.propinsi || ', '
  const kab = alamat?.kab_propinsi?.nama_cetak || ', '

  const alamatfas = `${alamat?.alamat || ''} ${kab}, ${propinsi}${kodePos}${telp}${fax}`

  return alamatfas
}

export const getKategoriSumber = id => {
  switch (id) {
    case 1:
      return 'Tunggal'
    case 2:
      return 'Curah'
    case 3:
      return 'Imaginer'
    default:
      return ''
  }
}

export const getTahapanValidasi = status => {
  const statusMap = {
    0: 'Draft',
    1: 'Proses Validator',
    2: 'Proses Otorisator',
    3: 'Dikembalikan ke Pemohon',
    4: 'Selesai'
  }

  return statusMap[status] || 'Status Tidak Diketahui'
}

import { Chip } from '@mui/material'

export const getFlagValid = flagValid => {
  if (flagValid === 1) {
    return <Chip label='Valid' variant='tonal' size='small' color='success' className='self-start rounded-sm' />
  } else if (flagValid === -1) {
    return <Chip label='Tidak Valid' variant='tonal' size='small' color='error' className='self-start rounded-sm' />
  } else {
    return null
  }
}

export const getFlagLengkap = flaglengkap => {
  if (flaglengkap === 1) {
    return <Chip label='Lengkap' variant='tonal' size='small' color='primary' className='self-start rounded-sm' />
  } else if (flaglengkap === -1) {
    return <Chip label='Tidak Lengkap' variant='tonal' size='small' color='warning' className='self-start rounded-sm' />
  } else {
    return null
  }
}

export const getStatusMasterSumber = status => {
  if (status === 1) {
    return <Chip label='Aktif' color='success' size='small' />
  } else if (status === 0) {
    return <Chip label='Non Aktif' color='error' size='small' />
  } else {
    return '-'
  }
}

export const getStatusFasSumber = status => {
  if (status === 1) {
    return <Chip label='Aktif' color='success' size='small' />
  } else if (status === 0 || status === 2) {
    return <Chip label='Non Aktif' color='error' size='small' />
  } else {
    return '-'
  }
}

export const getJenisValidasi = jenis => {
  if (jenis === 1) {
    return 'Registrasi'
  } else if (jenis === 2) {
    return 'Update'
  } else if (jenis === 3) {
    return 'Sensus'
  } else {
    return null
  }
}
