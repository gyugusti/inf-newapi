import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'

import Pagination from '@mui/material/Pagination'

import { changePage, getKegiatan } from '@/redux-store/admin-referensi/kelompok-kegiatan'
import ModalEdit from './ModalEdit'
import SearchContainer from './kelompok-kegiatan/SearchContainer'
import Loading from '@/components/Loading'

function KegiatanContainer() {
  const dispatch = useDispatch()

  const { kegiatan, current_page, per_page, numOfPages, tab, bidang_id, kelompok_id } = useSelector(
    store => store.kelKegiatan
  )

  const [openEdit, setOpenEdit] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  const handleEditClickOpen = data => {
    setDataForm(data)
    setOpenEdit(true)
  }

  const handleEditClose = () => setOpenEdit(false)

  useEffect(() => {
    dispatch(getKegiatan())
  }, [dispatch, current_page, tab, bidang_id, kelompok_id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <SearchContainer />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell>Kel.ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Bidang</TableCell>
              <TableCell>Kelompok</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kegiatan.map((item, index) => {
              const { kegiatan_id, nama } = item

              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>{kegiatan_id}</TableCell>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{item.bidang?.nama}</TableCell>
                  <TableCell>{item.kel_kegiatan?.nama}</TableCell>
                  <TableCell>
                    <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleEditClickOpen(item)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
      {openEdit && <ModalEdit data={dataForm} openEdit={openEdit} handleEditClose={handleEditClose} />}
    </>
  )
}

export default KegiatanContainer
