import React, { Fragment, useEffect } from 'react'

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Box,
  CircularProgress,
  Card,
  CardHeader,
  CardContent
} from '@mui/material'
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
import Loading from '@/components/Loading'
import OptionMenu from '@/@core/components/option-menu'

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

const LogJadwal = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()
  const bgColors = useSettings()

  const { logProses, isLoading, current_page, per_page } = useSelector(store => store.refInfara)
  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  // ** Hook & Var
  const { settings } = useSettings()
  const { direction } = settings

  const colorMap = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
    default: 'primary'
  }

  return (
    <Fragment>
      <CustomDialog open={open} handleClose={handleClose} title='' maxWidth='md'>
        <Card>
          <CardHeader
            avatar={<i className='tabler-list-details text-xl' />}
            title={`${data.kode_area} tanggal ${data.tgl_mulai} / ${data.tgl_akhir}`}
            titleTypographyProps={{ variant: 'h6' }}
            sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
          />
          <CardContent className='flex flex-col gap-6 pbe-5'>
            <Timeline>
              {logProses.length === 0 ? (
                <Typography sx={{ px: 4 }}>Tidak ada data log proses.</Typography>
              ) : (
                logProses.map((row, index) => (
                  <TimelineItem key={row.id || index}>
                    <TimelineSeparator>
                      <TimelineDot color={colorMap[row.status?.warna] || 'primary'} />
                      {index !== logProses.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                        <Typography className='font-medium' color='text.primary'>
                          {row.status?.nama}
                        </Typography>
                        <Typography variant='caption'>{fullDay(row.time_update)}</Typography>
                      </div>

                      <Typography className='mbe-2'>
                        <strong>{row.username}</strong>
                      </Typography>

                      {/* Optional: bisa tambahkan dokumen atau avatar jika tersedia */}
                      {row.file && (
                        <div className='flex items-center gap-2.5 is-fit rounded bg-actionHover plb-[5px] pli-2.5'>
                          <Typography className='font-medium'>{row.ket}</Typography>
                        </div>
                      )}
                    </TimelineContent>
                  </TimelineItem>
                ))
              )}
            </Timeline>
          </CardContent>
        </Card>
      </CustomDialog>
    </Fragment>
  )
}

export default LogJadwal
