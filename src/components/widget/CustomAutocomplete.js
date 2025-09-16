import React from 'react'

import { useForm, Controller } from 'react-hook-form'
import { TextField, Autocomplete } from '@mui/material'

const CustomAutocomplete = ({ control, name, label, options, errors, required, sx, fullWidth = true, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { value = null, onChange } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={option => option.label || ''}
          value={options.find(option => option.value === value) || null}
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.value : '')
          }}
          sx={sx}
          {...rest}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              fullWidth={fullWidth}
              error={Boolean(errors)}
              size='small'
              helperText={errors ? errors.message : ''}
            />
          )}
        />
      )}
    />
  )
}

export default CustomAutocomplete
