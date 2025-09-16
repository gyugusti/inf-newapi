'use client'

import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { Icon } from '@iconify/react/dist/iconify.js'
import { TabContext, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid2,
  Paper,
  Tab,
  Typography
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomTabList } from '@/components/styles/TabPIlls'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'
import { dokumenRegSumber, getRegsrpDetail } from '@/redux-store/validasi-data'
import { getKategoriSumber } from '@/utils/balishelper'
import DetailSrp from './DetailSrp'
import DokumenSrp from './DokumenSrp'
import FormValidasiSrp from './FormValidasiSrp'
import PilihAsignSrp from './PilihAsignSrp'

const DetailValidasiSrp = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const username = session?.user?.name || ''
  const id = params.id

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [asignOpen, setAsignOpen] = useState(false)
  const [mastersumber, setMastersumber] = useState('')
  const [value, setValue] = useState('1')

  console.log(mastersumber)

  const { detailRegsrp, isLoading, listDokumenSrp, tahap_reg_id, srpId } = useSelector(store => store.validasiData)

  useEffect(() => {
    if (id) {
      dispatch(getRegsrpDetail(id))
      dispatch(dokumenRegSumber(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (detailRegsrp.master_sumber_id) {
      setMastersumber(detailRegsrp.master_sumber.master_id)
    } else {
      setMastersumber(srpId)
    }
  }, [detailRegsrp, srpId])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleAsignOpen = () => {
    setAsignOpen(true)
  }

  const handleAsignClose = () => {
    setAsignOpen(false)
  }

  const handleHapusMaster = () => {
    console.log('Master Sumber dihapus')
    setMastersumber('')
  }

  let breadcrumbs =
    tahap_reg_id > 1
      ? [{ name: 'Validasi', path: '/koor-validasi-srp' }, { name: 'Detail Validasi SRP' }]
      : [{ name: 'Validasi', path: '/validasi-srp' }, { name: 'Detail Validasi SRP' }]

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-40'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <div className='flex flex-col gap-2'>
            {[
              ['No Registrasi', detailRegsrp.no_reg],
              ['Jenis Sumber', detailRegsrp.jenis_sumber?.nama],
              ['Kategori Sumber', getKategoriSumber(detailRegsrp.kat_sumber_id)],
              ['Kegiatan', detailRegsrp.flag_kegiatan],
              ['Fasilitas', detailRegsrp.fasilitas?.nama],
              ['Created', `${detailRegsrp.created_at} ${detailRegsrp.created_by}`]
            ].map(([label, value], index) => (
              <div key={index} className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  {label} :
                </Typography>
                <Typography>{value}</Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Grid2 marginTop={4}>
        <TabContext value={value}>
          <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='tabs'>
            <Tab
              fullWidth
              value='1'
              label='Form Validasi'
              sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 3 }}
            />
            <Tab
              fullWidth
              value='2'
              label='Dokumentasi'
              sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginLeft: 3 }}
            />
          </CustomTabList>
          <TabPanel value='1' sx={{ padding: 0 }}>
            <DetailSrp detailRegsrp={detailRegsrp} assign={true} />
            <Card>
              <CardHeader
                title={mastersumber ? `Master Sumber: ${mastersumber}` : ''}
                sx={theme => ({
                  backgroundColor: theme.palette.grey[100],
                  color: theme.palette.text.primary
                })}
                action={
                  <Box display='flex' gap={1}>
                    {mastersumber && (
                      <Button variant='tonal' color='error' size='small' onClick={() => setShowConfirmDelete(true)}>
                        <Icon icon='tabler:trash' fontSize={15} />
                        Hapus Master Sumber
                      </Button>
                    )}

                    <Button variant='tonal' color='info' size='small' onClick={handleAsignOpen}>
                      <Icon icon='tabler:rotate-rectangle' fontSize={15} />
                      {mastersumber ? 'Ganti Master Sumber' : 'Cari Master Sumber'}
                    </Button>
                  </Box>
                }
              />
              <CardContent>
                {detailRegsrp ? (
                  <FormValidasiSrp detailRegsrp={detailRegsrp} id={id} mastersumber={mastersumber} />
                ) : (
                  <div className='flex justify-center items-center h-40'>
                    <CircularProgress />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value='2' sx={{ padding: 0 }}>
            <Paper sx={{ padding: 3 }}>
              <DokumenSrp listDokumenSrp={listDokumenSrp} />
            </Paper>
          </TabPanel>
        </TabContext>
      </Grid2>

      {asignOpen && <PilihAsignSrp data={detailRegsrp} open={asignOpen} handleClose={handleAsignClose} />}

      <DialogKonfirmasi
        open={showConfirmDelete}
        handleClose={() => setShowConfirmDelete(false)}
        onConfirm={() => {
          handleHapusMaster()
          setShowConfirmDelete(false)
        }}
        title='Konfirmasi Hapus'
        description='Apakah Anda yakin ingin menghapus Master Sumber ini?'
      />
    </>
  )
}

export default DetailValidasiSrp
