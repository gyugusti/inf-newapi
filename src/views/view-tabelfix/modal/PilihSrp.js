import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  Pagination,
  useColorScheme
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useSession } from 'next-auth/react'

import CustomDialog from '@/components/widget/CustomDialog'
import { getLkfSumber, changePageSrp, handleChangeSrp, createLkfSumber, setFasilitas } from '@/redux-store/lkf/dataLkf'
import Loading from '@/components/Loading'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import SearchSumber from '@/views/lvkf/frontend/SearchSumber'
import { setTab } from '@/redux-store/lkf'
import { useSettings } from '@/@core/hooks/useSettings'

const PilihSrp = ({ data, open, handleClose }) => {
  const [edit, setEdit] = useState()
  const bgColors = useSettings()
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [selectedRows, setSelectedRows] = useState([])
  const fas_id = session?.user?.fas_id

  const { sumberLkf, isLoadingSrp, numOfPagesSrp, totalSrp, current_pageSrp, per_page, searchSrp } = useSelector(
    store => store.dataLkf
  )

  const indexOfLastItem = current_pageSrp * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePageSrp(value))
  }

  useEffect(() => {
    dispatch(setFasilitas(fas_id))
    dispatch(getLkfSumber())
  }, [dispatch, current_pageSrp, fas_id, searchSrp])

  const handleRowCheckboxChange = rowId => {
    const selectedIndex = selectedRows.indexOf(rowId)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, rowId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1))
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1))
    }

    setSelectedRows(newSelected)
  }

  const handleCheckboxClick = (event, rowId, onChange) => {
    event.stopPropagation()
    handleRowCheckboxChange(rowId)
    onChange(selectedRows.includes(rowId) ? selectedRows.filter(id => id !== rowId) : [...selectedRows, rowId])
  }

  const defaultValues = {
    pilih: []
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = datacheck => {
    if (datacheck) {
      const dataform = {
        lkf_id: data.lkf_id,
        sumber: datacheck.pilih
      }

      if (edit) {
      } else {
        dispatch(createLkfSumber(dataform))
      }

      dispatch(setTab(datacheck))
      handleClose()
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Tambah Data Sumber' maxWidth='lg'>
      {/* Dialog content */}
      {isLoadingSrp ? (
        <Loading />
      ) : (
        <Fragment>
          <SearchSumber />
          <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow sx={{ backgroundColor: bgColors.primaryColor }}>
                    <TableCell component='th'>NO</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Tipe </TableCell>
                    <TableCell>No Seri</TableCell>
                    <TableCell>Aktivitas</TableCell>
                    <TableCell>Kv / Ma</TableCell>

                    <TableCell>Action </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sumberLkf.map((item, index) => {
                    const { id } = item

                    return (
                      <Fragment key={index}>
                        <TableRow key={index}>
                          <TableCell>{indexOfFirstItem + index + 1}</TableCell>

                          <TableCell>
                            {item.master_sumber.nama} <br /> {id}
                          </TableCell>
                          <TableCell>{item.master_sumber.tipe}</TableCell>
                          <TableCell>{item.master_sumber.no_seri}</TableCell>
                          <TableCell>
                            {item.master_sumber.aktivitas} {item.master_sumber.satuan_id} /
                            {item.master_sumber.tgl_aktivitas}
                          </TableCell>
                          <TableCell>
                            {item.master_sumber.kv} / {item.master_sumber.ma}
                          </TableCell>
                          <TableCell padding='checkbox'>
                            <Controller
                              name='pilih'
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <Checkbox
                                  className='row'
                                  name='pilih'
                                  value={id}
                                  checked={selectedRows.includes(id)}
                                  onChange={e => handleCheckboxClick(e, id, onChange)}
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination color='primary' count={numOfPagesSrp} page={current_pageSrp} onChange={handlePageChange} />

            {/* Dialog actions */}
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Fragment>
      )}
      {/* end Dialog content */}
    </CustomDialog>
  )
}

export default PilihSrp
