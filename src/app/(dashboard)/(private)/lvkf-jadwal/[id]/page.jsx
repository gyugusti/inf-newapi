'use client'

import { useState, useEffect } from 'react'

// ** MUI Imports
import { useParams, useSearchParams } from 'next/navigation'

import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import { CustomTabList } from '@/components/styles/TabPIlls'
import CardInkf from '@/views/lvkf/CardInkf'
import DetailLkf from '@/views/lvkf/DetailLkf'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { getShowLkf, setSubtab, simpanEva } from '@/redux-store/lkf'
import Kesimpulan from '@/views/lvkf/Kesimpulan'
import { getIkk } from '@/redux-store/admin-referensi/ikk'
import Loading from '@/components/Loading'

const Index = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const id = params.id

  const { detailLkf, isLoading, tab } = useSelector(store => store.lkf)
  const { ikk } = useSelector(store => store.ikk)

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setSubtab(newValue)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getShowLkf(id))
    }
  }, [id, dispatch, tab])

  useEffect(() => {
    dispatch(getIkk())
  }, [dispatch])

  const defaultValues = {
    nama_tabel: '',
    keterangan: ''
  }

  const [formValues, setFormValues] = useState({
    inkf_id: [],
    hasil_eva: [],
    catatan: [],
    ikk_item: []
  })

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target

    const inkfIds = [...form.querySelectorAll('[name="inkf_id"]')].map(({ value }) => value)

    const hasilEvas = inkfIds.map(inkfId => {
      const group = document.getElementById(`hasil-eva${inkfId}`)
      const checkedRadio = group?.querySelector('input[type="radio"]:checked')

      return checkedRadio?.value ?? null
    })

    const catatans = inkfIds.map(inkfId => {
      const input = document.getElementById(`catatan${inkfId}`)

      return input ? input.value : null
    })

    const ikkItems = inkfIds.map(inkfId => {
      const group = document.getElementById(`ikk_item${inkfId}`)
      const checkedRadio = group?.querySelector('input[type="radio"]:checked')

      return checkedRadio?.value ?? null
    })

    // Do something with the form values
    const dataform = {
      inkf_id: inkfIds,
      hasil_eva: hasilEvas,
      ikk_item: ikkItems,
      catatan: catatans
    }

    dispatch(simpanEva({ id: detailLkf.lkf_id, dataform }))
  }

  const breadcrumbs = [{ name: 'LVKF JADWAL', path: '/lvkf-jadwal' }, { name: 'Detail' }]

  if (!id) {
    return <Loading />
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <br />
      <Grid>{detailLkf && <DetailLkf detail={detailLkf} />}</Grid>
      <Grid marginTop={4}>
        <TabContext value={value}>
          {!isLoading && (
            <CustomTabList onChange={handleChange} aria-label='simple tabs example'>
              <Tab value='1' label='Data LVKF' sx={{ backgroundColor: 'background.paper', borderRadius: 1 }} />
              <Tab value='2' label='Kesimpulan' sx={{ backgroundColor: 'background.paper', borderRadius: 1 }} />
            </CustomTabList>
          )}
          <TabPanel value='1' sx={{ padding: 0 }}>
            {isLoading ? (
              <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <Grid>
                <form id='myForm' onSubmit={handleSubmit}>
                  <div id='loop'>
                    {detailLkf.inkf && detailLkf.inkf.length > 0 ? (
                      detailLkf.inkf.map((item, index) => (
                        <CardInkf
                          ikk={ikk}
                          item={item}
                          detailLkf={detailLkf}
                          key={index}
                          no={index + 1}
                          action='view'
                        />
                      ))
                    ) : (
                      <Box
                        sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                      >
                        <CircularProgress sx={{ mb: 4 }} />
                        <Typography>Loading...</Typography>
                      </Box>
                    )}
                  </div>
                  <Grid container spacing={5}>
                    <Grid size={{ xs: 6, md: 8, sm: 8 }}>
                      {detailLkf.inkf && (
                        <Button variant='contained' type='submit'>
                          Submit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            )}
          </TabPanel>
          <TabPanel value='2' sx={{ padding: 0 }}>
            {detailLkf.inkf && detailLkf.inkf.length > 0 ? (
              <Kesimpulan lkf_id={id} detailLkf={detailLkf} />
            ) : (
              <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            )}
          </TabPanel>
        </TabContext>
      </Grid>
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default Index
