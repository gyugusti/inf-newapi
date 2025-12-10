'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth'
import customFetch from '@/utils/axios'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

export async function fetchRegistrasiSrp(params = {}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      data: [],
      current_page: params.page || DEFAULT_PAGE,
      per_page: params.limit || params.per_page || DEFAULT_LIMIT,
      last_page: 1,
      fas_id: session?.user?.fas_id ?? '',
      total: 0
    }
  }

  const page = Number(params.page) || DEFAULT_PAGE
  const limit = Number(params.limit || params.per_page) || DEFAULT_LIMIT

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    params: {
      page,
      limit,
      tahap_reg_id: params.tahap_reg_id || '',
      validator_id: params.validator_id || '',
      otorisator_id: params.otorisator_id || '',
      fas_id: session?.user?.fas_id ?? '',
      cari: params.cari || ''
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.get('/api/registrasi/srp', config)
    const responseData = resp?.data?.response

    if (!responseData) {
      return {
        data: [],
        current_page: page,
        per_page: limit,
        last_page: 1,
        total: 0
      }
    }

    return {
      data: Array.isArray(responseData.data) ? responseData.data : [],
      current_page: Number(responseData.current_page ?? page),
      per_page: Number(responseData.per_page ?? limit),
      last_page: Number(
        responseData.last_page ??
          responseData.total_pages ??
          (responseData.total && (responseData.per_page || limit)
            ? Math.ceil(responseData.total / (responseData.per_page || limit))
            : 1)
      ),
      total: Number(responseData.total ?? responseData.data?.length ?? 0)
    }
  } catch (error) {
    console.error('Error fetching registrasi SRP:', error)

    return {
      data: [],
      current_page: page,
      per_page: limit,
      last_page: 1,
      total: 0
    }
  }
}

export async function createRegistrasiSrp(data) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    withCredentials: true
  }

  const payload = {
    jenis_sumber_id: data?.jenis_sumber_id ?? 0,
    flag_kegiatan: data?.flag_kegiatan ?? '',
    kat_sumber_id: data?.kat_sumber_id ?? 0,
    kegiatan: data?.kegiatan ?? 0,
    model_sumber_id: data?.model_sumber_id ?? 0,
    tipe: data?.tipe ?? '',
    no_seri: data?.no_seri ?? '',
    nama: data?.nama ?? '',
    merk_tabung: data?.merk_tabung ?? 0,
    tipe_tabung: data?.tipe_tabung ?? '',
    no_seri_tabung: data?.no_seri_tabung ?? '',
    tahun_produksi: data?.tahun_produksi ?? '',
    pabrikan: data?.pabrikan ?? '',
    aktivitas: data?.aktivitas ?? '',
    sat_aktivitas: data?.sat_aktivitas ?? 0,
    tgl_aktivitas: data?.tgl_aktivitas ?? '',
    kv: data?.kv ?? 0,
    sat_kv: data?.sat_kv ?? 0,
    ma: data?.ma ?? 0,
    sat_ma: data?.sat_ma ?? 0,
    sifat: data?.sifat ?? '',
    bentuk: data?.bentuk ?? '',
    jumlah: data?.jumlah ?? 0,
    sat_jumlah: data?.sat_jumlah ?? 0,
    status_sumber_id: data?.status_sumber_id ?? 0,
    ket_status: data?.ket_status ?? '',
    fas_id: data?.fas_id ?? 0,
    user_id: data?.user_id ?? 0,
    flag_user: data?.flag_user ?? 0,
    username: data?.username ?? '',
    jadwal_id: data?.jadwal_id ?? 0,
    jenis_validasi_id: 1
  }

  try {
    const resp = await customFetch.post('/api/registrasi/srp', payload, config)

    return resp?.data
  } catch (error) {
    const apiData = error?.response?.data
    const keterangan = apiData?.keterangan

    console.error('API /api/registrasi/srp error:', apiData || error?.message)

    // sesuai log kamu:
    // { "status":400, "keterangan": { flag_kegiatan: [...], ma: [...] }, "response":[] }
    if (keterangan) {
      throw new Error(JSON.stringify({ type: 'validation', errors: keterangan }))
    }

    throw new Error(apiData?.message || apiData?.error || error?.message || 'Gagal menyimpan registrasi SRP')
  }
}

