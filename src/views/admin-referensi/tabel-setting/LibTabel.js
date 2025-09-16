// ** MUI Imports
import { Fragment, useEffect, useState } from 'react'

import Link from 'next/link'

import { Icon } from '@iconify/react/dist/iconify.js'
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Card } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { getInkf } from '@/redux-store/admin-referensi/inkf'
import Loading from '@/components/Loading'
import ModalView from './ModalView'

const columns = [
  { field: 'index', headerName: 'No.', width: 80 },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'nama',
    headerName: 'Nama'
  }
]

const LibTabel = () => {
  const [tabelId, setTabelId] = useState()
  const [openView, setOpenView] = useState(false)

  const dispatch = useDispatch()

  const { inkf, isLoading, tab } = useSelector(store => store.inkf)

  useEffect(() => {
    dispatch(getInkf())
  }, [dispatch])

  if (isLoading) {
    return <Loading />
  }

  const handleOpenView = tabel_id => {
    setTabelId(tabel_id)
    setOpenView(true)
  }

  const handleViewClose = () => setOpenView(false)

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell colSpan={3}>Nama</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inkf.map((item, index) => {
              const { inkf_id, nama, inkf_tabel, lkf_lib } = item

              return (
                <Fragment key={index}>
                  <TableRow key={index}>
                    <TableCell component='th'>
                      <b>{index + 1}</b>
                    </TableCell>
                    <TableCell component='th' colSpan={2} sx={{ textTransform: 'uppercase' }}>
                      <b>{nama}</b>
                    </TableCell>
                    <TableCell component='th'>
                      {item.name}

                      <Link
                        href={{
                          pathname: `/admin-referensi/tabel-setting/inkf`,
                          query: { inkf_id: inkf_id, nama: nama }
                        }}
                      >
                        <Icon icon='tabler:settings' fontSize={20} />
                      </Link>
                    </TableCell>
                  </TableRow>
                  {inkf_tabel.map((row, index) => {
                    const { nama, uraian, tabel_id } = row

                    return (
                      <TableRow key={index}>
                        <TableCell scope='row'>
                          {inkf_id}.{index + 1}
                        </TableCell>
                        <TableCell>
                          <Link onClick={() => handleOpenView(tabel_id)} href='#'>
                            {nama}
                          </Link>
                        </TableCell>
                        <TableCell>{uraian}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )
                  })}
                  {lkf_lib.map((row, index) => {
                    const { nama, uraian } = row

                    return (
                      <TableRow key={index}>
                        <TableCell scope='row'>
                          {inkf_id}.{inkf_tabel.length + index + 1}
                        </TableCell>
                        <TableCell>{nama}</TableCell>
                        <TableCell>{uraian}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )
                  })}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {openView && <ModalView tabelId={tabelId} inkf={inkf} openView={openView} handleViewClose={handleViewClose} />}
    </>
  )
}

export default LibTabel
