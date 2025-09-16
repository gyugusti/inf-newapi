import { Fragment, useEffect, useMemo, useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Button,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { useSettings } from '@/@core/hooks/useSettings'
import Loading from '@/components/Loading'
import ShadowBox from '@/components/styles/ShadowBox'
import CustomDialog from '@/components/widget/CustomDialog'
import MiniCollapseCard from '@/components/widget/MiniCollapseCard'
import { getListMasterSrp, setSrpId } from '@/redux-store/validasi-data'
import DetailRegSrp from './DetailRegSrp'
import SearchSrp from './SearchSrp'

const PilihAsignSrp = ({ data, open, handleClose }) => {
  const [edit, setEdit] = useState()
  const bgColors = useSettings()
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = useState([])

  const { listMasterSrp, isLoadingSrp, merk, merk_tabung, no_seri, no_seri_tabung, tipe, tipe_tabung } = useSelector(
    store => store.validasiData
  )

  const datasrp = useMemo(
    () => ({
      merk: data?.nama || '',
      merk_tabung: data?.merk_tabung || '',
      no_seri: data?.no_seri || '',
      no_seri_tabung: data?.no_seri_tabung || '',
      tipe: data?.tipe || '',
      tipe_tabung: data?.tipe_tabung || ''
    }),
    [data]
  )

  useEffect(() => {
    //dispatch(handleChangeSrp({ jenis_sumber_id: data.jenis_sumber_id }))
    dispatch(getListMasterSrp())
  }, [dispatch, merk, merk_tabung, no_seri, no_seri_tabung, tipe, tipe_tabung])

  const handlePilihSrp = master_id => {
    // simpan master sumber ke dalam
    dispatch(setSrpId(master_id))

    handleClose()
  }

  const [expanded, setExpanded] = useState(true)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Data Master Sumber' maxWidth='lg'>
      {/* Dialog content */}
      {isLoadingSrp ? (
        <Loading />
      ) : (
        <Fragment>
          <MiniCollapseCard title='Detail Registrasi SRP'>
            <DetailRegSrp detailRegsrp={data} />
          </MiniCollapseCard>

          <ShadowBox>
            <SearchSrp data={data} />
          </ShadowBox>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
              <TableHead
                sx={{
                  backgroundColor: 'var(--mui-palette-primary-lightOpacity)' // your custom color
                }}
              >
                <TableRow
                  sx={{
                    backgroundColor: bgColors.primaryColor
                  }}
                >
                  <TableCell component='th'>NO</TableCell>
                  <TableCell>Pilih</TableCell>
                  <TableCell>Kode Sumber</TableCell>
                  <TableCell>Master ID</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Tipe </TableCell>
                  <TableCell>No Seri</TableCell>
                  <TableCell>Aktivitas</TableCell>
                  <TableCell>Kv / Ma</TableCell>
                  <TableCell>Merk Tabung</TableCell>
                  <TableCell>Tipe Tabung</TableCell>
                  <TableCell>No Seri Tabung</TableCell>
                  <TableCell>Status Aktif</TableCell>
                </TableRow>
              </TableHead>
              <TableBody size='small'>
                {listMasterSrp &&
                  listMasterSrp.map((item, index) => {
                    const { master_sumber_id } = item

                    return (
                      <Fragment key={index}>
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <IconButton
                              color='primary'
                              size='small'
                              onClick={() => handlePilihSrp(master_sumber_id)}
                              sx={{
                                border: '1px solid',
                                borderColor: theme => theme.palette.primary.main, // Matches info color
                                borderRadius: 1, // optional: smooth edges
                                padding: '4px' // optional: reduce padding
                              }}
                            >
                              <Icon icon='tabler:hand-finger' fontSize={15} />
                            </IconButton>
                          </TableCell>
                          <TableCell> {item.master_sumber_id?.toString().padStart(7, '0')}</TableCell>
                          <TableCell>
                            {item.master_id} <br />
                          </TableCell>
                          <TableCell>
                            {item.nama} <br /> {item.jenis_sumber_id}
                          </TableCell>
                          <TableCell>{item.tipe}</TableCell>
                          <TableCell>{item.no_seri}</TableCell>
                          <TableCell>
                            {item.aktivitas} {item.satuan_id} /{item.tgl_aktivitas}
                          </TableCell>
                          <TableCell>
                            {item.kv} / {item.ma}
                          </TableCell>
                          <TableCell>{merk.tabung}</TableCell>
                          <TableCell>{item.tipe_tabung}</TableCell>
                          <TableCell>{item.no_seri_tabung}</TableCell>
                          <TableCell>
                            {item.status_sumber_id === 1 ? 'aktif' : item.status_sumber_id === 0 ? 'nonaktif' : '-'}
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

export default PilihAsignSrp
