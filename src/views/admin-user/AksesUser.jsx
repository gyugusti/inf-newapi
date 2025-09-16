'use client'
import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { Box, Grid2 } from '@mui/material'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'

import { deleteAkses, getRoleInspeksi, getUserAkses, storeAkses } from '@/redux-store/admin-user'
import ShadowBox from '@/components/styles/ShadowBox'

const AksesUser = () => {
  const dispatch = useDispatch()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const username = searchParams.get('username')

  const { tab, isLoading, userAkses, roleInspeksi } = useSelector(store => store.akun)

  useEffect(() => {
    if (id) {
      dispatch(getUserAkses(id))
      dispatch(getRoleInspeksi())
    }
  }, [dispatch, id, tab])

  const handleAdd = level => {
    const dataform = {
      akses: level
    }

    dispatch(storeAkses({ id: id, dataform }))
  }

  const handleDelete = id => {
    dispatch(deleteAkses(id))
  }

  return (
    <>
      <Card>
        <CardContent>
          <div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Nama:
                </Typography>
                <Typography>{searchParams.get('nama')}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Username:
                </Typography>
                <Typography>{username}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Email
                </Typography>
                <Typography color='text.primary'>{searchParams.get('email')}</Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Grid2 container paddingTop={2}>
        <Grid2 size={{ xl: 12, md: 6, xs: 12, sm: 12 }} paddingRight={2}>
          <ShadowBox>
            <h3>List Hak Akses</h3>
            <table>
              <tbody>
                {roleInspeksi.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Button
                          variant='outlined'
                          size='small'
                          startIcon={<i className='tabler-plus' />}
                          onClick={() => handleAdd(item.id)}
                          className='max-sm:is-full'
                        >
                          {item.nama}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </ShadowBox>
        </Grid2>
        <Grid2 size={{ xl: 12, md: 6, xs: 12, sm: 12 }} paddingRight={2}>
          <ShadowBox>
            <h3>Hak Akses Terpasang</h3>
            <table>
              <tbody>
                {userAkses.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Button
                          variant='contained'
                          size='small'
                          startIcon={<i className='tabler-minus' />}
                          onClick={() => handleDelete(item.id)}
                          className='max-sm:is-full'
                        >
                          {item.akses_infara.nama}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </ShadowBox>
        </Grid2>
      </Grid2>
    </>
  )
}

export default AksesUser
