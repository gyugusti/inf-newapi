import { Fragment, useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import CustomDialog from '@/components/widget/CustomDialog'
import { getRegsrpDetail } from '@/redux-store/validasi-data'
import { fullDayTime } from '@/utils/helper'

const LogSrp = ({ fasId, regsrpId, open, handleClose }) => {
  const dispatch = useDispatch()
  const [isModal2Open, setIsModal2Open] = useState(false) // Control state for Modal2

  const { isLoading, detailRegsrp, tahap_reg_id } = useSelector(store => store.validasiData)

  useEffect(() => {
    if (regsrpId) {
      dispatch(getRegsrpDetail(regsrpId))
    }
  }, [dispatch, regsrpId])

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
        title='Log Registrasi Sumber'
        maxWidth='lg'
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell component='th'>NO</TableCell>
                    <TableCell>Tahapan </TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Keterangan</TableCell>

                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailRegsrp.log_reg &&
                    detailRegsrp.log_reg.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell scope='row'>{index + 1}</TableCell>
                          <TableCell>{item.tahapan_reg.nama}</TableCell>
                          <TableCell>{item.user.username}</TableCell>
                          <TableCell>{item.ket}</TableCell>
                          <TableCell>{fullDayTime(item.created_at)}</TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Fragment>
        )}
      </CustomDialog>
    </Fragment>
  )
}

export default LogSrp
