'use client'

import { Fragment, useEffect } from 'react'

import Link from 'next/link'

import {
  Checkbox,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'


import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { getIkk, setDetail } from '@/redux-store/admin-referensi/ikk'
import { getInkf } from '@/redux-store/admin-referensi/inkf'
import IkkItem from '@/views/admin-referensi/ikk/IkkItem'

const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Data IKK' }]

const Index = () => {
  const dispatch = useDispatch()

  const { inkf, isLoading, tab } = useSelector(store => store.inkf)
  const { ikk } = useSelector(store => store.ikk)

  useEffect(() => {
    dispatch(getInkf())
    dispatch(getIkk())
  }, [dispatch])

  const toggleDetail = inkf_id => {
    // dispatch(setDetail(inkf_id))
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell component='th'>No</TableCell>
                  <TableCell colSpan={3}>IKK</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inkf.map((item, index) => {
                  const { inkf_id, nama } = item
                  const ikkItem = ikk.filter(rows => rows.inkf_id === inkf_id)

                  return (
                    <Fragment key={index}>
                      <TableRow key={index} hover={true}>
                        <TableCell component='th'>
                          <b>{index + 1}</b>
                        </TableCell>
                        <TableCell component='th' colSpan={2} sx={{ textTransform: 'uppercase' }}>
                          <b>{nama}</b>
                        </TableCell>
                        <TableCell component='th'>
                          <Link
                            href={{
                              pathname: `ikk/${inkf_id}`,
                              query: { inkf_id: inkf_id, nama: nama }
                            }}
                            onClick={() => toggleDetail(inkf_id)}
                          >
                            <Icon icon='tabler:settings' fontSize={20} />
                          </Link>
                        </TableCell>
                      </TableRow>
                      {ikkItem && <IkkItem ikkItem={ikkItem} inkf_id={inkf_id} />}
                    </Fragment>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default Index
