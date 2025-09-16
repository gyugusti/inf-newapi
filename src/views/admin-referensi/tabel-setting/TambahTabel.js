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
import Grid from '@mui/material/Grid2'

import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import { getInkf } from '@/redux-store/admin-referensi/inkf'
import FormAdd from './FormAdd'
import FormDinamis from './FormDinamis'
import { createTabel } from '@/redux-store/admin-referensi/tabel-setting'

const TambahTabel = prop => {
  const router = useRouter()
  const dispatch = useDispatch()
  const kelompok_id = prop.kelompok_id

  const { inkf, isLoading, tab } = useSelector(store => store.inkf)

  useEffect(() => {
    dispatch(getInkf())
  }, [dispatch])

  const handleSubmit = e => {
    e.preventDefault()

    const rowValues = []
    const rowDina = []
    const rowUrutan = []
    const rowUrutanDina = []
    const rowGroup = document.querySelectorAll('#loop .row')

    rowGroup.forEach(row => {
      const checkboxValues = []
      const checkboxDina = []
      const urutanVal = []
      const urutandinaVal = []

      const checkboxGroup = row.querySelectorAll('input[type="checkbox"]')

      checkboxGroup.forEach(checkbox => {
        if (checkbox.name === 'fix') {
          if (checkbox.checked) {
            var urutan = document.getElementById('urutan' + checkbox.value).value

            urutanVal.push(urutan)
            checkboxValues.push(checkbox.value)
          }
        }

        if (checkbox.name === 'dina') {
          if (checkbox.checked) {
            var urutandina = document.getElementById('urutan_dina' + checkbox.value).value

            urutandinaVal.push(urutandina)

            checkboxDina.push(checkbox.value)
          }
        }
      })

      rowValues.push({
        checkboxValues
      })

      rowDina.push({
        checkboxDina
      })

      rowUrutan.push({
        urutanVal
      })

      rowUrutanDina.push({
        urutandinaVal
      })
    })

    const nonEmptyObjects = rowValues.filter(obj => obj.checkboxValues.length > 0)
    var newArray = []

    nonEmptyObjects.forEach(function (obj) {
      newArray.push(obj.checkboxValues[0])
    })

    const nonEmptyDina = rowDina.filter(obj => obj.checkboxDina.length > 0)
    var newArrayDina = []

    nonEmptyDina.forEach(function (obj) {
      newArrayDina.push(obj.checkboxDina[0])
    })

    const nonEmptyUrutan = rowUrutan.filter(obj => obj.urutanVal.length > 0)
    var newUrutan = []

    nonEmptyUrutan.forEach(function (obj) {
      newUrutan.push(obj.urutanVal[0])
    })

    const nonUrutanDina = rowUrutanDina.filter(obj => obj.urutandinaVal.length > 0)
    var newUrutanDina = []

    nonUrutanDina.forEach(function (obj) {
      newUrutanDina.push(obj.urutandinaVal[0])
    })

    dispatch(
      createTabel({
        kelompok_id: kelompok_id,
        tabel_fix: newArray,
        urut_fix: newUrutan,
        tabel_dinamis: newArrayDina,
        urut_dinamis: newUrutanDina
      })
    )

    router.push(
      `/admin-referensi/tabel-setting/${kelompok_id}?kelompok_id=${kelompok_id}&nama=${encodeURIComponent(prop.nama)}&edited=true`
    )
  }

  return (
    <>
      <form id='myForm' onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 6, md: 12, sm: 8 }}>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>

        <div id='loop'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>No</TableCell>
                  <TableCell colSpan={5}>Nama</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prop.tabelKel.map((item, index) => {
                  const { inkf_id, nama, inkf_tabel_kel, lkf_lib_keg } = item
                  const tabelItem = inkf.filter(rows => rows.inkf_id === inkf_id)

                  return (
                    <Fragment key={index}>
                      <TableRow key={index}>
                        <TableCell component='th'>
                          <b>{index + 1}</b>
                        </TableCell>
                        <TableCell component='th' colSpan={5}>
                          <b>{nama}</b>
                        </TableCell>
                      </TableRow>
                      {tabelItem.length > 0 && (
                        <FormAdd tabelItem={tabelItem} inkf_tabel_kel={inkf_tabel_kel} inkf_id={inkf_id} />
                      )}
                      {tabelItem.length > 0 && (
                        <FormDinamis tabelItem={tabelItem} lkf_lib_keg={lkf_lib_keg} inkf_id={inkf_id} />
                      )}
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

export default TambahTabel
