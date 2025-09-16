'use client'

import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import {
  Card,
  CardContent,
  CardHeader,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomTabList from '@core/components/mui/TabList'

import OptionMenu from '@/@core/components/option-menu'
import Loading from '@/components/Loading'
import { changePage, getSensusSrp, setFlagValid } from '@/redux-store/validasi-data'

import { getFlagLengkap, getFlagValid } from '@/utils/balishelper'
import Search from './Search'

const Srp = () => {
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState('belumValid')
  const [title, setTitle] = useState('Belum valid')

  const {
    total,
    tab,
    per_page,
    numOfPages,
    current_page,
    listSrpInstansi,
    flag_valid,
    isLoading,
    cari,
    merk,
    merk_tabung,
    no_seri,
    no_seri_tabung,
    tipe,
    tipe_tabung,
    master_id
  } = useSelector(store => store.validasiData)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const startEntry = total === 0 ? 0 : (current_page - 1) * per_page + 1
  const endEntry = Math.min(current_page * per_page, total)

  const handlePageChange = value => {
    dispatch(changePage(value))
  }

  const handleChange = (event, value) => {
    setActiveTab(value)

    if (value === 'belumValid') {
      setTitle('Belum valid')
      dispatch(setFlagValid(0))
    } else if (value === 'valid') {
      setTitle('Valid')
      dispatch(setFlagValid(1))
    } else {
      setTitle('Tidak Valid')
      dispatch(setFlagValid(-1))
    }
  }

  useEffect(() => {
    if (flag_valid !== null) {
      dispatch(getSensusSrp())
    }
  }, [
    dispatch,
    current_page,
    flag_valid,
    tab,
    cari,
    per_page,
    merk,
    merk_tabung,
    no_seri,
    no_seri_tabung,
    tipe,
    tipe_tabung,
    master_id
  ])

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab icon={<i className='tabler-clock' />} value='belumValid' label='Belum Valid' iconPosition='start' />
              <Tab icon={<i className='tabler-circle-check' />} value='valid' label='Valid' iconPosition='start' />
              <Tab
                icon={<i className='tabler-circle-x' />}
                value='tidakValid'
                label='Tidak Valid'
                iconPosition='start'
              />
            </CustomTabList>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TabPanel value={activeTab} className='p-0'>
              <Card>
                <CardHeader title='Sensus SRP ' />
                <CardContent>
                  <Search />
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell component='th'>NO</TableCell>
                          <TableCell>Action</TableCell>
                          <TableCell>Master Id</TableCell>
                          <TableCell>Kode/Jenis Sumber</TableCell>
                          <TableCell>
                            Merk Unit
                            <br />
                            Tipe/No Seri
                          </TableCell>
                          <TableCell>Aktivitas</TableCell>
                          <TableCell>
                            Merk Tabung
                            <br />
                            Tipe/No Seri
                          </TableCell>
                          <TableCell>Kv / Ma</TableCell>
                          <TableCell>Instansi</TableCell>
                          <TableCell>Status Aktif</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={13} align='center'>
                              <Loading />
                            </TableCell>
                          </TableRow>
                        ) : listSrpInstansi.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={13} align='center'>
                              Tidak ada data fasilitas
                            </TableCell>
                          </TableRow>
                        ) : (
                          listSrpInstansi.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                              <TableCell>
                                <OptionMenu
                                  iconButtonProps={{ size: 'medium' }}
                                  iconClassName='text-textSecondary'
                                  options={[
                                    {
                                      text: 'Validasi',
                                      icon: 'tabler-eye',
                                      href: `${item.master_sumber_id}`,
                                      linkProps: {
                                        className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                                      }
                                    }
                                  ]}
                                />
                              </TableCell>
                              <TableCell>{item.master_id}</TableCell>
                              <TableCell>
                                {item.master_sumber_id?.toString().padStart(7, '0')} /<br />
                                {item.jenis_sumber.nama}
                                <br />
                                {getFlagValid(item.flag_valid)} <br />
                                {getFlagLengkap(item.flag_lengkap)}
                              </TableCell>
                              <TableCell>
                                {item.merk_sumber?.nama}
                                <br />
                                {item.tipe} / {item.no_seri}
                              </TableCell>
                              <TableCell>
                                {item.aktivitas} {item.satuan_aktivitas?.nama_satuan} /<br />
                                {item.tgl_aktivitas}
                              </TableCell>
                              <TableCell>
                                {item.merk_tabung_id ? item.merk_tabung.nama : '-'}
                                <br />
                                {item.tipe_tabung} / {item.no_seri_tabung}
                              </TableCell>
                              <TableCell>
                                {item.kv} / {item.ma}
                              </TableCell>
                              <TableCell>
                                {item.fasilitas_sumber?.length === 0
                                  ? '-'
                                  : item.fasilitas_sumber.map((val, i) => <li key={i}>{val.fas.nama}</li>)}
                              </TableCell>
                              <TableCell>
                                {item.status_sumber_id === 1 ? 'aktif' : item.status_sumber_id === 0 ? 'nonaktif' : '-'}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
                    <Typography color='text.disabled'>{`Showing ${startEntry} to ${endEntry} of ${total} entries`}</Typography>

                    <Pagination
                      shape='rounded'
                      color='primary'
                      variant='tonal'
                      showFirstButton
                      showLastButton
                      count={numOfPages}
                      page={current_page}
                      onChange={(_, page) => handlePageChange(page)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default Srp
