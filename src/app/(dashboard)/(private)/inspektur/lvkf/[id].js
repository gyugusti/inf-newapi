import React, { Fragment, useState , useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import {
  Table,
  TableBody,
  TableRow,
  IconButton,
  Button,
  Box,
  Typography,
  Grid,
  TableContainer,
  TableCell
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import { useDispatch, useSelector } from 'react-redux'




import { Icon } from '@iconify/react/dist/iconify.js'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import { getdetailJadwal } from '@/redux-store/jadwal'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import Priview from '@/views/jadwal/Priview'

import DaftarLkf from '@/views/lvkf/inspektur/DaftarLkf'


const InspekturLvkf = () => {
  const router = useRouter()
  const theme = useTheme()

  const query = router.query
  const id = query.id

  const dispatch = useDispatch()

  const { detailJadwal, tab, isLoading } = useSelector(store => store.jadwal)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getdetailJadwal(id))
    }
  }, [id, dispatch, tab])

  const breadcrumbs = [{ name: 'LVKF', path: '/inspektur/lvkf' }, { name: 'Daftar LVKF' }]

  return (
    <>
      <Fragment>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        <Accordion defaultExpanded>
          <AccordionSummary
            id='panel-header-1'
            aria-controls='panel-content-1'
            expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
          ></AccordionSummary>
          <AccordionDetails>
            {detailJadwal && (
              <TableContainer>
                <Table>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        py: `${theme.spacing(2.5)} !important`,
                        fontSize: theme.typography.body1.fontSize
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell>Kode Area</TableCell>
                      <TableCell>{detailJadwal.kode_area}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Tanggal Pelaksanaan</TableCell>
                      <TableCell>
                        {detailJadwal.tgl_mulai} s/d {detailJadwal.tgl_akhir} , {detailJadwal.hari} Hari
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jumlah Hari</TableCell>
                      <TableCell> {detailJadwal.hari} Hari</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kontak</TableCell>
                      <TableCell>
                        {detailJadwal.nama_kontak} Telp. {detailJadwal.telp_kontak}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status Jadwal </TableCell>
                      <TableCell>{detailJadwal.status?.nama}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tim Inspektur </TableCell>
                      <TableCell>
                        {detailJadwal.jadwal_tim &&
                          detailJadwal.jadwal_tim.map((tim, index) => (
                            <span key={index}>
                              {index + 1} . {tim.inspektur.nama} ({tim.jabatan.nama})
                            </span>
                          ))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} align='right'>
                        <Link
                          href={{
                            pathname: '/cetak/jadwal',
                            query: { id: detailJadwal.jadwal_id }
                          }}
                          passHref
                          target='_blank'
                        >
                          <Button size='small' variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
                            <Icon fontSize='1.125rem' icon='tabler:map' />
                            Cetak Jadwal
                          </Button>
                        </Link>
                        &nbsp;
                        <Link
                          href={{
                            pathname: `/inspektur/lvkf`
                          }}
                          passHref
                        >
                          <Button size='small' sx={{ mb: 2, '& svg': { mr: 2 } }} variant='tonal' color='success'>
                            <Icon fontSize='1.125rem' icon='tabler:arrow-back' />
                            Kembali
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </AccordionDetails>
        </Accordion>
        <Grid>{detailJadwal && <DaftarLkf detail={detailJadwal} />}</Grid>
      </Fragment>
    </>
  )
}

InspekturLvkf.acl = {
  action: 'all',
  subject: 'inspektur-page'
}

export default InspekturLvkf
