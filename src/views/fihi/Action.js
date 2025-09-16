import React, { Fragment, useState } from 'react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import { Button } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch } from 'react-redux'

import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'

import { deleteFihi } from '@/redux-store/fihi'

const Action = ({ dataFihi }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const fihiId = dataFihi.fihi_id

  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleDeleteClick = () => {
    setShowConfirmationDel(true)
  }

  return (
    <>
      <Fragment>
        <Button
          size='small'
          sx={{ mb: 2, '& svg': { mr: 2 } }}
          target='_blank'
          variant='tonal'
          color='error'
          onClick={handleDeleteClick}
        >
          <Icon fontSize='1.125rem' icon='tabler:trash' />
          Hapus Fihi
        </Button>

        <Link
          href={{
            pathname: '/cetak/fihi',
            query: { id: fihiId }
          }}
          passHref
          target='_blank'
        >
          <Button variant='contained' size='small' sx={{ mb: 2, '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:file' />
            Cetak Fihi
          </Button>
        </Link>

        <Link
          href={{
            pathname: '/cetak/fihi-resume',
            query: { id: fihiId }
          }}
          passHref
          target='_blank'
        >
          <Button size='small' variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:map' />
            Cetak Resume Fihi
          </Button>
        </Link>

        <Link
          href={{ pathname: `${dataFihi.jadwal_fas?.jadwal_id}`, query: { id: dataFihi.jadwal_fas?.jadwal_id } }}
          passHref
        >
          <Button size='small' sx={{ mb: 2, '& svg': { mr: 2 } }} variant='tonal' color='success'>
            <Icon fontSize='1.125rem' icon='tabler:arrow-back' />
            Kembali
          </Button>
        </Link>
      </Fragment>

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={setShowConfirmationDel} // Fix: setState function
        Id={fihiId}
        onConfirm={fihiId => {
          if (fihiId !== 'no') {
            dispatch(deleteFihi({ id: fihiId }))
            router.push(`/inspektur/fihi/${dataFihi.jadwal_fas.jadwal_id}`)
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default Action
