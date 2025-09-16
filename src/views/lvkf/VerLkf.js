import React, { Fragment, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination'

import CustomChip from '@core/components/mui/Chip'
import Loading from '@/components/Loading'
import { changePage, getLkf, lkfKembalikan, lkfSelesai } from '@/redux-store/lkf'
import { formatDates, fullDay } from '@/utils/helper'
import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'
import HasilEvaluasiCetak from '@/components/lvkf/HasilEvaluasiCetak'
import OptionMenu from '@/@core/components/option-menu'

const VerLkf = view => {
  const dispatch = useDispatch()
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const [lkfId, setLkfId] = useState()

  const { lvkf, isLoading, numOfPages, current_page, per_page, tab, status } = useSelector(store => store.lkf)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(getLkf())
  }, [dispatch, current_page, tab, status])

  if (isLoading || !lvkf) {
    return <Loading />
  }

  const handleKembali = lkfId => {
    setLkfId(lkfId)
    setShowConfirmationSend(true)
  }

  const handleSelesai = lkfId => {
    setLkfId(lkfId)
    setShowConfirmation(true)
  }

  const RowOptions = ({ id, item }) => {
    // ** Hooks
    const dispatch = useDispatch()
    const anchorRef = useRef(null)

    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <OptionMenu
          iconButtonProps={{ size: 'medium' }}
          iconClassName='text-textSecondary'
          options={[
            {
              text: 'View detail',
              icon: <Icon icon='tabler:details' fontSize={18} />,
              menuItemProps: {
                onClick: () => console.log('asd==='),
                className: 'flex items-center gap-2 text-textSecondary'
              }
            },
            {
              text: 'View pdf',
              icon: <Icon icon='tabler:file' fontSize={18} />,
              menuItemProps: {
                component: Link,
                href: {
                  pathname: `/spi-sbi/${item.jadwal_id}`,
                  query: { id: item.jadwal_id }
                },
                className: 'flex items-center gap-2 text-textSecondary'
              }
            },
            {
              text: 'View Nilai',
              icon: <Icon icon='tabler:stack-forward' fontSize={18} />,
              menuItemProps: {
                component: Link,
                href: {
                  pathname: `/spi-sbi/${item.jadwal_id}`,
                  query: { id: item.jadwal_id }
                },
                className: 'flex items-center gap-2 text-textSecondary'
              }
            },
            {
              text: 'Verifikasi',
              icon: <Icon icon='tabler:border-right-plus' fontSize={18} />,
              menuItemProps: {
                component: Link,
                href: {
                  pathname: `/lvkf-jadwal/${item.lkf_id}`,
                  query: { id: item.lkf_id }
                },
                className: 'flex items-center gap-2 text-textSecondary'
              }
            },
            ...(item.hasil_eva_id != 0
              ? [
                  {
                    text: 'Selesai',
                    icon: <Icon icon='tabler:thumb-up' fontSize={18} />,
                    menuItemProps: {
                      onClick: () => handleSelesai(item.lkf_id),
                      className: 'flex items-center gap-2 text-textSecondary'
                    }
                  }
                ]
              : []),
            ...(item.hasil_eva_id === 2
              ? [
                  {
                    text: 'Kembalikan ke Pemohon',
                    icon: <Icon icon='tabler:arrow-back' fontSize={18} />,
                    menuItemProps: {
                      onClick: () => handleKembali(item.lkf_id),
                      className: 'flex items-center gap-2 text-textSecondary'
                    }
                  }
                ]
              : []),
            ...(view.view === 'koordinator'
              ? [
                  {
                    text: 'Disposisi',
                    icon: <Icon icon='tabler:direction-sign' fontSize={18} />,
                    menuItemProps: {
                      onClick: () => console.log('syalala'),
                      className: 'flex items-center gap-2 text-textSecondary'
                    }
                  }
                ]
              : [])
          ]}
        />
      </>
    )
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>Action </TableCell>
              <TableCell>No LVKF</TableCell>
              <TableCell>Kelompok Keg. / Tgl Pelaksanaan </TableCell>
              <TableCell>Kode Area</TableCell>
              <TableCell>Instansi</TableCell>
              <TableCell>Verifikator</TableCell>
              <TableCell>Nilai IKK</TableCell>
              <TableCell>Hasil Eva</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lvkf.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <RowOptions id={item.jadwal_id} item={item} />
                  </TableCell>
                  <TableCell>{item.no_lkf}</TableCell>
                  <TableCell>
                    {item.jadwal !== null && formatDates(item.jadwal.tgl_mulai, item.jadwal.tgl_akhir)}
                  </TableCell>
                  <TableCell>{item.jadwal?.kode_area} </TableCell>
                  <TableCell>{item.nama} </TableCell>
                  <TableCell>{item.verifikator?.nama}</TableCell>
                  <TableCell>{item.nilai_ikk}</TableCell>
                  <TableCell>
                    <HasilEvaluasiCetak hasilEvaId={item.hasil_eva_id} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
      <DialogKonfirmasi
        open={showConfirmationSend}
        setOpen={showConfirmationSend}
        jadwalId={lkfId}
        onConfirm={lkfId => {
          if (lkfId !== 'no') {
            dispatch(lkfKembalikan(lkfId))
          }

          setShowConfirmationSend(false)
        }}
        message='Lvkf akan di kembalikan ke pemohon untuk di lengkapi. Kirimkan LKF? '
      />
      <DialogKonfirmasi
        open={showConfirmation}
        setOpen={showConfirmation}
        jadwalId={lkfId}
        onConfirm={lkfId => {
          if (lkfId !== 'no') {
            dispatch(lkfSelesai(lkfId))
          }

          setShowConfirmation(false)
        }}
        message='Lvkf selesai dan akan di masukkan ke dalam arsip. Apakah anda yakin?
        '
      />
    </>
  )
}

export default VerLkf
