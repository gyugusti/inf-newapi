'use client'
import React, { Fragment, useEffect, useState } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import Link from 'next/link'

import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import InkfKel from '@/views/admin-referensi/temuan/InkfKel'
import { getTemuanKel, setCreate } from '@/redux-store/admin-referensi/temuan'


import Tambahitem from '@/views/admin-referensi/temuan/Tambahitem'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'Library Temuan', path: '/admin-referensi/temuan' },
  { name: 'Temuan Item' }
]

const TemuanKelompok = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const params = useParams()
  const searchParams = useSearchParams()

  const kelompok_id = params.kelompok_id
  const nama = searchParams.get('nama') || ''

  const { isEditing } = useSelector(store => store.temuan)

  useEffect(() => {
    dispatch(getTemuanKel(kelompok_id))
  }, [dispatch, kelompok_id])

  return (
    <>
      <Fragment>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  Kelompok : {nama} (ID. {kelompok_id}){' '}
                </Grid>
                <Grid size={{ xs: 2 }}>
                  {!isEditing && (
                    <Button variant='tonal' onClick={() => dispatch(setCreate())}>
                      Tambah Item
                    </Button>
                  )}
                </Grid>
              </Grid>
              {isEditing ? (
                <Tambahitem kelompok_id={kelompok_id} nama={nama} />
              ) : (
                <InkfKel kelompok_id={kelompok_id} nama={nama} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Fragment>
    </>
  )
}

export default TemuanKelompok
