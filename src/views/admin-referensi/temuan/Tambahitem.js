// ** MUI Imports
import { Fragment, useEffect } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react/dist/iconify.js'


import { useDispatch, useSelector } from 'react-redux'

import TemuanItem from './TemuanItem'
import { createTemuan, getTemuanCreate } from '@/redux-store/admin-referensi/temuan'
import TemuanTambah from './TemuanTambah'


import Loading from '@/components/Loading'

const Tambahitem = prop => {
  const router = useRouter()
  const dispatch = useDispatch()
  const kelompok_id = prop.kelompok_id
  const { temuanCreate, isLoading } = useSelector(store => store.temuan)

  useEffect(() => {
    dispatch(getTemuanCreate(kelompok_id))
  }, [dispatch, kelompok_id])

  const handleSubmit = e => {
    e.preventDefault()

    const rowValues = []
    const rowGroup = document.querySelectorAll('#loop .row')

    rowGroup.forEach(row => {
      const checkboxValues = []
      const checkboxGroup = row.querySelectorAll('input[type="checkbox"]')

      checkboxGroup.forEach(checkbox => {
        if (checkbox.checked) {
          checkboxValues.push(checkbox.value)
        }
      })

      rowValues.push({
        checkboxValues
      })
    })

    const nonEmptyObjects = rowValues.filter(obj => obj.checkboxValues.length > 0)
    var newArray = []

    nonEmptyObjects.forEach(function (obj) {
      newArray.push(obj.checkboxValues[0])
    })

    dispatch(createTemuan({ kelompok_id: kelompok_id, temuan_id: newArray }))
    router.push({
      pathname: `/admin-referensi/temuan/${kelompok_id}`,
      query: { kelompok_id: kelompok_id, nama: prop.nama }
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <form id='myForm' onSubmit={handleSubmit}>
        <Button variant='contained' type='submit'>
          Submit
        </Button>

        <div id='loop'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>No</TableCell>
                  <TableCell colSpan={3}>Nama</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {temuanCreate.map((item, index) => {
                  const { inkf_id, inkf, temuan } = item

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
                      {temuan && <TemuanTambah itemLib={temuan} view='kelompok' inkf_id={inkf_id} />}
                    </Fragment>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </form>
    </>
  )
}

export default Tambahitem
