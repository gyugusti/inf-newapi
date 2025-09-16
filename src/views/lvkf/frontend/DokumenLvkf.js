import { Fragment, useEffect, useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Pagination,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useSession } from 'next-auth/react'

import CustomTextField from '@/@core/components/mui/TextField'
import { useSettings } from '@/@core/hooks/useSettings'
import Loading from '@/components/Loading'
import { changePage, createLkfDok, getlkfDok, handleChangeSrp, setFasilitas } from '@/redux-store/lkf/dataLkf'

const DokumenLvkf = ({ data, inkf_id, open, handleClose }) => {
  const dispatch = useDispatch()
  const bgColors = useSettings()
  const { data: session } = useSession()

  const [selectedRows, setSelectedRows] = useState([])
  const [isModal2Open, setIsModal2Open] = useState(false) // Control state for Modal2
  const [searchValue, setSearchValue] = useState('')

  const fas_id = session?.user?.fas_id

  const { dokumenLkf, isLoading, numOfPages, total, current_page, per_page, searchDoc } = useSelector(
    store => store.dataLkf
  )

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(setFasilitas(fas_id))
    dispatch(getlkfDok())
  }, [dispatch, current_page, fas_id, searchDoc])

  const handleSearch = () => {
    dispatch(handleChangeSrp({ name: 'searchDoc', value: searchValue }))
  }

  const handleResetSearch = () => {
    setSearchValue('')
    dispatch(handleChangeSrp({ name: 'searchDoc', value: '' }))
  }

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
      // Your submit logic here
      const dataform = {
        inkf_id: inkf_id,
        dokumen: datacheck.pilih
      }

      dispatch(createLkfDok({ id: data.lkf_id, dataform }))

      //dispatch(setTab(datacheck))
      handleClose()
    }
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
      >
        <DialogTitle
          id='user-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.2rem !important'
          }}
        >
          Pilih Dokumen
        </DialogTitle>
        <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {isLoading ? (
              <Loading />
            ) : (
              <Fragment>
                <Button type='submit' style={{ float: 'right' }} variant='contained' sx={{ mr: 4 }}>
                  Submit
                </Button>
                <br />
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <CustomTextField
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder='search..'
                  />
                  <Button variant='contained' onClick={handleSearch}>
                    cari
                  </Button>
                  <Button variant='tonal' color='primary' onClick={handleResetSearch}>
                    Reset
                  </Button>
                </div>
                <TableContainer aria-label='simple table'>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: bgColors.primaryColor }}>
                      <TableCell></TableCell>
                      <TableCell component='th'>NO</TableCell>
                      <TableCell>Nama</TableCell>
                      <TableCell>Uraian File </TableCell>
                      <TableCell>... </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dokumenLkf.map((item, index) => {
                      const { dok_file_id } = item

                      return (
                        <Fragment key={index}>
                          <TableRow key={index}>
                            <TableCell padding='checkbox'>
                              <Controller
                                name='pilih'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <Checkbox
                                    className='row'
                                    name='pilih'
                                    value={dok_file_id}
                                    checked={selectedRows.includes(dok_file_id)}
                                    onChange={e => handleCheckboxClick(e, dok_file_id, onChange)}
                                  />
                                )}
                              />
                            </TableCell>
                            <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                            <TableCell>{item.nama_file}</TableCell>
                            <TableCell>{item.uraian_file}</TableCell>
                            <TableCell>
                              <Icon icon='tabler:download' fontSize={20} />
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      )
                    })}
                  </TableBody>
                </TableContainer>
                <Pagination color='primary' count={numOfPages} page={current_page} onChange={handlePageChange} />
              </Fragment>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default DokumenLvkf
