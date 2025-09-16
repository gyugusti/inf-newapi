import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Button, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch } from 'react-redux'

import Tooltip from '@mui/material/Tooltip'

import Loading from '@/components/Loading'
import ViewTabelDina from './ViewTabelDina'
import ViewTabelFix from './ViewTabelFix'

import FormEvaluasi from './FormEvaluasi'

import DokumenLvkf from './frontend/DokumenLvkf'

const CardInkf = ({ item, no, action, detailLkf, ikk }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [open, setOpen] = useState(false)
  const [dataLkf, setDataLkf] = useState()

  const inkf = item
  const dispatch = useDispatch()
  const router = useRouter()
  const inkf_id = inkf.inkf_id

  if (!inkf || inkf == '') {
    return <Loading />
  }

  const detailIkk = ikk.filter(rows => rows.inkf_id === inkf_id)

  const handleModalDocOpen = () => {
    setDataLkf(detailLkf)
    setOpen(true)
  }

  const handleModalClose = () => setOpen(false)

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            backgroundColor: 'background.default'
          }}
          title={
            <Tooltip title={inkf.uraian} placement='top'>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ mr: 2 }}>
                  <b>{`${no} . ${inkf.nama}`}</b>
                </Typography>
                <Icon fontSize={25} icon='tabler:info-square' />
              </Box>
            </Tooltip>
          }
          action={
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon fontSize={20} icon={!collapsed ? 'tabler:chevron-down' : 'tabler:chevron-up'} />
            </IconButton>
          }
        />
        <Collapse in={collapsed}>
          <CardContent
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              overflowX: 'auto', // Enables horizontal scrolling
              overflowY: 'hidden', // Hides vertical scrolling
              whiteSpace: 'nowrap' // Prevents wrapping of grid items
            }}
          >
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                {/* tabel dinamis */}
                {inkf.tabelFix.length > 0 || inkf.tabelDinamis.length > 0 ? (
                  <Grid>
                    {inkf.tabelFix.map((item, index) => (
                      <React.Fragment key={index}>
                        <div>
                          {no}.{index + 1} {item.nama_tabel}
                          <br />
                          <ViewTabelFix action={action} data={item} detailLkf={detailLkf} />
                        </div>
                      </React.Fragment>
                    ))}
                    {inkf.tabelDinamis.map((item, index) => (
                      <React.Fragment key={index}>
                        <div>
                          {no}.{index + 1 + inkf.tabelFix.length} {item.nama}
                          <br />
                          <ViewTabelDina action={action} data={item} lkf_id={detailLkf.lkf_id} />
                        </div>
                      </React.Fragment>
                    ))}
                  </Grid>
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <td colSpan={3}>Tabel tidak tersedia</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </Grid>
              {action === 'non-view' ? (
                <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                  <Button variant='outlined' size='small' onClick={() => handleModalDocOpen()}>
                    <Icon icon='tabler:plus' fontSize={15} />
                    Tambah Dokumen Pendukung Kriteria
                  </Button>
                </Grid>
              ) : (
                <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                  <input type='hidden' name='inkf_id' value={inkf_id} className='row' />
                  <FormEvaluasi inkf={inkf} detailIkk={detailIkk} />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Collapse>
      </Card>

      {open && <DokumenLvkf data={dataLkf} inkf_id={inkf_id} open={open} handleClose={handleModalClose} />}
    </>
  )
}

export default CardInkf
