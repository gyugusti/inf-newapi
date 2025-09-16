'use client'

import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { CircularProgress, Grid2 } from '@mui/material'

import { getSensusSrpDetail } from '@/redux-store/validasi-data'
import FormSrp from '@/views/sensus-srp/FormSrp'

const Page = () => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const id = searchParams.get('id')

  const { detailSrp } = useSelector(store => store.validasiData)

  useEffect(() => {
    if (id) {
      dispatch(getSensusSrpDetail(id))
    }
  }, [dispatch, id])

  return (
    <>
      <Grid2>
        {detailSrp != '' ? (
          <FormSrp data={detailSrp} />
        ) : (
          <div className='flex justify-center items-center h-40'>
            <CircularProgress />
          </div>
        )}
      </Grid2>
    </>
  )
}

export default Page
