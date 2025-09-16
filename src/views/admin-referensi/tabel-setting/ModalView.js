import { useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  Table,
  IconButton,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { Icon } from '@iconify/react/dist/iconify.js'
import Fade from '@mui/material/Fade'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import { getStruktur } from '@/redux-store/admin-referensi/tabel-setting'
import Loading from '@/components/Loading'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const ModalView = ({ tabelId, openView, handleViewClose }) => {
  const dispatch = useDispatch()
  const { strukturTabel, isLoading, tab } = useSelector(store => store.tabel)

  console.log(strukturTabel)

  useEffect(() => {
    dispatch(getStruktur(tabelId))
  }, [dispatch, tabelId])

  if (isLoading || !strukturTabel || strukturTabel.length === 0) {
    return <Loading />
  }

  return (
    <Dialog
      fullWidth
      open={openView}
      scroll='body'
      maxWidth='lg'
      onClose={handleViewClose}
      TransitionComponent={Transition}
      onBackdropClick={handleViewClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={handleViewClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th' rowSpan={2}>
                NO
              </StyledTableCell>
              {strukturTabel.map((rows, index) => {
                const { kolom_count, nama, header_id } = rows
                let rowspan = kolom_count === 1 ? 2 : ''

                return (
                  <StyledTableCell key={index} rowSpan={rowspan} colSpan={kolom_count - 1}>
                    {nama} - {header_id}
                  </StyledTableCell>
                )
              })}
            </StyledTableRow>
            <StyledTableRow>
              {strukturTabel.map((item, index) => {
                const { kolom, kolom_count, header_id } = item // Destructure kolom array from item

                const itemData = kolom.filter(a => a.header_id === Number(header_id) && a.label !== item.label)

                if (kolom_count > 1) {
                  return itemData.map((prop, index) => (
                    <StyledTableCell key={prop.kolom_id}>{prop.label}</StyledTableCell>
                  ))
                }
              })}
            </StyledTableRow>
            <TableRow>
              <StyledTableCell>1</StyledTableCell>
              {strukturTabel.map((item, index) => {
                const { kolom, kolom_count, header_id, label } = item // Destructure kolom array from item

                const itemData = kolom.filter(a => a.header_id === Number(header_id) && a.label !== item.label) // Filter data based on condition

                if (kolom_count > 1) {
                  return itemData.map((prop, index) => (
                    <StyledTableCell key={prop.kolom_id}>data disini {prop.label}</StyledTableCell>
                  ))
                }
              })}

              {strukturTabel.map((item, index) => {
                const { kolom, kolom_count, header_id, label } = item // Destructure kolom array from item

                const itemData = kolom.filter(a => a.header_id === Number(header_id)) // Filter data based on condition

                if (kolom_count === 1) {
                  return itemData.map((prop, index) => (
                    <StyledTableCell key={prop.kolom_id}>data disini {prop.label}</StyledTableCell>
                  ))
                }
              })}
            </TableRow>
          </TableHead>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

export default ModalView
