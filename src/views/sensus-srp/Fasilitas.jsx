'use client'

import { useState } from 'react'

import Link from 'next/link'

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'

import { useDispatch } from 'react-redux'

import { Icon } from '@iconify/react/dist/iconify.js'

import OptionMenu from '@/@core/components/option-menu'
import { ubahStatusSrp } from '@/redux-store/validasi-data'
import { alamatFas, getStatusFasSumber } from '@/utils/balishelper'

const Fasilitas = ({ dataFasilitas, dataSrp }) => {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10
  const totalData = dataFasilitas.data.length
  const totalPages = Math.ceil(totalData / perPage)

  const indexOfLastItem = currentPage * perPage
  const indexOfFirstItem = indexOfLastItem - perPage
  const currentItems = dataFasilitas.data.slice(indexOfFirstItem, indexOfLastItem)

  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [newStatus, setNewStatus] = useState(null)
  const [keterangan, setKeterangan] = useState('')
  const [loading, setLoading] = useState(false) // opsional

  const handlePageChange = (event, value) => setCurrentPage(value)

  const getStatusText = status => {
    const labelStyle = {
      fontWeight: 'bold',
      color: status === 1 ? 'green' : status === 0 ? 'red' : 'black'
    }

    return <span style={labelStyle}>{status === 1 ? 'diaktifkan' : status === 0 ? 'dinonaktifkan' : 'diubah'}</span>
  }

  const handleChangeStatus = (id, currentStatus) => {
    setSelectedId(id)
    setNewStatus(currentStatus === 1 ? 0 : 1)
    setOpenModal(true)
  }

  const handleSubmitStatusChange = () => {
    if (!keterangan.trim()) {
      alert('Keterangan wajib diisi.')

      return
    }

    setLoading(true)
    dispatch(ubahStatusSrp({ id: selectedId, dataform: { keterangan } })).finally(() => {
      setLoading(false)
      setOpenModal(false)
      setSelectedId(null)
      setNewStatus(null)
      setKeterangan('')
    })
  }

  return (
    <>
      <Card>
        <CardContent>
          <Link
            href={{
              pathname: '/sensus-srp/tambah-instansi',
              query: { id: dataSrp.master_sumber_id, ...dataSrp }
            }}
            passHref
          >
            <Button variant='outlined' color='primary'>
              Tambah Instansi <Icon icon='tabler:plus' fontSize={20} />
            </Button>
          </Link>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Instansi</TableCell>
                  <TableCell>Fasilitas</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Aktif?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalData === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align='center'>
                      Tidak ada data fasilitas
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                      <TableCell>
                        <OptionMenu
                          iconButtonProps={{ size: 'medium' }}
                          iconClassName='text-textSecondary'
                          options={[
                            {
                              text: 'Srp',
                              icon: 'tabler-eye',
                              href: `${item.fas_id}`,
                              linkProps: {
                                className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                              }
                            }
                          ]}
                        />
                      </TableCell>
                      <TableCell>{item.fas?.nama}</TableCell>
                      <TableCell>{alamatFas(item.lokasi)}</TableCell>
                      <TableCell>{getStatusFasSumber(item.stat_aktif)}</TableCell>
                      <TableCell>
                        <Typography variant='body2'>{item.stat_aktif === 1 ? 'Aktif' : 'Non Aktif'}</Typography>
                        <Switch
                          id={`switch-${item.id}`}
                          checked={item.stat_aktif === 1}
                          onChange={() => handleChangeStatus(item.id, item.stat_aktif)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
            <Typography color='text.disabled'>
              {`Menampilkan ${Math.min(indexOfFirstItem + 1, totalData)} - ${Math.min(indexOfLastItem, totalData)} dari ${totalData} entri`}
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

      {/* Modal Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth='sm'>
        <DialogTitle>Sumber pada fasilitas ini akan {getStatusText(newStatus)}. Masukkan keterangan:</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            label='Keterangan'
            value={keterangan}
            onChange={e => setKeterangan(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} disabled={loading}>
            Batal
          </Button>
          <Button onClick={handleSubmitStatusChange} variant='contained' disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Fasilitas
