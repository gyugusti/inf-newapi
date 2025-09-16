import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import CustomTextField from '@/@core/components/mui/TextField'

const FormLhisewaktu = ({ dataLhi }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    agenda: '',
    uraian: '',
    kesimpulan: '',
    keterangan: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (isEditing) {
      //   dispatch(editInkf({ inkf_id: inkf_id, dataform }))
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='agenda'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      multiline
                      maxRows={2}
                      minRows={2}
                      value={value}
                      label='Agenda'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.agenda)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.agenda && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='uraian'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      multiline
                      maxRows={2}
                      minRows={2}
                      value={value}
                      label='Uraian'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.uraian)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.uraian && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} marginTop={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='kesimpulan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      multiline
                      maxRows={2}
                      minRows={2}
                      value={value}
                      label='Kesimpulan'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.kesimpulan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.kesimpulan && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='keterangan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      multiline
                      maxRows={2}
                      minRows={2}
                      value={value}
                      label='Keterangan'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.keterangan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.keterangan && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={5} marginTop={2}>
              <Grid size={{ xs: 12 }}>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default FormLhisewaktu
