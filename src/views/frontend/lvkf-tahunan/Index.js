'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Grid2 } from '@mui/material'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

// Import komponen MUI lab
import { TabContext, TabPanel } from '@mui/lab'
import MuiTabList from '@mui/lab/TabList'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'

import LkfActionMenu from './LkfActionMenu'

const CustomTabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(14)
  }
}))

const Index = ({ data, tab = 'daftar', searchParams = {} }) => {
  const router = useRouter()
  const items = Array.isArray(data?.data) ? data.data : []

  const currentPage = Number(data?.current_page ?? searchParams.page ?? 1)
  const perPage = Number(data?.per_page ?? searchParams.limit ?? 10)
  const total = Number(data?.total ?? items.length)
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const startIndex = (currentPage - 1) * perPage

  const pagination = {
    current_page: currentPage,
    last_page: Number(data?.last_page ?? totalPages)
  }

  const createLink = page => {
    const { status, ...rest } = searchParams || {}
    const params = new URLSearchParams({ ...rest, tab, page: String(page) })

    return `/frontend/lvkf-tahunan?${params.toString()}`
  }

  // handle change tab → redirect ke URL sesuai
  const handleChange = (e, newValue) => {
    const params = new URLSearchParams({ ...searchParams, tab: newValue })

    router.push(`/frontend/lvkf-tahunan?${params.toString()}`)
  }

  return (
    <TabContext value={tab}>
      <CustomTabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs'>
        <Tab value='daftar' label='DAFTAR' />
        <Tab value='arsip' label='ARSIP' />
      </CustomTabList>

      <Card>
        <CardContent>
          <TabPanel value={tab}>
            {/* <LkfCreateButton
              tahun={tahun}
              fasilitas={fasilitas}
              kelompokOptions={kelompok}
              propinsiOptions={propinsi}
              kabupatenOptions={kabupaten}
              alamatOptions={alamat}
              onCreated={() => router.refresh()}
              disabled={tab === 'arsip'}
            /> */}
            <div>
              <table className='min-w-full divide-y divide-gray-200 border border-gray-200 text-sm'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-4 py-2 text-left'>No.</th>
                    <th className='px-4 py-2 text-left'>Action</th>
                    <th className='px-4 py-2 text-left'>Kelompok</th>
                    <th className='px-4 py-2 text-left'>Kegiatan</th>
                    <th className='px-4 py-2 text-left'>Lokasi Pemanfaatan</th>
                    <th className='px-4 py-2 text-left'>LVKF</th>
                    <th className='px-4 py-2 text-left'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={7} className='px-4 py-4 text-center'>
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    items.map((item, idx) => (
                      <tr key={item.lkf_id ?? idx} className='border-t hover:bg-gray-50'>
                        <td className='px-4 py-2'>{startIndex + idx + 1}</td>
                        <td className='px-4 py-2'>
                          <LkfActionMenu lkf={item} />
                        </td>
                        <td className='px-4 py-2'>{item.kelompok?.nama ?? '-'}</td>
                        <td className='px-4 py-2'>{item.nama ?? '-'}</td>
                        <td className='px-4 py-2'>{item.lokasi_pemanfaatan ?? item.alamat_id ?? '-'}</td>
                        <td className='px-4 py-2'>{item.no_lkf ?? '-'}</td>
                        <td className='px-4 py-2'>
                          {item.status === 0 || item.status === '0' ? 'Draft' : (item.status ?? '-')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <Box mt={2} display='flex' justifyContent='center'>
                {pagination.last_page > 1 && (
                  <Grid2 container justifyContent='center' mt={3}>
                    <Pagination
                      count={pagination.last_page}
                      page={pagination.current_page}
                      showFirstButton
                      showLastButton
                      size='small'
                      renderItem={pItem => (
                        <PaginationItem component={Link} href={createLink(pItem.page ?? 1)} {...pItem} />
                      )}
                    />
                  </Grid2>
                )}
              </Box>
            </div>
          </TabPanel>
        </CardContent>
      </Card>
    </TabContext>
  )
}

export default Index
