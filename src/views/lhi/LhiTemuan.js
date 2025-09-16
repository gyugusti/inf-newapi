import { useEffect, useState } from 'react'

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
import CircularProgress from '@mui/material/CircularProgress'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useSelector } from 'react-redux'

import ListTemuan from './ListTemuan'

import Loading from '@/components/Loading'
import FormTemuanItem from './form/FormTemuanItem'

const LhiTemuan = ({ item, no, action, dataLhi, ikk }) => {
  const inkf = item
  const inkf_id = inkf.inkf_id
  const [collapsed, setCollapsed] = useState(true)
  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()

  const detailIkk = ikk.filter(rows => rows.inkf_id === inkf_id)

  const { isLoading } = useSelector(store => store.lhi)

  const handleModalOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleModalClose = () => setOpen(false)

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
            <Box display='flex' alignItems='center'>
              <Button
                variant='tonal'
                size='small'
                aria-label='input temuan'
                sx={{ color: 'text.secondary', ml: 1, marginRight: 3 }}
                onClick={() => handleModalOpen(item)}
              >
                <Box display='flex' alignItems='center'>
                  <Typography sx={{ mr: 1 }}>Input Temuan</Typography>
                  <Icon fontSize={20} icon='tabler:plus' />
                </Box>
              </Button>
              <IconButton
                size='small'
                aria-label='collapse'
                sx={{ color: 'text.secondary' }}
                onClick={() => setCollapsed(!collapsed)}
              >
                <Icon fontSize={20} icon={!collapsed ? 'tabler:chevron-down' : 'tabler:chevron-up'} />
              </IconButton>
            </Box>
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
              <Grid className='inkf'></Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <input type='hidden' name='inkf_id' value={inkf_id} className='row' />
                {isLoading ? (
                  <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <CircularProgress sx={{ mb: 4 }} />
                    <Typography>Loading...</Typography>
                  </Box>
                ) : (
                  <ListTemuan inkf={inkf} hasil={1} temuanItem={item.temuan_item} detailIkk={detailIkk} />
                )}
              </Grid>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
      {open && <FormTemuanItem data={dataForm} open={open} handleClose={handleModalClose} />}
    </>
  )
}

export default LhiTemuan
