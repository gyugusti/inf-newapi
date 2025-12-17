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
import { clearValues, deletesyaratItem, getsyaratItem, setEdit } from '@/redux-store/admin-referensi/syarat-item'

function Item() {
  const dispatch = useDispatch()
  const { syaratItem, tab, isLoading } = useSelector(store => store.syaratItem)

  useEffect(() => {
    dispatch(getsyaratItem())
  }, [tab, dispatch])

  const handleEdit = item => {
    dispatch(clearValues())
    dispatch(
      setEdit({
        ...item
      })
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Link
        href={{
          pathname: `form`
        }}
        onClick={() => dispatch(clearValues())}
      >
        <Button variant='tonal'>
          Tambah Syarat <Icon icon='tabler:plus' fontSize={25} />
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell>Urutan</TableCell>
              <TableCell>Nama Syarat</TableCell>
              <TableCell>Kelompok</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {syaratItem.map((item, index) => {
              const { item_id, nama, urutan, syarat_count } = item

              return (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell>{urutan}</TableCell>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{syarat_count}</TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `form`,
                        query: { nama: nama, urutan: urutan }
                      }}
                      onClick={() => handleEdit(item)}
                    >
                      <IconButton color='primary'>
                        <Icon icon='tabler:edit' fontSize={20} />
                      </IconButton>
                    </Link>
                    {syarat_count === 0 && (
                      <IconButton
                        aria-label='capture screenshot'
                        color='error'
                        onClick={() => dispatch(deletesyaratItem(item_id))}
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
    </>
  )
}

export default Item
