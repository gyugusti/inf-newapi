'use client'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

const Index = ({ data, tab = 'daftar', searchParams = {} }) => {
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

  // Remove 'status' from query since server derives it from 'tab'
  const createLink = page => {
    const { status, ...rest } = searchParams || {}
    const params = new URLSearchParams({ ...rest, tab, page: String(page) })

    return `/dashboard/frontend/lvkf?${params.toString()}`
  }

  return (
    <div className='p-4'>
      <div className='mb-4 border-b border-gray-200'>
        <nav className='flex space-x-4'>
          <Link
            href='/dashboard/frontend/lvkf?tab=daftar'
            className={`px-3 py-2 -mb-px border-b-2 ${
              tab === 'daftar'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            Daftar
          </Link>
          <Link
            href='/dashboard/frontend/lvkf?tab=arsip'
            className={`px-3 py-2 -mb-px border-b-2 ${
              tab === 'arsip' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            Arsip
          </Link>
        </nav>
      </div>

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
                  <Link href={`/dashboard/frontend/lvkf/${item.lkf_id}`} className='text-blue-600 hover:underline'>
                    Detail
                  </Link>
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
          <Grid container justifyContent='center' mt={3}>
            <Pagination
              count={pagination.last_page}
              page={pagination.current_page}
              showFirstButton
              showLastButton
              size='small'
              renderItem={pItem => <PaginationItem component={Link} href={createLink(pItem.page ?? 1)} {...pItem} />}
            />
          </Grid>
        )}
      </Box>
    </div>
  )
}

export default Index
