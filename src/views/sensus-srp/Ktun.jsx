'use client'

import { useState } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch } from 'react-redux'

import { downloadKtun, setNamadoc } from '@/redux-store/pdf'
import { fullDayTime } from '@/utils/helper'

const Ktun = ({ dataKtun, view }) => {
  console.log(view)

  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10 // bisa diubah sesuai kebutuhan
  const totalData = dataKtun.data.length
  const totalPages = Math.ceil(totalData / perPage)

  const indexOfLastItem = currentPage * perPage
  const indexOfFirstItem = indexOfLastItem - perPage
  const currentItems = dataKtun.data.slice(indexOfFirstItem, indexOfLastItem)

  const startEntry = totalData === 0 ? 0 : indexOfFirstItem + 1
  const endEntry = Math.min(indexOfLastItem, totalData)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleClickDownload = (id, nama) => {
    dispatch(setNamadoc(nama))
    dispatch(downloadKtun(id)).then(result => {
      if (downloadKtun.fulfilled.match(result)) {
        const blob = result.payload
        const fileUrl = URL.createObjectURL(blob)

        // Buka file di tab baru
        const newWindow = window.open()

        if (newWindow) {
          newWindow.document.write(`<iframe src="${fileUrl}" width="100%" height="100%" style="border:none;"></iframe>`)
        } else {
          alert('Popup blocked. Please allow popups for this site.')
        }

        // Optional: revoke URL setelah beberapa saat
        setTimeout(() => {
          URL.revokeObjectURL(fileUrl)
        }, 10000)
      } else {
        alert('Gagal mengunduh file.')
      }
    })
  }

  return (
    <Card>
      <CardContent>
        <CardHeader title={`View Ktun ${view}`} />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell> No KTUN</TableCell>
                <TableCell>Instansi</TableCell>
                <TableCell>Lokasi</TableCell>
                <TableCell>Jenis Kegiatan</TableCell>
                <TableCell>Berlaku</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalData === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align='center'>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>
                      {item.no_ktun}
                      <IconButton color='primary' onClick={() => handleClickDownload(item.ktun_id, item.no_ktun)}>
                        <Icon icon='tabler:download' fontSize={20} />
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.nama_instansi}</TableCell>
                    <TableCell>{item.alamat_instansi}</TableCell>
                    <TableCell>{item.daf_kegiatan?.nama}</TableCell>
                    <TableCell>{item.status_ktun?.nama}</TableCell>
                    <TableCell>{fullDayTime(item.tgl_expired)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
          <Typography color='text.disabled'>
            {`Showing ${startEntry} to ${endEntry} of ${totalData} entries`}
          </Typography>

          <Pagination
            shape='rounded'
            color='primary'
            variant='tonal'
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default Ktun
