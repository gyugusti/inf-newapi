'use client'
import React, { Fragment, useEffect } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import Link from 'next/link'

import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'

import { clearValues, getTemuanLib } from '@/redux-store/admin-referensi/temuan'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import ItemInkf from '@/views/admin-referensi/temuan/ItemInkf'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'Library Temuan', path: '/admin-referensi/temuan' },
  { name: 'Temuan Item' }
]

const Inkf = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const nama = searchParams.get('nama')
  const inkf_id = searchParams.get('inkf_id')

  const dispatch = useDispatch()

  const { temuanLib, tab } = useSelector(store => store.temuan)

  const itemLib = temuanLib.filter(rows => rows.inkf_id === Number(inkf_id))

  useEffect(() => {
    dispatch(getTemuanLib())
  }, [dispatch, inkf_id, tab])

  return (
    <Fragment>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title={nama}
            sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
            action={
              <Link
                href={{
                  pathname: `/admin-referensi/temuan/inkf/form`,
                  query: { inkf_id: inkf_id, nama: nama }
                }}
                onClick={() => dispatch(clearValues(inkf_id))}
              >
                <Button variant='tonal'>Tambah Data</Button>
              </Link>
            }
          />
          <CardContent>{itemLib && <ItemInkf itemLib={itemLib} />}</CardContent>
        </Card>
      </Grid>
    </Fragment>
  )
}

export default Inkf
