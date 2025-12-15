import Grid2 from '@mui/material/Grid2'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'

const Page = ({ searchParams }) => {
  const regSrpId = searchParams?.reg_srp_id ?? ''

  const breadcrumbs = [
    { name: 'Update SRP', path: '/frontend/srp-update' },
    { name: 'Update SRP Detail' }
  ]

  return (
    <Grid2 container spacing={4} direction='column'>
      <Grid2>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      </Grid2>

      <Grid2>
        <p>Halaman update SRP.</p>
        <p>Parameter reg_srp_id: {regSrpId || 'Tidak tersedia'}</p>
      </Grid2>
    </Grid2>
  )
}

Page.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Page
