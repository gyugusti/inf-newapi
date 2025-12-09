import Grid2 from '@mui/material/Grid2'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import FormSrpReg from '@/views/frontend/srp/FormSrpReg'
import { updateRegistrasiSrp } from '../../server'

const Page = ({ params }) => {
  const { id } = params

  const breadcrumbs = [
    { name: 'Registrasi Sumber', path: '/frontend/srp-registrasi' },
    { name: 'Update Registrasi Sumber' }
  ]

  async function updateAction(formData) {
    'use server'
    
return updateRegistrasiSrp(id, formData)
  }

  return (
    <Grid2>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <FormSrpReg action={updateAction} />
    </Grid2>
  )
}

export default Page
