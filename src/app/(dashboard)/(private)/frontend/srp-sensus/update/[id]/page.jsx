import Grid2 from '@mui/material/Grid2'

import { updateRegistrasiSrp } from '@/app/(dashboard)/(private)/frontend/srp-registrasi/server'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { fetchRegistrasiSrpDetail } from '../../../srp-update/server'
import SrpSensusUpdateTabs from './SrpSensusUpdateTabs'

const Page = async ({ params }) => {
  const p = await params
  const regSrpId = p?.id ?? ''

  const detailData = regSrpId ? await fetchRegistrasiSrpDetail(regSrpId) : null

  const breadcrumbs = [{ name: 'Update SRP', path: '/frontend/srp-sensus' }, { name: 'Update SRP Detail' }]

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
        <SrpSensusUpdateTabs detailData={detailData} updateAction={updateAction} />
      </Grid2>
    </Grid2>
  )
}

Page.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Page
