import { Grid2 } from '@mui/material'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import AksesUser from '@/views/admin-user/AksesUser'

const Page = () => {
  const breadcrumbs = [
    { name: 'Referensi', path: '/admin-user' },
    { name: 'Akun Bapeten', path: '/admin-user/akun-balis' },
    { name: 'Akses User' }
  ]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Grid2>
        <AksesUser />
      </Grid2>
    </>
  )
}

export default Page
