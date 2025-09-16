import React, { Fragment, useEffect } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'

import { styled, useColorScheme } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// ** Icon Imports
import { Icon } from '@iconify/react/dist/iconify.js'

import { getProsesLog } from '@/redux-store/referensi-infara'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import CustomDialog from '@/components/widget/CustomDialog'
import { useSettings } from '@/@core/hooks/useSettings'
import { fullDay } from '@/utils/helper'

// ** Hook Import

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const LogLhi = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()
  const bgColors = useSettings()

  const { logProses, isLoading, current_page, per_page } = useSelector(store => store.refInfara)
  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  useEffect(() => {
    dispatch(getProsesLog())
  }, [dispatch, current_page])

  // ** Hook & Var
  const { settings } = useSettings()
  const { direction } = settings

  return (
    <Fragment>
      <CustomDialog open={open} handleClose={handleClose} title='Log Proses' maxWidth='md'>
        <Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nomor LHI </TableCell>
                <TableCell>{data.no_master_lhi} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tanggal Inspeksi / Kegiatan </TableCell>
                <TableCell>
                  {data.jadwal?.tgl_mulai} / {data.jadwal?.tgl_akhir} <br />
                  <Typography variant='body2' sx={{ color: 'success.main' }}>
                    {data.kelompok.nama}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Instansi / Lokasi </TableCell>
                <TableCell>{data.fas?.nama} </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>
        <Grid>
          <Timeline sx={{ backgroundColor: bgColors.primaryColor }}>
            {logProses.map((rows, index) => {
              return (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color='error' />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom', mx: 4 } }}>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography sx={{ mr: 2 }} variant='h6'>
                        {rows.status.nama}
                      </Typography>
                    </Box>
                    <Typography variant='body2' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {rows.username}
                    </Typography>

                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2' sx={{ ml: 2 }}>
                        {fullDay(rows.time_update)}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
          </Timeline>
        </Grid>
      </CustomDialog>
    </Fragment>
  )
}

export default LogLhi
