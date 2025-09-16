import React, { useEffect, useState } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Icon } from '@iconify/react/dist/iconify.js'

import FihiTableFix from './FihiTableFix'
import FihiTableDinamis from './FihiTableDinamis'
import Loading from '@/components/Loading'
import FormEvaluasiFihi from './form/FormEvaluasiFihi'
import temuan from '@/redux-store/admin-referensi/temuan'

const FihiPemeriksaan = ({ item, no, action, dataFihi, ikk }) => {
  const inkf = item
  const inkf_id = inkf.inkf_id
  const [collapsed, setCollapsed] = useState(true)
  const [open, setOpen] = useState(false)

  const detailIkk = ikk.filter(rows => rows.inkf_id === inkf_id)

  if (!inkf || inkf == '') {
    return <Loading />
  }

  return (
    <>
      <Card
        sx={{
          marginBottom: 3
        }}
      >
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
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            <Box display='flex' flexDirection='column' gap={2}>
              <Grid className='inkf'>
                {/* tabel dinamis */}
                {inkf.tabelFix.length > 0 || inkf.tabelDinamis.length > 0 ? (
                  <Grid>
                    {inkf.tabelFix.map((item, index) => (
                      <React.Fragment key={index}>
                        <div>
                          {no}.{index + 1} {item.nama_tabel}
                          <br />
                          <FihiTableFix action={action} data={item} dataFihi={dataFihi} />
                        </div>
                      </React.Fragment>
                    ))}
                    {inkf.tabelDinamis.map((item, index) => (
                      <React.Fragment key={index}>
                        <div>
                          {no}.{index + 1 + inkf.tabelFix.length} {item.nama}
                          <br />
                          <FihiTableDinamis action={action} data={item} id={dataFihi.fihi_id} />
                        </div>
                      </React.Fragment>
                    ))}
                  </Grid>
                ) : (
                  <Grid>
                    <div colSpan={3}>Tabel tidak tersedia</div>
                  </Grid>
                )}
              </Grid>

              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <input type='hidden' name='inkf_id' value={inkf_id} className='row' />
                <FormEvaluasiFihi inkf={inkf} temuanItem={item.temuan_item} detailIkk={detailIkk} />
              </Grid>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default FihiPemeriksaan
