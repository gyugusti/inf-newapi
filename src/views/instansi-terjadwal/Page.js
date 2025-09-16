'use client'

import { useEffect, useState } from 'react'

import { Box, CircularProgress, Typography, TextField, MenuItem } from '@mui/material'
import classnames from 'classnames'

import tableStyles from '@core/styles/table.module.css'
import styles from './styles.module.css'

const Page = () => {
  const [dataGabungan, setDataGabungan] = useState([])
  const [loading, setLoading] = useState(true)
  const tahunSekarang = new Date().getFullYear()
  const listTahun = Array.from({ length: 6 }, (_, i) => `${tahunSekarang - i}`)
  const [tahun, setTahun] = useState(listTahun[0])

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(`/api/data-gabungan?tahun=${tahun}`)
        const json = await res.json()

        if (isMounted) setDataGabungan(json.data || [])
      } catch (e) {
        console.error('Gagal memuat data:', e)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [tahun])

  const total = {
    fasilitas: dataGabungan.reduce((a, b) => a + (b.fasilitas || 0), 0),
    terjadwal: dataGabungan.reduce((a, b) => a + (b.terjadwal || 0), 0),
    sisa: dataGabungan.reduce((a, b) => a + (b.sisa || 0), 0),
    kegiatan: dataGabungan.reduce((a, b) => a + (b.kegiatan_count || 0), 0),
    temuan: dataGabungan.reduce((a, b) => a + (b.temuan_acu_count || 0), 0),
    syarat: dataGabungan.reduce((a, b) => a + (b.syarat_ins_count || 0), 0),
    inkf: dataGabungan.reduce((a, b) => a + (b.inkf_kel_count || 0), 0),
    lkf: dataGabungan.reduce((a, b) => a + (b.lkf_lib_count || 0), 0)
  }

  return (
    <section className='bg-backgroundPaper'>
      <div className={styles.layoutSpacing}>
        <Typography variant='h5' gutterBottom>
          Kelompok Pemanfaatan
        </Typography>

        <Box mb={2}>
          <TextField select label='Tahun' value={tahun} onChange={e => setTahun(e.target.value)}>
            {listTahun.map(t => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {loading ? (
          <Box display='flex' justifyContent='center' my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <table className={tableStyles.table}>
            <thead className={styles.tableHead}>
              <tr className='danger'>
                <th className='center'>No</th>
                <th>Kelompok</th>
                <th className='center'>Fasilitas</th>
                <th className='center'>Terjadwal</th>
                <th className='center'>Sisa</th>
              </tr>
            </thead>
            <tbody className={classnames('border-be', styles.tableBody)}>
              {dataGabungan.length > 0 ? (
                <>
                  {dataGabungan.map((row, index) => (
                    <tr key={row.kelompok_id}>
                      <td className='center'>{index + 1}</td>
                      <td>{row.nama}</td>
                      <td className='center'>{row.fasilitas}</td>
                      <td className='center'>{row.terjadwal}</td>
                      <td className='center'>{row.sisa}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: 'bold', backgroundColor: '#f1f5f9' }}>
                    <td colSpan={2} className='center'>
                      Total
                    </td>
                    <td className='center'>{total.fasilitas}</td>
                    <td className='center'>{total.terjadwal}</td>
                    <td className='center'>{total.sisa}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={10} className='center'>
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

export default Page
