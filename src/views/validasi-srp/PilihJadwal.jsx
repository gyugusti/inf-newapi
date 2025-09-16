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

import CustomDialog from '@/components/widget/CustomDialog'
import Loading from '@/components/Loading'
import { useSettings } from '@/@core/hooks/useSettings'
import { getListMasterSrp, setJadwalSrp, setSrpId } from '@/redux-store/validasi-data'
import SearchSrp from './SearchSrp'
import jadwal, { getJadwal, setInspektur } from '@/redux-store/jadwal'
import SearchContainer from '@/components/jadwal/SearchContainer'

const PilihJadwal = ({ data, open, handleClose }) => {
  const [edit, setEdit] = useState()
  const bgColors = useSettings()
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = useState([])

  const { listJadwal, isLoading, numOfPages, search, current_page, per_page, status, bidang_id, propinsi_id, tab } =
    useSelector(store => store.jadwal)

  useEffect(() => {
    dispatch(getJadwal())
  }, [dispatch, search, bidang_id, propinsi_id])

  const handlePilihJadwal = jadwal => {
    dispatch(setJadwalSrp(jadwal))
    handleClose()
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Data Jadwal' maxWidth='lg'>
      {/* Dialog content */}
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <SearchContainer />
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow sx={{ backgroundColor: bgColors.primaryColor }}>
                  <TableCell component='th'>NO</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Kode Area / Bidang </TableCell>
                  <TableCell>Propinsi</TableCell>
                  <TableCell>Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listJadwal &&
                  listJadwal.map((item, index) => {
                    const { jadwal_id } = item

                    return (
                      <Fragment key={index}>
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {item.tgl_mulai} - {item.tgl_akhir}
                          </TableCell>
                          <TableCell>
                            {item.kode_area} - {item.bidang.nama}
                          </TableCell>
                          <TableCell>{item.propinsi.nama}</TableCell>

                          <TableCell>
                            <Button variant='tonal' color='info' size='small' onClick={() => handlePilihJadwal(item)}>
                              <Icon icon='tabler:choose' fontSize={15} />
                              Pilih
                            </Button>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog actions */}
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Fragment>
      )}
      {/* end Dialog content */}
    </CustomDialog>
  )
}

export default PilihJadwal
