import React, { useEffect, useRef, useState, Fragment } from 'react'

import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  MenuItem,
  Menu,
  ButtonGroup,
  Paper,
  StepLabel
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch, useSelector } from 'react-redux'

import OptionMenu from '@core/components/option-menu'

import { changePage, getJadwal } from '@/redux-store/jadwal'
import { StyledTableCell, StyledTableRow, TableCellNoRow } from '@/components/styles/StyledTable'
import Loading from '@/components/Loading'
import StatusKonfirmasi from '@/components/jadwal/StatusKonfirmasi'
import LabelStatus from '@/components/jadwal/LabelStatus'
import DetailJadwal from './DetailJadwal'
import { getLocalizedUrl } from '@/utils/i18n'

const KonfirmasiJadwal = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [dataDetail, setDataDetail] = useState()

  const { listJadwal, isLoading, numOfPages, current_page, per_page, status, total } = useSelector(
    store => store.jadwal
  )

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  const handleClickOpen = data => {
    setDataDetail(data)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (status && status !== '') {
      dispatch(getJadwal())
    }
  }, [dispatch, current_page, status])

  if (isLoading || !listJadwal) {
    return <Loading />
  }

  const RowOptions = ({ id, item }) => {
    const anchorRef = useRef(null)
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
        <div className='flex items-center'>
          <OptionMenu
            iconButtonProps={{ size: 'medium' }}
            iconClassName='text-textSecondary'
            options={[
              {
                text: 'Detail Jadwal',
                icon: 'tabler-eye text-[22px]',
                menuItemProps: {
                  onClick: () => handleClickOpen(item),
                  className: 'flex items-center gap-2 text-textSecondary'
                }
              },
              {
                text: 'Persetujuan',
                icon: 'tabler-pencil',
                href: `${item.jadwal_id}`,
                linkProps: {
                  className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                }
              }
            ]}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <StepLabel style={{ textAlign: 'right' }}>Total : {total}</StepLabel>
        <Table aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>NO</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>Jadwal</StyledTableCell>
              <StyledTableCell>Bidang</StyledTableCell>
              <StyledTableCell>Propinsi</StyledTableCell>
              <StyledTableCell>Instansi</StyledTableCell>
              <StyledTableCell>Stat. Konfirmasi</StyledTableCell>
              <StyledTableCell>Stat. Proses</StyledTableCell>
              <StyledTableCell>Kontak Person</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {listJadwal.map((item, index) => (
              <Fragment key={index}>
                <StyledTableRow>
                  <StyledTableCell rowSpan={item.jadwal_fas?.length || 1}>
                    {indexOfFirstItem + index + 1}
                  </StyledTableCell>
                  <StyledTableCell rowSpan={item.jadwal_fas?.length || 1}>
                    <RowOptions id={item.jadwal_id} item={item} />
                  </StyledTableCell>
                  <StyledTableCell rowSpan={item.jadwal_fas?.length || 1}>
                    {item.tgl_mulai} - {item.tgl_akhir} <br />
                    {item.kode_area}
                  </StyledTableCell>
                  <StyledTableCell rowSpan={item.jadwal_fas?.length || 1}>{item.bidang.nama}</StyledTableCell>
                  <StyledTableCell rowSpan={item.jadwal_fas?.length || 1}>{item.propinsi.nama}</StyledTableCell>

                  {item.jadwal_fas && item.jadwal_fas.length > 0 ? (
                    <>
                      <TableCell>{item.jadwal_fas[0].fas.nama}</TableCell>
                      <TableCell>
                        {item.jadwal_fas[0].konfirmasi ? (
                          <StatusKonfirmasi konfirmasi={item.jadwal_fas[0].konfirmasi.konfirmasi} />
                        ) : (
                          <strong style={{ color: 'orange' }}>Belum dikonfirmasi</strong>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.jadwal_fas[0].konfirmasi ? (
                          <LabelStatus id={item.jadwal_fas[0].konfirmasi.status_id} />
                        ) : (
                          <strong style={{ color: 'orange' }}>Belum dikonfirmasi</strong>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.jadwal_fas[0].konfirmasi ? (
                          <>
                            Nama: <strong>{item.jadwal_fas[0].konfirmasi.nama_kontak}</strong> <br />
                            Telp: <strong>{item.jadwal_fas[0].konfirmasi.telp_kontak}</strong>
                          </>
                        ) : (
                          'Nama: - Telp: -'
                        )}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>Nama: - Telp: -</TableCell>
                    </>
                  )}
                </StyledTableRow>

                {item.jadwal_fas?.slice(1).map((row, subIndex) => (
                  <TableRow key={subIndex}>
                    <TableCell>{row.fas?.nama}</TableCell>
                    <TableCell>
                      {row.konfirmasi ? (
                        <StatusKonfirmasi konfirmasi={row.konfirmasi.konfirmasi} />
                      ) : (
                        <strong style={{ color: 'orange' }}>Belum dikonfirmasi</strong>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.konfirmasi ? (
                        <LabelStatus id={row.konfirmasi.status_id} />
                      ) : (
                        <strong style={{ color: 'orange' }}>Belum dikonfirmasi</strong>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.konfirmasi ? (
                        <>
                          Nama: <strong>{row.konfirmasi.nama_kontak}</strong> <br />
                          Telp: <strong>{row.konfirmasi.telp_kontak}</strong>
                        </>
                      ) : (
                        'Nama: - Telp: -'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination color='primary' count={numOfPages} page={current_page} onChange={handlePageChange} />
      {open && <DetailJadwal data={dataDetail} open={open} handleClose={handleClose} />}
    </>
  )
}

export default KonfirmasiJadwal
