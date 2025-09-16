'use client'

import { useMemo, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

import { Icon } from '@iconify/react/dist/iconify.js'

import { STATUS_LKF } from '@/configs/lkfConfig'
import customFetch from '@/utils/axios'

export default function LkfActionMenu({ lkf, settings = {}, urls = {}, onDeleted, onSent }) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const [confirmKirimOpen, setConfirmKirimOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const open = Boolean(anchorEl)

  const id = lkf?.lkf_id

  const canEdit = useMemo(() => {
    if (typeof lkf?.editable_by_pemohon === 'boolean') return lkf.editable_by_pemohon
    const code = Number(lkf?.status)

    return [STATUS_LKF.LKF_DRAFT, STATUS_LKF.LKF_KEMBALI].includes(code)
  }, [lkf])

  // Tanggal “pengiriman ditutup” (Asia/Jakarta)
  const todayJakarta = useMemo(() => {
    const dtf = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

    return dtf.format(new Date()) // 'YYYY-MM-DD'
  }, [])

  const exp = settings?.tgl_tutup || ''
  const kembali = settings?.tgl_open_next || ''
  const keterangan = settings?.keterangan || ''
  const isWindowClosed = exp && kembali && todayJakarta >= exp && todayJakarta < kembali

  // URL defaults (silakan sesuaikan)
  const hrefLengkapi = urls.lengkapi || `/frontend/lvkf-tahunan/${id}/edit`
  const hrefCetakDraft = urls.cetakDraft || `/api/pdf/lkf/${id}?draft=1`
  const hrefCetakFinal = urls.cetakFinal || `/api/pdf/lkf/${id}`
  const apiKirim = urls.kirim || `/api/lkf/${id}/kirim`
  const apiHapus = urls.hapus || `/api/lkf/${id}`

  const handleOpen = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const doKirim = async () => {
    try {
      const resp = await customFetch.patch(apiKirim)

      if (resp?.status >= 200 && resp?.status < 300) {
        onSent?.(id)
        router.refresh?.()
      }
    } catch (e) {
      console.error('Gagal kirim LKF', e)
      alert('Gagal mengirim LKF. Coba lagi.')
    } finally {
      setConfirmKirimOpen(false)
      handleClose()
    }
  }

  const doDelete = async () => {
    try {
      const resp = await customFetch.delete(apiHapus)

      if (resp?.status >= 200 && resp?.status < 300) {
        onDeleted?.(id)
        router.refresh?.()
      }
    } catch (e) {
      console.error('Gagal hapus LKF', e)
      alert('Gagal menghapus LKF. Coba lagi.')
    } finally {
      setConfirmDeleteOpen(false)
      handleClose()
    }
  }

  // ⬇️ SUSUN ARRAY ITEMS (bukan Fragment)
  const menuItems = canEdit
    ? [
        <MenuItem key='edit' component={Link} href={hrefLengkapi} onClick={handleClose}>
          <ListItemIcon>
            <Icon icon='tabler:edit' />
          </ListItemIcon>
          <ListItemText primary='Lengkapi Data' />
        </MenuItem>,
        <MenuItem
          key='draft'
          component={Link}
          href={hrefCetakDraft}
          target='_blank'
          rel='noopener noreferrer'
          onClick={handleClose}
        >
          <ListItemIcon>
            <Icon icon='tabler:file' />
          </ListItemIcon>
          <ListItemText primary='Cetak Draft (PDF)' />
        </MenuItem>,
        <MenuItem
          key='delete'
          onClick={() => {
            setConfirmDeleteOpen(true)
            handleClose()
          }}
        >
          <ListItemIcon>
            <Icon icon='tabler:trash' />
          </ListItemIcon>
          <ListItemText primary='Hapus' />
        </MenuItem>,
        <Divider key='div1' />,
        isWindowClosed ? (
          <Tooltip key='closed' title={keterangan || 'Pengiriman LKF saat ini ditutup'} placement='right'>
            <span>
              <MenuItem disabled>
                <ListItemIcon>
                  <Icon icon='tabler:alert-triangle' />
                </ListItemIcon>
                <ListItemText primary={<span style={{ color: '#f38692' }}>Pengiriman LVKF ditutup</span>} />
              </MenuItem>
            </span>
          </Tooltip>
        ) : (
          <MenuItem
            key='send'
            onClick={() => {
              setConfirmKirimOpen(true)
              handleClose()
            }}
          >
            <ListItemIcon>
              <Icon icon='tabler:send' />
            </ListItemIcon>
            <ListItemText primary='Kirim' />
          </MenuItem>
        )
      ]
    : [
        <MenuItem
          key='print'
          component={Link}
          href={hrefCetakFinal}
          target='_blank'
          rel='noopener noreferrer'
          onClick={handleClose}
        >
          <ListItemIcon>
            <Icon icon='tabler:print' />
          </ListItemIcon>
          <ListItemText primary='Cetak LVKF (PDF)' />
        </MenuItem>
      ]

  return (
    <>
      <Button size='small' variant='outlined' onClick={handleOpen} sx={{ textTransform: 'none' }}>
        Action
      </Button>

      {/* Render array langsung (tanpa Fragment) */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems}
      </Menu>

      {/* Dialog konfirmasi Kirim */}
      <Dialog open={confirmKirimOpen} onClose={() => setConfirmKirimOpen(false)} maxWidth='xs' fullWidth>
        <DialogTitle>Kirim LKF</DialogTitle>
        <DialogContent dividers>
          LKF dengan nomor <b>{lkf?.no_lkf || id}</b> akan dikirimkan ke BAPETEN.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmKirimOpen(false)}>Batal</Button>
          <Button onClick={doKirim} variant='contained' startIcon={<Icon icon='tabler:send' />}>
            Kirim
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog konfirmasi Hapus */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)} maxWidth='xs' fullWidth>
        <DialogTitle>Hapus LKF</DialogTitle>
        <DialogContent dividers>
          Yakin ingin menghapus LKF <b>{lkf?.no_lkf || id}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Batal</Button>
          <Button onClick={doDelete} color='error' variant='contained' startIcon={<Icon icon='tabler:trash' />}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
