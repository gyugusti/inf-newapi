import { Fragment, useState } from 'react'

import { Table, TableBody, Button } from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import { StyledTableCell, StyledTableRow, TableCellNoRow } from '@/components/styles/StyledTable'
import { formatDates, fullDay } from '@/utils/helper'
import { alamatCetak } from '@/utils/balishelper'
import FormLhiLokasi from './form/FormLhiLokasi'

const LhiLokasi = ({ dataLhi }) => {
  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()

  const handleModalOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleModalClose = () => setOpen(false)

  return (
    <>
      <Table>
        <TableBody>
          <StyledTableRow>
            <TableCellNoRow colSpan={2}>
              <Button variant='contained' size='small' onClick={() => handleModalOpen(dataLhi)}>
                <Icon icon='tabler:edit' fontSize={15} />
                update lokasi
              </Button>
            </TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Tanggal Pelaksanaan</TableCellNoRow>
            <TableCellNoRow>{dataLhi.tgl_mulai && formatDates(dataLhi.tgl_mulai, dataLhi.tgl_akhir)}</TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Lokasi Srp</TableCellNoRow>
            <TableCellNoRow>{dataLhi.alamat && alamatCetak(dataLhi.alamat, dataLhi.fas)}</TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Status Inspeksi</TableCellNoRow>
            <TableCellNoRow>
              {dataLhi.jadwal_tujuan.jadwal_fas.status_inspeksi === 1 ? 'Terlaksana' : 'Tdk Terlaksana'}
            </TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Tgl LHI</TableCellNoRow>
            <TableCellNoRow>{fullDay(dataLhi.tgl_lhi)}</TableCellNoRow>
          </StyledTableRow>
        </TableBody>
      </Table>
      {open && <FormLhiLokasi data={dataForm} open={open} handleClose={handleModalClose} />}
    </>
  )
}

export default LhiLokasi
