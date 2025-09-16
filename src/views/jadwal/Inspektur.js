// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Collapse from '@mui/material/Collapse'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react/dist/iconify.js'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

import { useDispatch } from 'react-redux'

import FormInspektur from './FormInspektur'
import { deleteJadwalTim } from '@/redux-store/jadwal'

// ** Icon Imports
const Inspektur = ({ detail }) => {
  const dispatch = useDispatch()

  const [collapsed, setCollapsed] = useState(true)
  const id = detail.jadwal_id

  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()

  // Handle Edit dialog
  const handleClickOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <>
      <Card>
        <CardHeader
          title='Inspektur'
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
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Jenjang</TableCell>
                  <TableCell>Jabatan</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail.jadwal_tim && detail.jadwal_tim.length > 0 ? (
                  detail.jadwal_tim.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell scope='row'>{index + 1}</TableCell>
                      <TableCell>{item.inspektur?.nama}</TableCell>
                      <TableCell>{item.ins_kat?.ins_jenjang?.nama}</TableCell>
                      <TableCell>{item.jabatan?.nama} </TableCell>
                      <TableCell>
                        <IconButton color='primary' onClick={() => handleClickOpen(item)}>
                          <Icon icon='tabler:edit' fontSize={20} />
                        </IconButton>
                        <IconButton
                          aria-label='capture screenshot'
                          color='error'
                          onClick={() => dispatch(deleteJadwalTim(item.inspektur_id))}
                        >
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell> inspektur tidak ada</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Collapse>
      </Card>
      {open && id && <FormInspektur jadwal_id={id} dataForm={dataForm} open={open} handleClose={handleClose} />}
    </>
  )
}

export default Inspektur
