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
  FormLabel
} from '@mui/material'

import Tooltip from '@mui/material/Tooltip'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import CustomTextField from '@/@core/components/mui/TextField'


const FormEvaluasiFihi = ({ inkf, temuanItem, detailIkk }) => {
  // Initialize state with temuanItem data

  const [temuanValues, setTemuanValues] = useState(
    temuanItem.reduce((acc, item) => {
      acc[item.temuan_id] = {
        hasilEva: item.fihi_temuan?.hasil_temuan_id?.toString() || '2', // Default value for radio
        catatan: item.fihi_temuan?.uraian || '' // Default text for CustomTextField
      }

      return acc
    }, {})
  )

  // Function to handle changes for temuan fields
  const handleTemuanChange = (temuan_id, field, value) => {
    setTemuanValues(prevValues => ({
      ...prevValues,
      [temuan_id]: {
        ...prevValues[temuan_id],
        [field]: value
      }
    }))
  }

  // State for IKK selection

  const [ikkItem, setIkkItem] = useState(
    inkf.ikkNilai ? inkf.ikkNilai.ikk_item_id.toString() : detailIkk[3].ikk_item_id
  )

  const handleIkkItemChange = event => {
    setIkkItem(event.target.value)
  }

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <>
      <Grid container>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Kode Temuan</StyledTableCell>
              <StyledTableCell>Uraian</StyledTableCell>
              <StyledTableCell>Temuan</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {temuanItem.map((item, index) => {
              const { temuan_id, kode_temuan, nama_temuan } = item
              const itemValues = temuanValues[temuan_id] || {} // Current values for this item

              return (
                <Fragment key={index}>
                  <StyledTableRow>
                    <StyledTableCell align='center' rowSpan={2}>
                      {kode_temuan}

                      <input type='hidden' name='temuan_id' value={temuan_id} className='row' onChange={handleChange} />
                    </StyledTableCell>
                    <StyledTableCell>{nama_temuan}</StyledTableCell>
                    <StyledTableCell>
                      <FormControl>
                        <RadioGroup
                          row
                          value={itemValues.hasilEva}
                          aria-label='hasil-temuan'
                          name={`hasil-temuan${temuan_id}`}
                          id={`hasil-temuan${temuan_id}`}
                          onChange={e => handleTemuanChange(temuan_id, 'hasilEva', e.target.value)}
                        >
                          <FormControlLabel value='1' control={<Radio />} label='Ya' />
                          <FormControlLabel value='2' control={<Radio />} label='Tidak' />
                        </RadioGroup>
                      </FormControl>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell colSpan={2}>
                      <CustomTextField
                        fullWidth
                        multiline
                        maxRows={2}
                        minRows={2}
                        value={itemValues.catatan}
                        id={`catatan${temuan_id}`}
                        onChange={e => handleTemuanChange(temuan_id, 'catatan', e.target.value)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </Grid>
      <Grid container className='ikk' sx={{ width: '100%' }} justifyContent='space-around'>
        <FormControl fullWidth>
          <FormLabel component='legend'>&nbsp;</FormLabel>
          <RadioGroup
            row
            value={ikkItem}
            aria-label='ikk_item'
            name={`ikk_item${inkf.inkf_id}`}
            id={`ikk_item${inkf.inkf_id}`}
            onChange={handleIkkItemChange}
          >
            {detailIkk.map((item, index) => {
              const { ikk_item_id, kode, nilai_ikk, uraian } = item

              return (
                <Tooltip key={index} title={uraian} placement='top'>
                  <Grid
                    item
                    xs={12 / detailIkk.length}
                    sx={{ backgroundColor: '#d6cbe0', padding: 1, borderRadius: 1, textAlign: 'center' }}
                  >
                    <FormControlLabel value={ikk_item_id} control={<Radio />} label={`${kode} (${nilai_ikk})`} />
                  </Grid>
                </Tooltip>
              )
            })}
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  )
}

export default FormEvaluasiFihi
