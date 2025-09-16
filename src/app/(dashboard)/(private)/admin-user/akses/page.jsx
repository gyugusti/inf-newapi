'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Pagination from '@mui/material/Pagination'

import { Button, IconButton } from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import Loading from '@/components/Loading'
import { changePage, getRoleInspeksi } from '@/redux-store/admin-user'
import OptionMenu from '@/@core/components/option-menu'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import FormAkses from '@/views/admin-user/FormAkses'

function Index() {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleClose = () => setOpen(false)

  const handleFormOpen = () => {
    setDataForm()
    setOpen(true)
  }

  const handleDeleteClick = id => {
    setDataId(id)
    setShowConfirmationDel(true)
  }

  const { roleInspeksi, numOfPages, current_page, per_page, tab, isLoading } = useSelector(store => store.akun)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(getRoleInspeksi()) // Only dispatch if tokens are valid
  }, [tab, current_page, dispatch])

  if (isLoading) {
    return <Loading />
  }

  const breadcrumbs = [{ name: 'Referensi', path: '/admin-user' }, { name: 'Akun Bapeten' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Button variant='contained' size='medium' onClick={() => handleFormOpen()}>
        <Icon icon='tabler:plus' /> Tambah Hak Akses
      </Button>
      {open && <FormAkses data={dataForm} edit={edit} open={open} handleClose={handleClose} />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Akses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleInspeksi.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <IconButton color='primary' onClick={() => handleDeleteClick(item)}>
                      <Icon icon='tabler:trash' fontSize={20} />
                    </IconButton>
                  </TableCell>
                  <TableCell>{item.nama}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
    </>
  )
}

export default Index
