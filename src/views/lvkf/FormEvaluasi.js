import React, { useState } from 'react'

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomTextField from '@/@core/components/mui/TextField'

const FormEvaluasi = ({ inkf, detailIkk }) => {
  const evaluasi = inkf.evaluasi[0]

  // const [value, setValue] = useState(evaluasi ? evaluasi.catatan : '')
  // const [hasilEva, setHasilEva] = useState(evaluasi ? evaluasi.hasil_eva_id.toString() : 2)
  // const [ikkItem, setIkkItem] = useState(evaluasi ? evaluasi.ikk_item_id.toString() : detailIkk[3].ikk_item_id)

  const [value, setValue] = useState(evaluasi?.catatan ?? '')
  const [hasilEva, setHasilEva] = useState(evaluasi?.hasil_eva_id?.toString() ?? '2')
  const [ikkItem, setIkkItem] = useState(evaluasi?.ikk_item_id?.toString() ?? detailIkk[3].ikk_item_id?.toString())

  // const [ikkItem, setIkkItem] = useState(
  //   evaluasi ? evaluasi.ikk_item_id.toString() : detailIkk[3].ikk_item_id.toString()
  // )

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleHasilEvaChange = event => {
    setHasilEva(event.target.value)
  }

  const handleIkkItemChange = event => {
    setIkkItem(event.target.value)
  }

  return (
    <>
      <Grid container>
        <Grid size={{ xs: 6, md: 6, sm: 6 }}>
          <FormControl>
            <FormLabel component='legend'>Hasil Evaluasi {inkf.inkf_id} </FormLabel>
            <RadioGroup
              row
              value={hasilEva}
              aria-label='hasil-eva'
              id={`hasil-eva${inkf.inkf_id}`}
              name={`hasil-eva${inkf.inkf_id}`}
              className='row'
              onChange={handleHasilEvaChange}
            >
              <FormControlLabel value='1' control={<Radio />} label='Lengkap' />
              <FormControlLabel value='2' control={<Radio />} label='Tidak Lengkap' />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6, md: 6, sm: 6 }}>
          <CustomTextField
            multiline
            maxRows={4}
            minRows={3}
            value={value}
            name={`catatan${inkf.inkf_id}`}
            label='Catatan'
            onChange={handleChange}
            id={`catatan${inkf.inkf_id}`}
          />
        </Grid>
      </Grid>
      <Grid container>
        <FormControl>
          <FormLabel component='legend'>Nilai IKK {inkf.inkf_id}</FormLabel>
          <RadioGroup
            row
            value={ikkItem}
            aria-label='ikk_item'
            name={`ikk_item${inkf.inkf_id}`}
            className='row'
            id={`ikk_item${inkf.inkf_id}`}
            onChange={handleIkkItemChange}
          >
            {detailIkk.map((item, index) => {
              const { ikk_item_id, kode, nilai_ikk } = item

              return (
                <FormControlLabel
                  key={index}
                  value={ikk_item_id}
                  control={<Radio />}
                  label={`${kode} ( ${nilai_ikk} ) `}
                />
              )
            })}
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  )
}

export default FormEvaluasi
