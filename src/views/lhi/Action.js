import React, { Fragment, useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { Button } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch } from 'react-redux'

import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'

import { deleteLhi } from '@/redux-store/lhi'

const Action = ({ dataLhi }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const lhiId = dataLhi.lhi_id

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
          Hapus Lhi
        </Button>

        <Link
          href={{
            pathname: '/cetak/lhi',
            query: { id: lhiId }
          }}
          passHref
          target='_blank'
        >
          <Button variant='contained' size='small' sx={{ mb: 2, '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:file' />
            View LHI Pdf
          </Button>
        </Link>

        <Link
          href={{
            pathname: `${dataLhi.jadwal_fas?.jadwal_id}`, // replace with correct path
            query: { id: dataLhi.jadwal_fas?.jadwal_id }
          }}
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
        Id={lhiId}
        onConfirm={lhiId => {
          if (lhiId !== 'no') {
            dispatch(deleteLhi({ id: lhiId }))
            router.push(`/inspektur/lhi/${dataLhi.jadwal_fas.jadwal_id}`)
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default Action
