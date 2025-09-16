'use client'

import { useMemo, useState } from 'react'

import { Icon } from '@iconify/react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import customFetch from '@/utils/axios'

/**
 * Tambah LVKF (Modal Form)
 *
 * Props:
 * - tahun: number|string (wajib)
 * - fasilitas: { fas_id: number|string, nama: string } (wajib)
 * - kelompokOptions: Array<{kelompok_id, nama}>
 * - propinsiOptions: Array<{propinsi_id, nama}>
 * - kabupatenOptions: Array<{kab_id, nama?|keterangan?}>
 * - alamatOptions: Array<{alamat_id, nama?, alamat?}>
 * - apiCreate?: string  // default: '/api/lkf'
 * - onCreated?: (newItem) => void  // callback setelah sukses
 * - disabled?: boolean  // misal disable di tab 'arsip'
 */
export default function LkfCreateButton({
  tahun,
  fasilitas,
  kelompokOptions = [],
  propinsiOptions = [],
  kabupatenOptions = [],
  alamatOptions = [],
  apiCreate = '/api/lkf',
  onCreated,
  disabled = false
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [kelompokId, setKelompokId] = useState('')
  const [propinsiId, setPropinsiId] = useState('')
  const [kabId, setKabId] = useState('')
  const [alamatId, setAlamatId] = useState('')

  const instansiText = useMemo(() => fasilitas?.nama || '-', [fasilitas])

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    if (!loading) setOpen(false)
  }

  const resetForm = () => {
    setKelompokId('')
    setPropinsiId('')
    setKabId('')
    setAlamatId('')
  }

  const handleSubmit = async () => {
    // Validasi minimal
    if (!kelompokId) return alert('Pilih Kelompok terlebih dahulu')
    if (!fasilitas?.fas_id) return alert('fas_id tidak ditemukan')
    if (!tahun) return alert('tahun tidak valid')

    const payload = {
      fas_id: fasilitas.fas_id,
      tahun,
      kelompok_id: kelompokId,
      propinsi_id: propinsiId || null,
      kab_id: kabId || null,
      alamat_id: alamatId || null
    }

    try {
      setLoading(true)
      const resp = await customFetch.post(apiCreate, payload)

      // Asumsikan sukses 2xx
      if (resp?.status >= 200 && resp?.status < 300) {
        onCreated?.(resp.data || payload)
        resetForm()
        setOpen(false)
      } else {
        console.error('Gagal create LKF', resp?.status, resp?.data)
        alert('Gagal membuat LVKF. Coba lagi.')
      }
    } catch (e) {
      console.error('Error create LKF', e)
      alert('Terjadi kesalahan saat membuat LVKF.')
    } finally {
      setLoading(false)
    }
  }

  // Helper label kabupaten/alamat
  const kabLabel = k => (k?.keterangan ?? k?.nama ?? `${k?.kabupaten ?? ''} ${k?.kota ?? ''}`.trim()) || '-'

  const alamatLabel = a => [a?.nama, a?.alamat].filter(Boolean).join(' ') || `#${a?.alamat_id}`

  return (
    <>
      {/* Tombol Tambah LVKF */}
      <Button
        variant='contained'
        size='small'
        startIcon={<Icon icon='tabler:plus' />}
        onClick={handleOpen}
        disabled={disabled}
      >
        Tambah LVKF
      </Button>

      {/* Modal Form */}
      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogTitle>Tambah LVKF</DialogTitle>
        <DialogContent dividers>
          {/* Instansi: ... */}
          <Box mb={2}>
            <Typography variant='body2'>
              <strong>Instansi:</strong> {instansiText}
            </Typography>
            <Typography variant='body2'>
              <strong>Tahun:</strong> {tahun}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel id='kelompok-label'>Pilih Kelompok</InputLabel>
                <Select
                  labelId='kelompok-label'
                  label='Pilih Kelompok'
                  value={kelompokId}
                  onChange={e => setKelompokId(e.target.value)}
                >
                  <MenuItem value=''>
                    <em>- pilih kelompok -</em>
                  </MenuItem>
                  {kelompokOptions.map(row => (
                    <MenuItem key={row.kelompok_id} value={row.kelompok_id}>
                      {row.nama ?? `#${row.kelompok_id}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='propinsi-label'>Propinsi</InputLabel>
                <Select
                  labelId='propinsi-label'
                  label='Propinsi'
                  value={propinsiId}
                  onChange={e => setPropinsiId(e.target.value)}
                >
                  <MenuItem value=''>
                    <em>- semua Propinsi -</em>
                  </MenuItem>
                  {propinsiOptions.map(dp => (
                    <MenuItem key={dp.propinsi_id} value={dp.propinsi_id}>
                      {dp.nama ?? `#${dp.propinsi_id}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='kab-label'>Kabupaten / Kota</InputLabel>
                <Select
                  labelId='kab-label'
                  label='Kabupaten / Kota'
                  value={kabId}
                  onChange={e => setKabId(e.target.value)}
                >
                  <MenuItem value=''>
                    <em>- semua Kabupaten -</em>
                  </MenuItem>
                  {kabupatenOptions.map(row => (
                    <MenuItem key={row.kab_id} value={row.kab_id}>
                      {kabLabel(row)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel id='alamat-label'>Alamat</InputLabel>
                <Select
                  labelId='alamat-label'
                  label='Alamat'
                  value={alamatId}
                  onChange={e => setAlamatId(e.target.value)}
                >
                  <MenuItem value=''>
                    <em>- Semua Alamat -</em>
                  </MenuItem>
                  {alamatOptions.map(row => (
                    <MenuItem key={row.alamat_id} value={row.alamat_id}>
                      {alamatLabel(row)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            variant='contained'
            startIcon={loading ? <CircularProgress size={16} /> : <Icon icon='tabler:device-floppy' />}
            disabled={loading}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
