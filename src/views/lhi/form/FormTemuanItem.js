import React, { Fragment } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import CustomTextField from '@/@core/components/mui/TextField'
import { editLhitemuan, setTab } from '@/redux-store/lhi'

const FormTemuanItem = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()
  const temuanItem = data.temuan_item
  const { isLoading } = useSelector(store => store.lhi)

  const handleRowSubmit = (lhi_temuan_id, formData) => {
    dispatch(editLhitemuan({ id: lhi_temuan_id, dataform: formData }))
  }

  const TemuanRow = ({ item, index, isLoading, onSubmit }) => {
    const defaultValues = {
      hasil_id: item.lhi_temuan?.hasil_id || '',
      uraian_temuan: item.lhi_temuan?.uraian_temuan || ''
    }

    const { control, handleSubmit } = useForm({ defaultValues })

    return (
      <Fragment>
        <StyledTableRow>
          <StyledTableCell rowSpan={2}>{index + 1}</StyledTableCell>
          <StyledTableCell rowSpan={2}>{item.kode_temuan}</StyledTableCell>
          <StyledTableCell sx={{ fontWeight: 'bold' }}> {item.nama_temuan}</StyledTableCell>
          <StyledTableCell rowSpan={2} align='center'>
            <Controller
              name='hasil_id'
              control={control}
              render={({ field }) => (
                <FormControl>
                  <RadioGroup {...field} row>
                    <FormControlLabel value='1' control={<Radio />} label='Ya' />
                    <FormControlLabel value='2' control={<Radio />} label='Tidak' />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </StyledTableCell>
          <StyledTableCell rowSpan={2}>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
              <Button type='submit' size='small' variant='contained' color='primary' disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </Box>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>
            <Controller
              name='uraian_temuan'
              control={control}
              rules={{
                required: 'Uraian temuan is required'
              }}
              render={({ field }) => <CustomTextField {...field} fullWidth multiline maxRows={2} minRows={2} />}
            />
          </StyledTableCell>
        </StyledTableRow>
      </Fragment>
    )
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
    >
      <DialogTitle>
        <Typography>
          <b>{data.nama}</b>
        </Typography>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 10, color: 'grey.700' }}
        >
          <Icon icon='tabler:x' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <StyledTableRow sx={{ fontStyle: 'bolder' }}>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Kode Temuan</StyledTableCell>
              <StyledTableCell>Uraian</StyledTableCell>
              <StyledTableCell>Temuan</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {temuanItem.map((item, index) => (
              <TemuanRow
                key={item.temuan_id}
                item={item}
                index={index}
                isLoading={isLoading}
                onSubmit={formData => {
                  dispatch(
                    editLhitemuan({
                      id: item.lhi_temuan.lhi_temuan_id,
                      dataform: formData
                    })
                  )
                }}
              />
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormTemuanItem
