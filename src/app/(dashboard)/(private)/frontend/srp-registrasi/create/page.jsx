import { Grid2 } from '@mui/material'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import FormSrpReg from '@/views/frontend/srp/FormSrpReg'
import { createRegistrasiSrp } from '../server'

const Page = () => {
  const breadcrumbs = [
    { name: 'Registrasi Sumber', path: '/frontend/srp-registrasi' },
    { name: 'Form Registrasi Sumber' }
  ]

  async function createAction(formData) {
    'use server'

    return createRegistrasiSrp(formData)
  }

  return (
    <>
      <Grid2>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        <FormSrpReg action={createAction} />
      </Grid2>
    </>
  )
}

export default Page
