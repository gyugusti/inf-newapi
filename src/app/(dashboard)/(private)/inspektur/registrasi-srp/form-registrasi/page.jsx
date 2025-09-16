import { Grid2 } from '@mui/material'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import FormSumber from '@/views/validasi-srp/FormSumber'

const Page = () => {
  const breadcrumbs = [
    { name: 'Registrasi Sumber', path: '/inspektur/registrasi-srp' },
    { name: 'Form Registrasi Sumber' }
  ]

  return (
    <>
      <Grid2>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        <FormSumber />
      </Grid2>
    </>
  )
}

export default Page
