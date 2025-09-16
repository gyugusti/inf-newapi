import React from 'react'

import { Table, TableBody } from '@mui/material'

import { StyledTableCell, StyledTableRow, TableCellNoRow } from '@/components/styles/StyledTable'
import { formatDates } from '@/utils/helper'

const DetailJadwal = ({
  dataFihi,
  kodearea = null,
  propinsi = null,
  fasilitas = null,
  status_inspeksi = null,
  tgl_mulai = null,
  tgl_akhir = null,
  tim = null
}) => {
  // Assign `tim_insp` based on the condition
  const tim_insp = tim || dataFihi.jadwal_fas?.jadwal?.jadwal_tim || []
  const stat_inspeksi = status_inspeksi || dataFihi.jadwal_fas?.status_inspeksi || null

  return (
    <>
      <Table>
        <TableBody>
          <StyledTableRow>
            <TableCellNoRow>Kode Area</TableCellNoRow>
            <TableCellNoRow>{kodearea || dataFihi.jadwal_fas?.jadwal?.kode_area}</TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Propinsi</TableCellNoRow>
            <TableCellNoRow>{propinsi || dataFihi.jadwal_fas?.jadwal?.propinsi?.nama}</TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Fasilitas Pusat</TableCellNoRow>
            <TableCellNoRow>{fasilitas || dataFihi.jadwal_fas?.fas?.nama}</TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Status Inspeksi</TableCellNoRow>
            <TableCellNoRow>
              {stat_inspeksi ? (stat_inspeksi === 1 ? 'Terlaksana' : 'Tdk Terlaksana') : null}
            </TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Tanggal Inspeksi</TableCellNoRow>
            <TableCellNoRow>
              {tgl_mulai ||
                (dataFihi.jadwal_fas?.jadwal?.tgl_mulai &&
                  formatDates(dataFihi.jadwal_fas.jadwal.tgl_mulai, dataFihi.jadwal_fas.jadwal.tgl_akhir))}
            </TableCellNoRow>
          </StyledTableRow>
          <StyledTableRow>
            <TableCellNoRow>Tim Inspektur</TableCellNoRow>
            <TableCellNoRow>
              {tim_insp.length > 0 ? (
                tim_insp.map((tim, index) => (
                  <div key={index}>
                    {index + 1}. {tim.inspektur.nama} ({tim.jabatan.nama})
                  </div>
                ))
              ) : (
                <span>-</span>
              )}
            </TableCellNoRow>
          </StyledTableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default DetailJadwal
