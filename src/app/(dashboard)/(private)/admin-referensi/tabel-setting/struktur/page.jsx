'use client'
import React, { Fragment, useEffect, useState } from 'react'

import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'

import { Table, IconButton, Paper, TableHead, TableRow, CardContent, CardHeader, Card, Button } from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'


import { deleteStruktur, getStruktur, getTabelHeader, getTipeKolom } from '@/redux-store/admin-referensi/tabel-setting'
import Loading from '@/components/Loading'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import ModalStruktur from '@/views/admin-referensi/tabel-setting/ModalStruktur'
import ContohForm from '@/views/admin-referensi/tabel-setting/ContohForm'

const StrukturIndex = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const searchParams = useSearchParams()

  const [openEdit, setOpenEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()
  const inkf_id = searchParams.get('inkf_id')
  const tabel_id = searchParams.get('tabel_id')
  const nama = searchParams.get('nama')

  const breadcrumbs = [
    { name: 'Referensi', path: '/admin-referensi' },
    { name: 'Tabel Setting', path: '/admin-referensi/tabel-setting' },
    { name: 'Library Tabel', path: `/admin-referensi/tabel-setting/inkf/?inkf_id=${inkf_id}` },
    { name: 'Struktur Tabel' }
  ]

  const { strukturTabel, tabelHeader, tipeKolom, isLoading, tab } = useSelector(store => store.tabel)

  useEffect(() => {
    dispatch(getStruktur(tabel_id))
    dispatch(getTabelHeader(tabel_id))
    dispatch(getTipeKolom())
  }, [dispatch, tabel_id, tab])

  if (isLoading || !strukturTabel || strukturTabel.length === 0) {
    return <Loading />
  }

  const handleEditClose = () => setOpenEdit(false)
  const handleClose = () => setOpen(false)

  const handleCreateOpen = () => {
    const data = { inkf_id: inkf_id, tabel_id: tabel_id, kode: '', uraian: '' }

    setDataForm(data)
    setOpenEdit(true)
  }

  // Handle Edit dialog
  const handleEditClickOpen = data => {
    const datas = { ...data, inkf_id: inkf_id, tabel_id: Number(tabel_id) }

    setDataForm(datas)
    setOpenEdit(true)
  }

  const handleClickOpen = () => {
    const datas = { inkf_id: inkf_id, tabel_id: Number(tabel_id), nama: nama }

    setDataForm(datas)
    setOpen(true)
  }

  return (
    <Fragment>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader
          title={`Struktur Tabel ${nama}`}
          sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
          action={
            <div>
              <Button variant='tonal' color='success' onClick={handleCreateOpen}>
                Buat Struktur Tabel <Icon icon='tabler:plus' fontSize={25} />
              </Button>
              &nbsp;
              <Button variant='tonal' onClick={handleClickOpen}>
                Contoh Form <Icon icon='tabler:plus' fontSize={25} />
              </Button>
            </div>
          }
        />
        <CardContent>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell component='th' rowSpan={2}>
                  NO
                </StyledTableCell>
                {strukturTabel.map((rows, index) => {
                  const { kolom_count, nama, header_id } = rows
                  let rowspan = kolom_count === 1 ? 2 : ''

                  return (
                    <StyledTableCell key={index} rowSpan={rowspan} colSpan={kolom_count - 1}>
                      {nama} - {header_id}
                      <IconButton
                        aria-label='capture screenshot'
                        color='primary'
                        onClick={() => handleEditClickOpen({ ...rows.kolom[0], tabel: 'header' })}
                      >
                        <Icon icon='tabler:edit' fontSize={20} />
                      </IconButton>
                      <IconButton
                        aria-label='capture screenshot'
                        color='error'
                        onClick={() => dispatch(deleteStruktur({ id: header_id, tabel: 'header' }))}
                      >
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </StyledTableCell>
                  )
                })}
              </StyledTableRow>
              <StyledTableRow>
                {strukturTabel.map((item, index) => {
                  const { kolom, kolom_count, header_id } = item // Destructure kolom array from item

                  const itemData = kolom.filter(a => a.header_id === Number(header_id) && a.label !== item.label)

                  if (kolom_count > 1) {
                    return itemData.map((prop, index) => (
                      <StyledTableCell key={prop.kolom_id}>
                        {prop.label}
                        <IconButton
                          aria-label='capture screenshot'
                          color='primary'
                          onClick={() => handleEditClickOpen(prop)}
                        >
                          <Icon icon='tabler:edit' fontSize={20} />
                        </IconButton>
                        <IconButton
                          aria-label='capture screenshot'
                          color='error'
                          onClick={() => dispatch(deleteStruktur({ id: prop.kolom_id, tabel: 'kolom' }))}
                        >
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </StyledTableCell>
                    ))
                  }
                })}
              </StyledTableRow>
              <TableRow>
                <StyledTableCell>1</StyledTableCell>
                {strukturTabel.map((item, index) => {
                  const { kolom, kolom_count, header_id, label } = item // Destructure kolom array from item

                  const itemData = kolom.filter(a => a.header_id === Number(header_id) && a.label !== item.label) // Filter data based on condition

                  if (kolom_count > 1) {
                    return itemData.map((prop, index) => (
                      <StyledTableCell key={prop.kolom_id}>data disini {prop.label}</StyledTableCell>
                    ))
                  }
                })}

                {strukturTabel.map((item, index) => {
                  const { kolom, kolom_count, header_id, label } = item // Destructure kolom array from item

                  const itemData = kolom.filter(a => a.header_id === Number(header_id)) // Filter data based on condition

                  if (kolom_count === 1) {
                    return itemData.map((prop, index) => (
                      <StyledTableCell key={prop.kolom_id}>data disini {prop.label}</StyledTableCell>
                    ))
                  }
                })}
              </TableRow>
            </TableHead>
          </Table>
        </CardContent>
      </Card>
      {openEdit && (
        <ModalStruktur
          tipeKolom={tipeKolom}
          tabelHeader={tabelHeader}
          data={dataForm}
          openEdit={openEdit}
          handleEditClose={handleEditClose}
        />
      )}
      {open && (
        <ContohForm
          tipeKolom={tipeKolom}
          tabelHeader={tabelHeader}
          data={dataForm}
          strukturTabel={strukturTabel}
          open={open}
          handleClose={handleClose}
        />
      )}
    </Fragment>
  )
}

export default StrukturIndex
