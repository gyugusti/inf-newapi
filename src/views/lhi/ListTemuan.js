import { Fragment, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  FormLabel,
  Button,
  useColorScheme
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import Tooltip from '@mui/material/Tooltip'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import CustomTextField from '@/@core/components/mui/TextField'

import FormLhiTemuan from './form/FormLhiTemuan'
import { useSettings } from '@/@core/hooks/useSettings'

const ListTemuan = ({ inkf, temuanItem, detailIkk, hasil = null }) => {
  const bgColors = useSettings()

  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()

  const filteredTemuanItem = hasil === 1 ? temuanItem.filter(item => item.lhi_temuan?.hasil_id === 1) : temuanItem

  const [ikkItem, setIkkItem] = useState(
    inkf.ikkNilai ? inkf.ikkNilai.ikk_item_id.toString() : detailIkk[3].ikk_item_id
  )

  const handleIkkItemChange = event => {
    setIkkItem(event.target.value)
  }

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleModalOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleModalClose = () => setOpen(false)

  return (
    <>
      <Grid>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Kode Temuan</StyledTableCell>
              <StyledTableCell>Uraian</StyledTableCell>
              <StyledTableCell>Temuan</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredTemuanItem.map((item, index) => {
              const { temuan_id, kode_temuan, nama_temuan, lhi_temuan } = item

              let temuanLabel

              if (lhi_temuan?.hasil_id === 1) {
                temuanLabel = 'Y'
              } else if (lhi_temuan?.hasil_id === 2 || lhi_temuan?.hasil_id === 0) {
                temuanLabel = 'T'
              } else {
                temuanLabel = 'Unknown'
              }

              const bg_warna = lhi_temuan.hasil_id === 1 ? bgColors.errorLight : ''

              return (
                <Fragment key={index}>
                  <StyledTableRow>
                    <StyledTableCell rowSpan={2}>{index + 1}</StyledTableCell>
                    <StyledTableCell align='center' rowSpan={2}>
                      {kode_temuan}
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: 'bold' }}> {nama_temuan}</StyledTableCell>
                    <StyledTableCell rowSpan={2} align='center' sx={{ backgroundColor: bg_warna }}>
                      {temuanLabel}
                    </StyledTableCell>
                    <StyledTableCell rowSpan={2}>
                      <Button variant='contained' size='small' onClick={() => handleModalOpen(item)}>
                        <Icon icon='tabler:edit' fontSize={15} />
                        update
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>{lhi_temuan.uraian_temuan}</StyledTableCell>
                  </StyledTableRow>
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </Grid>
      {open && <FormLhiTemuan data={dataForm} open={open} handleClose={handleModalClose} />}
    </>
  )
}

export default ListTemuan
