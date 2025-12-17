'use client'
import { useEffect } from 'react'

import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import {
  clearValues,
  deletelkfJenisTabel,
  getlkfJenisTabel,
  setEdit
} from '@/redux-store/admin-referensi/lkf-jenis-tabel'

const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Jenis Tabel' }]

const Index = () => {
  const dispatch = useDispatch()
  const { jenisTabel, isLoading, tab } = useSelector(store => store.lkfJenisTabel)

  useEffect(() => {
    dispatch(getlkfJenisTabel())
  }, [dispatch, tab])

  const handleEdit = item => {
    dispatch(
      setEdit({
        ...item
      })
    )
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <Link href='/admin-referensi/lkf-jenis-tabel/form' onClick={() => dispatch(clearValues())}>
            <Button variant='tonal'>
              Tambah Table <Icon icon='tabler:plus' fontSize={25} />
            </Button>
          </Link>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>No</TableCell>
                  <TableCell>Nama Tabel</TableCell>
                  <TableCell>Keterangan</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jenisTabel.map((item, index) => {
                  const { jenis_tabel_id, nama_tabel, keterangan } = item

                  return (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {index + 1}
                      </TableCell>
                      <TableCell>{nama_tabel}</TableCell>
                      <TableCell>{keterangan}</TableCell>
                      <TableCell>
                        <Link
                          href={{
                            pathname: `form`
                          }}
                          onClick={() => handleEdit(item)}
                        >
                          <IconButton aria-label='capture screenshot' color='primary'>
                            <Icon icon='tabler:edit' fontSize={20} />
                          </IconButton>
                        </Link>
                        <IconButton
                          aria-label='capture screenshot'
                          color='error'
                          onClick={() => dispatch(deletelkfJenisTabel(jenis_tabel_id))}
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
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default Index
