import { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Checkbox,
  Pagination,
  useColorScheme
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import CustomDialog from '@/components/widget/CustomDialog'
import { setFasilitas, getLkfDosis, changePage, createLkfDosis } from '@/redux-store/lkf/dataLkf'
import { setTab } from '@/redux-store/lkf'
import Loading from '@/components/Loading'
import SearchSumber from '@/views/lvkf/frontend/SearchSumber'
import FormTldLkf from './FormTldLkf'
import FormStoreTld from './FormStoreTld'
import { useSettings } from '@/@core/hooks/useSettings'

const PilihTld = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()
  const bgColors = useSettings()
  const { data: session } = useSession()
  const [selectedRows, setSelectedRows] = useState([])
  const [isModal2Open, setIsModal2Open] = useState(false) // Control state for Modal2
  const [dataLkf, setDataLkf] = useState()

  const fas_id = session?.user?.fas_id

  const { dosisLkf, isLoading, numOfPages, total, current_page, per_page, search } = useSelector(store => store.dataLkf)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(setFasilitas(fas_id))
    dispatch(getLkfDosis())
  }, [dispatch, current_page, fas_id, search])

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
        lkf_id: data.lkf_id,
        pekerja: datacheck.pilih
      }

      dispatch(createLkfDosis(dataform))
      dispatch(setTab(datacheck))
      handleClose()
    }
  }

  const handleModal2Open = () => setIsModal2Open(true) // Open Modal2

  const handleModal2Close = () => {
    setIsModal2Open(false)
    handleClose(true)
  }

  return (
    <Fragment>
      <CustomDialog
        open={open && !isModal2Open} // Show Modal1 only if Modal2 is not open
        handleClose={handleClose}
        title='Data TLD'
        maxWidth='lg'
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <SearchSumber />
            <Button variant='tonal' color='error' size='small' onClick={handleModal2Open}>
              <Icon icon='tabler:rotate-rectangle' fontSize={15} />
              Tambah Data Baru
            </Button>

            <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
              <Button type='submit' style={{ float: 'right' }} variant='contained' sx={{ mr: 4 }}>
                Submit
              </Button>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: bgColors.primaryColor }}>
                      <TableCell component='th'>NO</TableCell>
                      <TableCell>Nama</TableCell>
                      <TableCell>NIK </TableCell>
                      <TableCell>Tempat & Tgl. Lahir</TableCell>
                      <TableCell>Action </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dosisLkf.map((item, index) => {
                      const { fas_pekerja_id, pek_id_npr } = item

                      return (
                        <Fragment key={index}>
                          <TableRow key={index}>
                            <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                            <TableCell>{item.master_npr.nama}</TableCell>
                            <TableCell>{item.master_npr.no_ktp}</TableCell>
                            <TableCell>{item.master_npr.tempat_lahir}</TableCell>
                            <TableCell padding='checkbox'>
                              <Controller
                                name='pilih'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <Checkbox
                                    className='row'
                                    name='pilih'
                                    value={fas_pekerja_id}
                                    checked={selectedRows.includes(fas_pekerja_id)}
                                    onChange={e => handleCheckboxClick(e, fas_pekerja_id, onChange)}
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
              <Pagination color='primary' count={numOfPages} page={current_page} onChange={handlePageChange} />
            </form>
          </Fragment>
        )}
      </CustomDialog>

      {/* Modal2 (FormTldLkf) */}
      <FormStoreTld open={isModal2Open} handleClose={handleModal2Close} data={data} edit={false} />
    </Fragment>
  )
}

export default PilihTld
