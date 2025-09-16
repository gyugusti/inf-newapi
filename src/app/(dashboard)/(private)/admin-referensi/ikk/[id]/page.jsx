'use client'
import { useEffect, useState } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'

import {
  Table,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from '@mui/material'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { deleteIkk, getDetailIkk, getIkk, setDetail } from '@/redux-store/admin-referensi/ikk'
import ModalForm from '@/views/admin-referensi/ikk/ModalForm'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'IKK', path: '/admin-referensi/ikk' },
  { name: 'IKK Item' }
]

const IkkInkf = () => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const inkf_id = searchParams.get('inkf_id')
  const nama = searchParams.get('nama')

  const dispatch = useDispatch()

  const [openEdit, setOpenEdit] = useState(false)
  const [dataForm, setDataForm] = useState()
  const { detailIkk, tab } = useSelector(store => store.ikk)

  // Handle Edit dialog
  const handleEditClickOpen = data => {
    setDataForm(data)
    setOpenEdit(true)
  }

  const handleEditClose = () => setOpenEdit(false)

  useEffect(() => {
    // dispatch(getKegiatan())
  }, [dispatch, inkf_id])

  useEffect(() => {
    dispatch(setDetail(inkf_id))
    dispatch(getDetailIkk())
  }, [dispatch, inkf_id, tab])

  const handleCreateOpen = () => {
    const data = { inkf_id: inkf_id, kode: '', uraian: '' }

    setDataForm(data)
    setOpenEdit(true)
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <Button variant='tonal' onClick={handleCreateOpen}>
            Tambah Data <Icon icon='tabler:plus' fontSize={25} />
          </Button>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>NO</TableCell>
                  <TableCell>IKF </TableCell>
                  <TableCell>KODE</TableCell>
                  <TableCell>URAIAN</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailIkk.map((item, index) => {
                  const { ikk_item_id, kode, uraian } = item

                  return (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {index + 1}
                      </TableCell>
                      <TableCell>{nama}</TableCell>
                      <TableCell>{kode}</TableCell>
                      <TableCell>{uraian}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label='capture screenshot'
                          color='primary'
                          onClick={() => handleEditClickOpen(item)}
                        >
                          <Icon icon='tabler:edit' fontSize={20} />
                        </IconButton>
                        <IconButton
                          aria-label='capture screenshot'
                          color='error'
                          onClick={() => dispatch(deleteIkk(ikk_item_id))}
                        >
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {openEdit && <ModalForm data={dataForm} openEdit={openEdit} handleEditClose={handleEditClose} />}
    </>
  )
}

IkkInkf.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default IkkInkf
