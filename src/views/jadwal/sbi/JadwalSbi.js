'use client'

import React, { useCallback, useMemo, useState, useTransition } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button, ButtonGroup, Menu, MenuItem, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import CustomChip from '@core/components/mui/Chip'

import FormSpi from './FormSpi'

const DEFAULT_TOTAL_PAGES = 1

export const JadwalSbi = ({ data = [], currentPage = 1, perPage = 20, totalPages = DEFAULT_TOTAL_PAGES, onPageChange }) => {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dataForm, setDataForm] = useState(null)
  const [dataSurat, setDataSurat] = useState({})

  const indexOfFirstItem = useMemo(() => {
    return (currentPage - 1) * perPage
  }, [currentPage, perPage])

  const handlePaginationChange = useCallback(
    (_, page) => {
      if (typeof onPageChange === 'function') {
        onPageChange(page)

        return
      }

      startTransition(() => {
        router.push(`?page=${page}`)
      })
    },
    [onPageChange, router, startTransition]
  )

  const handleClickOpen = useCallback(item => {
    setDataForm(item)
    setDataSurat({})
    setEdit(false)
    setOpen(true)
  }, [])

  const handleClickEdit = useCallback((item, spi) => {
    setDataForm(item)
    setDataSurat(spi || {})
    setEdit(true)
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setEdit(false)
    setDataForm(null)
    setDataSurat({})
  }, [])

  const handleDetailClick = useCallback(
    jadwalId => {
      if (!jadwalId) return

      startTransition(() => {
        router.push(`/jadwal/${jadwalId}`)
      })
    },
    [router, startTransition]
  )

  const RowOptions = ({ item }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleCreateSpi = () => {
      handleRowOptionsClose()
      handleClickOpen(item)
    }

    const handleEditSpi = () => {
      handleRowOptionsClose()
      handleClickEdit(item, item.spi)
    }

    const handleDetail = () => {
      handleRowOptionsClose()
      handleDetailClick(item.jadwal_id)
    }

    return (
      <>
        <ButtonGroup variant='outlined' color='primary' aria-label='jadwal spi options'>
          <Button size='small' onClick={handleRowOptionsClick}>
            <Icon icon='tabler:dots-vertical' />
          </Button>
        </ButtonGroup>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '10rem' } }}
        >
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleDetail}>
            <Icon icon='tabler:details' fontSize={18} />
            <Typography variant='inherit' fontSize={15}>
              Detail Jadwal
            </Typography>
          </MenuItem>
          <MenuItem
            component={Link}
            href={{ pathname: `/spi-sbi/${item.jadwal_id}`, query: { id: item.jadwal_id } }}
            sx={{ '& svg': { mr: 2 } }}
            onClick={handleRowOptionsClose}
          >
            <Icon icon='tabler:border-right-plus' fontSize={18} />
            <Typography variant='inherit' fontSize={15}>
              Buat SBI
            </Typography>
          </MenuItem>
          {item.spi ? (
            <>
              <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleEditSpi}>
                <Icon icon='tabler:edit' fontSize={18} />
                <Typography variant='inherit' fontSize={15}>
                  Edit SPI {item.data_surat_count}
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                target='_blank'
                href={{ pathname: `/cetak/spi`, query: { ...item.spi } }}
                sx={{ '& svg': { mr: 2 } }}
                onClick={handleRowOptionsClose}
              >
                <Icon icon='tabler:file' fontSize={18} />
                <Typography variant='inherit' fontSize={15}>
                  Surat SPI {item.data_surat_count}
                </Typography>
              </MenuItem>
            </>
          ) : (
            <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleCreateSpi}>
              <Icon icon='tabler:plus' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Buat SPI {item.data_surat_count}
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </>
    )
  }

  const hasData = Array.isArray(data) && data.length > 0

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='tabel jadwal spi sbi'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Kode Area / Bidang</TableCell>
              <TableCell>Propinsi</TableCell>
              <TableCell>Jml. Instansi</TableCell>
              <TableCell>Jml. Kegiatan</TableCell>
              <TableCell>Jml. SBI</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hasData ? (
              data.map((item, index) => (
                <TableRow key={`${item.jadwal_id ?? 'jadwal'}-${index}`}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <RowOptions item={item} />
                  </TableCell>
                  <TableCell>
                    {item.tgl_mulai} - {item.tgl_akhir}
                  </TableCell>
                  <TableCell>
                    {item.kode_area} - {item.bidang?.nama}
                  </TableCell>
                  <TableCell>{item.propinsi?.nama}</TableCell>
                  <TableCell>{item.jadwal_fas_count}</TableCell>
                  <TableCell>{item.jadwal_tujuan_count}</TableCell>
                  <TableCell>{item.sbi_count}</TableCell>
                  <TableCell>
                    <Typography component='span' variant='body2'>
                      {item.status?.nama}
                    </Typography>
                    <br />
                    {item.status_sbi === 1 && (
                      <CustomChip label='SPI telah dikirimkan' skin='light' color='success' sx={{ mt: 1 }} />
                    )}
                    <br />
                    {item.status_spi === 1 && (
                      <CustomChip label='SBI telah dikirimkan' skin='light' color='success' sx={{ mt: 1 }} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align='center'>
                  <Typography component='span' variant='body2'>
                    Tidak ada data jadwal.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && (
        <Pagination
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
          count={totalPages}
          page={currentPage}
          onChange={handlePaginationChange}
        />
      )}
      {open && dataForm && (
        <FormSpi dataForm={dataForm} dataSurat={dataSurat} open={open} edit={edit} handleClose={handleClose} />
      )}
    </>
  )
}
