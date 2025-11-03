'use client'

// ** React Imports
import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid2'

import Priview from '@/views/jadwal/Priview'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { getdetailJadwal } from '@/redux-store/jadwal'
import ListAlamat from '@/views/jadwal/fas/ListAlamat'
import Inspektur from '@/views/jadwal/Inspektur'
import PreviewActions from '@/views/jadwal/PreviewAction'

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
        <Grid size={{ xs: 12, md: 8, xl: 9 }}>{detailJadwal && <Priview detail={detailJadwal} />}</Grid>
        <Grid size={{ xs: 12, md: 4, xl: 3 }}>
          <PreviewActions id={id} detail={detailJadwal} />
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
