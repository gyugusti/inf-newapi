import React from 'react'

import { useForm, Controller } from 'react-hook-form'
import { TextField, Autocomplete } from '@mui/material'

const CustomAutocomplete = ({ control, name, label, options, errors, required, sx, fullWidth = true, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { value = null, onChange } }) => {
        const selectedOption = options.find(option => `${option.value}` === `${value}`) || null

        return (
          <Autocomplete
            options={options}
            getOptionLabel={option => option.label || ''}
            value={selectedOption}
            onChange={(_, newValue) => {
              onChange(newValue ? newValue.value : '')
            }}
            isOptionEqualToValue={(option, currentValue) => {
              if (!currentValue) return false

              const current = typeof currentValue === 'object' ? currentValue.value : currentValue

              return `${option.value}` === `${current}`
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
        )
      }}
    />
  )
}

export default CustomAutocomplete
