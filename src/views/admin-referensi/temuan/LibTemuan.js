// ** MUI Imports
import { Fragment, useEffect } from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Icon } from '@iconify/react/dist/iconify.js'


import { useDispatch, useSelector } from 'react-redux'

import { getInkf } from '@/redux-store/admin-referensi/inkf'
import TemuanItem from './TemuanItem'
import { getTemuanLib } from '@/redux-store/admin-referensi/temuan'

const LibTemuan = () => {
  const dispatch = useDispatch()

  const { inkf, isLoading, tab } = useSelector(store => store.inkf)
  const { temuanLib } = useSelector(store => store.temuan)

  const rowsWithIds = inkf.map((row, index) => ({ nama: row.nama, id: row.inkf_id, index: index + 1 }))

  useEffect(() => {
    dispatch(getInkf())
    dispatch(getTemuanLib())
  }, [dispatch])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell colSpan={3}>Nama</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inkf.map((item, index) => {
              const { inkf_id, nama } = item
              const itemLib = temuanLib.filter(rows => rows.inkf_id === inkf_id)

              return (
                <Fragment key={index}>
                  <TableRow key={index}>
                    <TableCell component='th'>
                      <b>{index + 1}</b>
                    </TableCell>
                    <TableCell component='th' colSpan={2}>
                      <b>{nama}</b>
                    </TableCell>
                    <TableCell component='th'>
                      {item.name}
                      <Link
                        href={{
                          pathname: `/admin-referensi/temuan/inkf`,
                          query: { inkf_id: inkf_id, nama: nama }
                        }}
                      >
                        <Icon icon='tabler:settings' fontSize={20} />
                      </Link>
                    </TableCell>
                  </TableRow>
                  {itemLib && <TemuanItem itemLib={itemLib} inkf_id={inkf_id} />}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default LibTemuan