// ==== UPDATE SRP (PUT) ====
export async function updateRegistrasiSrp(id, data) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    withCredentials: true
  }

  const payload = {
    jenis_sumber_id: data?.jenis_sumber_id ?? 0,
    flag_kegiatan: data?.flag_kegiatan ?? '',
    kat_sumber_id: data?.kat_sumber_id ?? 0,
    kegiatan: data?.kegiatan ?? 0,
    model_sumber_id: data?.model_sumber_id ?? 0,
    tipe: data?.tipe ?? '',
    no_seri: data?.no_seri ?? '',
    nama: data?.nama ?? '',
    merk_tabung: data?.merk_tabung ?? 0,
    tipe_tabung: data?.tipe_tabung ?? '',
    no_seri_tabung: data?.no_seri_tabung ?? '',
    tahun_produksi: data?.tahun_produksi ?? '',
    pabrikan: data?.pabrikan ?? '',
    aktivitas: data?.aktivitas ?? '',
    sat_aktivitas: data?.sat_aktivitas ?? 0,
    tgl_aktivitas: data?.tgl_aktivitas ?? '',
    kv: data?.kv ?? 0,
    sat_kv: data?.sat_kv ?? 0,
    ma: data?.ma ?? 0,
    sat_ma: data?.sat_ma ?? 0,
    sifat: data?.sifat ?? '',
    bentuk: data?.bentuk ?? '',
    jumlah: data?.jumlah ?? 0,
    sat_jumlah: data?.sat_jumlah ?? 0,
    status_sumber_id: data?.status_sumber_id ?? 0,
    ket_status: data?.ket_status ?? '',
    fas_id: data?.fas_id ?? 0,
    user_id: data?.user_id ?? 0,
    flag_user: data?.flag_user ?? 0,
    username: data?.username ?? '',
    jadwal_id: data?.jadwal_id ?? 0
  }

  try {
    const resp = await customFetch.put(`/api/registrasi/srp/${id}`, payload, config)

    return resp?.data
  } catch (error) {
    const apiData = error?.response?.data
    const keterangan = apiData?.keterangan

    console.error('API UPDATE SRP error:', apiData || error?.message)

    // Laravel/Yii response: { status:400, keterangan:{...}, response:[] }
    if (keterangan) {
      throw new Error(JSON.stringify({ type: 'validation', errors: keterangan }))
    }

    throw new Error(apiData?.message || apiData?.error || error?.message || 'Gagal mengupdate registrasi SRP')
  }
}

export async function deleteRegSumber(regsrpId) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    params: {
      reg_srp_id: [regsrpId]
    },
    withCredentials: true
  }

  try {
    const resp = await customFetch.delete('/api/registrasi/srp/destroy', config)

    return resp?.data
  } catch (error) {
    const apiData = error?.response?.data

    console.error('Error deleting registrasi SRP:', apiData || error?.message)

    throw new Error(apiData?.message || apiData?.error || error?.message || 'Gagal menghapus registrasi SRP')
  }
}

export async function kevalidatorRegSumber(dataform) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
    },
    withCredentials: true
  }

  const payload = {
    reg_srp_id: dataform?.reg_srp_id ?? [],
    username: dataform?.username ?? ''
  }

  try {
    const resp = await customFetch.post('/api/registrasi/srp/kirim', payload, config)

    return resp?.data
  } catch (error) {
    const apiData = error?.response?.data

    console.error('Error sending registrasi SRP to validator:', apiData || error?.message)

    throw new Error(apiData?.message || apiData?.error || error?.message || 'Gagal mengirim registrasi SRP ke validator')
  }
}
