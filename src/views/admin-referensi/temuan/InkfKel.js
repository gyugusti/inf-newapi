// ** MUI Imports
import { Fragment, useEffect } from 'react'

import Link from 'next/link'

import { useParams, useSearchParams } from 'next/navigation'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Icon } from '@iconify/react/dist/iconify.js'


import { useDispatch, useSelector } from 'react-redux'

import TemuanItem from './TemuanItem'
import { getTemuanKel, getTemuanLib } from '@/redux-store/admin-referensi/temuan'


const columns = [
  { field: 'index', headerName: 'No.', width: 80 },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'nama',
    headerName: 'Nama'
  }
]

const InkfKel = prop => {
  const dispatch = useDispatch()
  const params = useParams()
  const searchParams = useSearchParams()

  const kelompok_id = params.kelompok_id

  const { temuanKel, temuanLib } = useSelector(store => store.temuan)

  useEffect(() => {
    dispatch(getTemuanKel(kelompok_id))
  }, [dispatch, kelompok_id])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell colSpan={3}>Nama</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {temuanKel.map((item, index) => {
              const { inkf_id, inkf, temuan } = item
              const itemLib = temuan

              return (
                <Fragment key={index}>
                  <TableRow key={index}>
                    <TableCell component='th'>
                      <b>{index + 1}</b>
                    </TableCell>
                    <TableCell component='th' colSpan={3}>
                      <b>{inkf}</b>
                    </TableCell>
                  </TableRow>
                  {itemLib && <TemuanItem itemLib={itemLib} view='kelompok' inkf_id={inkf_id} />}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default InkfKel
