'use client'
import React, { Fragment, useEffect, useState } from 'react'

import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  Table,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  CardContent,
  CardHeader,
  Card,
  Button
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'


import { getDetailInkf, getInkf, setDetail } from '@/redux-store/admin-referensi/inkf'
import Loading from '@/components/Loading'
import ModalDinamis from '@/views/admin-referensi/tabel-setting/ModalDinamis'
import { deleteInkfTabel, deleteLfkLib, getJenisTabel } from '@/redux-store/admin-referensi/tabel-setting'
import ModalFix from '@/views/admin-referensi/tabel-setting/ModalFix'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'Tabel Setting', path: '/admin-referensi/tabel-setting' },
  { name: 'Library Tabel' }
]

const InkfTabel = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const nama = searchParams.get('nama')
  const inkf_id = searchParams.get('inkf_id')

  const dispatch = useDispatch()
  const { detailInkf, isLoading, inkf } = useSelector(store => store.inkf)
  const { tab, jenisTabel } = useSelector(store => store.tabel)

  useEffect(() => {
    dispatch(setDetail(inkf_id))
    dispatch(getDetailInkf())
    dispatch(getInkf())
  }, [dispatch, inkf_id, tab])

  useEffect(() => {
    dispatch(getJenisTabel())
  }, [dispatch])

  const [openEdit, setOpenEdit] = useState(false)
  const [openFix, setOpenFix] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [dataFormfix, setDataFormfix] = useState()

  // Handle Edit dialog
  const handleEditClickOpen = data => {
    setDataForm(data)
    setOpenEdit(true)
  }

  const handleCreateOpen = () => {
    const data = { inkf_id: inkf_id, kode: '', uraian: '' }

    setDataForm(data)
    setOpenEdit(true)
  }

  const handleEditClose = () => setOpenEdit(false)

  const handleEditClickFix = data => {
    setDataFormfix(data)
    setOpenFix(true)
  }

  const handleCreateOpenFix = () => {
    const data = { inkf_id: inkf_id, kode: '', uraian: '' }

    setDataFormfix(data)
    setOpenFix(true)
  }

  const handleEditCloseFix = () => setOpenFix(false)

  if (isLoading || !detailInkf || detailInkf.length === 0) {
    return <Loading />
  } else {
    return (
      <Fragment>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        <Card>
          <CardHeader
            title={nama}
            sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
            action={
              <div>
                <Button variant='tonal' color='success' onClick={handleCreateOpen}>
                  Tabel Dinamis <Icon icon='tabler:plus' fontSize={25} />
                </Button>
                &nbsp;
                <Button variant='tonal' onClick={handleCreateOpenFix}>
                  Tabel Fix <Icon icon='tabler:plus' fontSize={25} />
                </Button>
              </div>
            }
          />
          <CardContent>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>NO</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Uraian</TableCell>
                  <TableCell>Jenis Tabel</TableCell>
                  <TableCell>Keterangan </TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailInkf.inkf_tabel.map((row, index) => {
                  const { nama, uraian, keterangan, tabel_id } = row

                  return (
                    <TableRow key={index}>
                      <TableCell scope='row'>{index + 1}</TableCell>
                      <TableCell>{nama}</TableCell>
                      <TableCell>{uraian}</TableCell>
                      <TableCell>Tabel Dinamis</TableCell>
                      <TableCell>{keterangan}</TableCell>
                      <TableCell>
                        <IconButton aria-label='capture screenshot' color='primary'>
                          <Link
                            href={{
                              pathname: `/admin-referensi/tabel-setting/struktur`,
                              query: { tabel_id: tabel_id, inkf_id: inkf_id, nama: nama }
                            }}
                          >
                            <Icon icon='tabler:settings' fontSize={20} />
                          </Link>
                        </IconButton>
                        <IconButton
                          aria-label='capture screenshot'
                          color='primary'
                          onClick={() => handleEditClickOpen(row)}
                        >
                          <Icon icon='tabler:edit' fontSize={20} />
                        </IconButton>
                        <IconButton
                          aria-label='capture screenshot'
                          color='error'
                          onClick={() => dispatch(deleteInkfTabel(tabel_id))}
                        >
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {detailInkf.lkf_lib.map((fix, index) => {
                  const { nama, uraian, keterangan, lkf_lib_id } = fix
                  const data = detailInkf.inkf_tabel

                  return (
                    <TableRow key={index}>
                      <TableCell scope='row'>{data.length + index + 1}</TableCell>
                      <TableCell>{nama}</TableCell>
                      <TableCell>{uraian}</TableCell>
                      <TableCell>Tabel Fix</TableCell>
                      <TableCell>{keterangan}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label='capture screenshot'
                          color='primary'
                          onClick={() => handleEditClickFix(fix)}
                        >
                          <Icon icon='tabler:edit' fontSize={20} />
                        </IconButton>
                        <IconButton
                          aria-label='capture screenshot'
                          color='error'
                          onClick={() => dispatch(deleteLfkLib(lkf_lib_id))}
                        >
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {openEdit && <ModalDinamis data={dataForm} inkf={inkf} openEdit={openEdit} handleEditClose={handleEditClose} />}
        {openFix && (
          <ModalFix
            data={dataFormfix}
            inkf={inkf}
            jenisTabel={jenisTabel}
            inkf_id={inkf_id}
            openEdit={openFix}
            handleEditClose={handleEditCloseFix}
          />
        )}
      </Fragment>
    )
  }
}

InkfTabel.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default InkfTabel
