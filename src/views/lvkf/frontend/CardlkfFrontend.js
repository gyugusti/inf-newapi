import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch, useSelector } from 'react-redux'

import Tooltip from '@mui/material/Tooltip'

import Loading from '@/components/Loading'
import ViewTabelFix from '../ViewTabelFix'
import ViewTabelDina from '../ViewTabelDina'
import FormEvaluasi from '../FormEvaluasi'
import { getIkk } from '@/redux-store/admin-referensi/ikk'

const CardlkfFrontend = prop => {
  const [collapsed, setCollapsed] = useState(true)

  const inkf = prop.item
  const no = prop.no
  const detailLkf = prop.detailLkf
  const dispatch = useDispatch()
  const router = useRouter()
  const inkf_id = inkf.inkf_id

  if (!inkf || inkf == '') {
    return <Loading />
  }

  const detailIkk = prop.ikk.filter(rows => rows.inkf_id === inkf_id)

  return (
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
        <CardContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              {/* tabel dinamis */}
              {inkf.tabelFix.length > 0 || inkf.tabelDinamis.length > 0 ? (
                <table>
                  <tbody>
                    {inkf.tabelDinamis.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td>
                            {no}.{index + 1} {item.nama}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <ViewTabelDina data={item} />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                    {inkf.tabelFix.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td>
                            {no}.{index + 1 + inkf.tabelDinamis.length} {item.nama}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <ViewTabelFix data={item} detailLkf={detailLkf} />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
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
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>tambah data</Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default CardlkfFrontend
