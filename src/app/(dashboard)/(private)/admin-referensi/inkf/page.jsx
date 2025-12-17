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

import { clearValues, deleteInkf, getInkf, setEdit } from '@/redux-store/admin-referensi/inkf'

const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Jenis Tabel' }]

const Index = () => {
  const dispatch = useDispatch()
  const { inkf, isLoading, tab } = useSelector(store => store.inkf)

  useEffect(() => {
    dispatch(getInkf())
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
          <Link
            href={{
              pathname: `form`
            }}
            onClick={() => dispatch(clearValues())}
          >
            <Button variant='tonal'>
              Tambah Data <Icon icon='tabler:plus' fontSize={25} />
            </Button>
          </Link>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>No</TableCell>
                  <TableCell>Nama </TableCell>
                  <TableCell>Uraian</TableCell>
                  <TableCell>Bobot</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inkf.map((item, index) => {
                  const { inkf_id, nama, uraian, bobot } = item

                  return (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {index + 1}
                      </TableCell>
                      <TableCell>{nama}</TableCell>
                      <TableCell>{uraian}</TableCell>
                      <TableCell>{bobot}</TableCell>
                      <TableCell>
                        <Link
                          href={{
                            pathname: `form`,
                            query: { nama: nama, uraian: uraian, bobot: bobot }
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
                          onClick={() => dispatch(deleteInkf(inkf_id))}
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
