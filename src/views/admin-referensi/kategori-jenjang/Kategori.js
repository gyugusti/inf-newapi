import { useEffect } from 'react'

import Link from 'next/link'

import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import { deleteKategori, getkatInspektur } from '@/redux-store/admin-referensi/kategori-jenjang'

function Kategori() {
  const dispatch = useDispatch()
  const { kategoriInsp, current_page, per_page, tab, isLoading } = useSelector(store => store.kategoriJenjang)

  useEffect(() => {
    dispatch(getkatInspektur())
  }, [tab, dispatch])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell>Kat.ID</TableCell>
              <TableCell>Nama Jenjang</TableCell>
              <TableCell>Bidang</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kategoriInsp.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell>{item.insp_kat_id}</TableCell>
                  <TableCell>{item.ins_jenjang?.nama}</TableCell>
                  <TableCell>{item.ins_bidang?.nama}</TableCell>
                  <TableCell>{item.ins_jenjang?.status_id === 1 ? 'Aktif' : 'Non-aktif'} </TableCell>
                  <TableCell>
                    {/* <Link
                      href={{
                        pathname: `kategori-jenjang/create-categori`,
                        query: { insp_kat_id: item.insp_kat_id }
                      }}
                    >
                      <IconButton color='primary'>
                        <Icon icon='tabler:edit' fontSize={20} />
                      </IconButton>
                    </Link> */}
                    {item.ins_riwayat_count === 0 && (
                      <IconButton
                        aria-label='capture screenshot'
                        color='error'
                        onClick={() => dispatch(deleteKategori(item.insp_kat_id))}
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
          pathname: `create-categori`
        }}
      >
        <Button variant='tonal'>
          Tambah Kategori <Icon icon='tabler:plus' fontSize={25} />
        </Button>
      </Link>
    </>
  )
}

export default Kategori
