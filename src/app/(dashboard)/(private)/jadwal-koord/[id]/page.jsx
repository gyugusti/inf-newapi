'use client'

// ** React Imports
import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Priview from '@/views/jadwal/Priview'
import { Icon } from '@iconify/react/dist/iconify.js'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { getdetailJadwal } from '@/redux-store/jadwal'
import ListAlamat from '@/views/jadwal/fas/ListAlamat'
import Inspektur from '@/views/jadwal/Inspektur'

const Detail = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { detailJadwal, isLoading, tab } = useSelector(store => store.jadwal)

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getdetailJadwal(id))
    }
  }, [id, dispatch, tab])

  const breadcrumbs = [{ name: 'Jadwal Inspeksi', path: '/jadwal-koord' }, { name: 'Detail' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />

      <Grid container spacing={6} sx={{ marginTop: 2 }}>
        <Grid size={{ xs: 12, md: 12, xl: 12 }}>
          {detailJadwal && <Priview detail={detailJadwal} />}

          <Button
            sx={{ mb: 2, '& svg': { mr: 2 } }}
            variant='tonal'
            component={Link}
            color='primary'
            href={`/jadwal-koord`}
          >
            <Icon fontSize='1.125rem' icon='tabler:arrow-back' />
            Kembali
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 4 }}>
        <Grid size={{ xs: 12 }}>{detailJadwal && <Inspektur detail={detailJadwal} />}</Grid>
      </Grid>

      <Grid container sx={{ marginTop: 4 }}>
        <Grid size={{ xs: 12 }}>{detailJadwal && <ListAlamat detail={detailJadwal} />}</Grid>
      </Grid>
    </>
  )
}

Detail.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default Detail
