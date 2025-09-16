import {
  fetchInstansiTerjadwal,
  fetchKelompok
} from '@/app/(dashboard)/(private)/instansi-terjadwal/server-action/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const tahun = searchParams.get('tahun') || ''

  try {
    const [instansiList, kelompokList] = await Promise.all([fetchInstansiTerjadwal(tahun), fetchKelompok()])

    const gabungan = instansiList.map(instansi => {
      const kelompokMatch = kelompokList.find(k => k.kelompok_id === instansi.kelompok_id)

      return {
        ...instansi,
        nama: kelompokMatch?.nama || 'Unknown',
        kegiatan_count: kelompokMatch?.kegiatan_count || 0,
        temuan_acu_count: kelompokMatch?.temuan_acu_count || 0,
        syarat_ins_count: kelompokMatch?.syarat_ins_count || 0,
        inkf_kel_count: kelompokMatch?.inkf_kel_count || 0,
        lkf_lib_count: kelompokMatch?.lkf_lib_count || 0
      }
    })

    return new Response(JSON.stringify({ data: gabungan }), { status: 200 })
  } catch (error) {
    console.error('API ERROR:', error)

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}
