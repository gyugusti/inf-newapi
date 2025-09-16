import React, { useEffect } from 'react'

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import {
  clearValues,
  deleteJenjang,
  getjenInspektur,
  setEditJenjang
} from '@/redux-store/admin-referensi/kategori-jenjang'
import Loading from '@/components/Loading'

function Jenjang() {
  const dispatch = useDispatch()
  const { jenjangInsp, current_page, per_page, tab, isLoading } = useSelector(store => store.kategoriJenjang)

  useEffect(() => {
    dispatch(getjenInspektur())
  }, [dispatch, tab])

  if (isLoading) {
    return <Loading />
  }

  const handleEditJenjang = item => {
    dispatch(clearValues())
    dispatch(
      setEditJenjang({
        ...item
      })
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell>Jenjang.ID</TableCell>
              <TableCell>Jenjang</TableCell>
              <TableCell>jenjang Tahun</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Urut</TableCell>
              <TableCell>Is Inspektur</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jenjangInsp.map((item, index) => {
              const { insp_jenjang_id, nama, ket_jenjang, urutan, tahun, status_id, is_inspektur } = item

              return (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell>{insp_jenjang_id}</TableCell>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{ket_jenjang}</TableCell>
                  <TableCell>{status_id === 1 ? 'Aktif' : 'Non-aktif'} </TableCell>
                  <TableCell>{urutan}</TableCell>
                  <TableCell>{is_inspektur === 1 ? 'Ya' : 'Tidak'} </TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `kategori-jenjang/create-jenjang`,
                        query: item
                      }}
                      onClick={() => handleEditJenjang(item)}
                    >
                      <Icon icon='tabler:edit' fontSize={20} />
                    </Link>

                    {item.ins_kategori_count === 0 && (
                      <IconButton
                        aria-label='capture screenshot'
                        color='error'
                        onClick={() => dispatch(deleteJenjang(insp_jenjang_id))}
                      >
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Link
        href={{
          pathname: `kategori-jenjang/create-jenjang`
        }}
      >
        <Button variant='tonal'>
          Tambah Jenjang <Icon icon='tabler:plus' fontSize={25} />
        </Button>
      </Link>
    </>
  )
}

export default Jenjang
