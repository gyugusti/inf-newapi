import Grid2 from '@mui/material/Grid2'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import FormSrpReg from '@/views/frontend/srp/FormSrpReg'
import { fetchRegistrasiSrpDetail } from '../server'
import { updateRegistrasiSrp } from '@/app/(dashboard)/(private)/frontend/srp-registrasi/server'

const Page = async ({ searchParams }) => {
  const regSrpId = searchParams?.reg_srp_id ?? ''

  const detailData = regSrpId ? await fetchRegistrasiSrpDetail(regSrpId) : null

  const breadcrumbs = [
    { name: 'Update SRP', path: '/frontend/srp-update' },
    { name: 'Update SRP Detail' }
  ]

  async function updateAction(formData) {
    'use server'

    return updateRegistrasiSrp(regSrpId, formData)
  }

  return (
    <Grid2 container spacing={4} direction='column'>
      <Grid2>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      </Grid2>

      <Grid2>
        <FormSrpReg data={detailData} action={updateAction} />
      </Grid2>
    </Grid2>
  )
}

Page.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Page
