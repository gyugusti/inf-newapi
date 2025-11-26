import { Grid2 } from '@mui/material'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import FormSrp from '@/views/frontend/srp/FormSrp'
import { createRegistrasiSrp } from '../server'

const Page = () => {
  const breadcrumbs = [
    { name: 'Registrasi Sumber', path: '/frontend/srp-registrasi' },
    { name: 'Form Registrasi Sumber' }
  ]

  return (
    <>
      <Grid2>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        <FormSrp onSubmitAction={createRegistrasiSrp} />
      </Grid2>
    </>
  )
}

export default Page
