import React, { forwardRef } from 'react'

import MenuItem from '@mui/material/MenuItem'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import CustomTextField from '@/@core/components/mui/TextField'
import { TIPE_KOLOM } from '@/configs/lkfConfig'
import 'react-datepicker/dist/react-datepicker.css'

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormTabel = ({ data, tipe, onChange, value, label, error }) => {
  //console.log(data)
  if (tipe === TIPE_KOLOM.JENIS_TEXT) {
    return <CustomTextField fullWidth value={value} label={label} onChange={onChange} placeholder='' error={error} />
  } else if (tipe === TIPE_KOLOM.JENIS_AREA) {
    return (
      <CustomTextField
        rows={4}
        fullWidth
        multiline
        value={value}
        label={label}
        onChange={onChange}
        error={error}
        aria-describedby='validation-basic-textarea'
      />
    )
  } else if (tipe === TIPE_KOLOM.JENIS_PICKER) {
    return <CustomTextField fullWidth value={value} label={label} onChange={onChange} placeholder='' error={error} />

    return (
      <AppReactDatepicker
        selected={value}
        showYearDropdown
        showMonthDropdown
        onChange={onChange}
        placeholderText='MM/DD/YYYY'
        customInput={
          <CustomInput
            value={value}
            onChange={onChange}
            label={label}
            error={error}
            aria-describedby='validation-basic-dob'
          />
        }
      />
    )
  } else if (tipe === TIPE_KOLOM.JENIS_SELECT) {
    const referensiArray = data.data_referensi.split(';')

    return (
      <CustomTextField
        select
        fullWidth
        label={label}
        SelectProps={{
          value: value,
          onChange: onChange
        }}
        id='validation-basic-select'
        error={error}
        aria-describedby='validation-basic-select'
      >
        {referensiArray.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </CustomTextField>
    )
  } else {
    return <div>Unsupported input type</div>
  }
}

export default FormTabel
