'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'

import { Button, Card, CardContent, CardHeader, CircularProgress, MenuItem, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import CustomTextField from '@/@core/components/mui/TextField'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { getFlagLengkap, getFlagValid } from '@/utils/balishelper'
import tableStyles from '@core/styles/table.module.css'
import Link from 'next/link'
import ActionsColumn from './ActionColumn'
import LogSrp from './LogSrp'

const PER_PAGE_OPTIONS = [5, 10, 20, 50, 100, 500]

const IndexReg = ({ data = [], currentPage, perPage, total, totalPages, searchTerm }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const columnHelper = createColumnHelper()

  const [openlog, setOpenlog] = useState(false)
  const [regsrpId, setRegsrpId] = useState()
  const [fasId, setFasId] = useState()
  const [cariValue, setCariValue] = useState(searchTerm || '')
  const [perPageValue, setPerPageValue] = useState(perPage)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setCariValue(searchTerm || '')
  }, [searchTerm])

  useEffect(() => {
    setPerPageValue(perPage)
  }, [perPage])

  const handleShowLog = useCallback((selectedRegsrpId, selectedFasId) => {
    setRegsrpId(selectedRegsrpId)
    setFasId(selectedFasId)
    setOpenlog(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setOpenlog(false)
  }, [])

  const updateSearchParams = useCallback(
    newParams => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      })

      const target = params.toString() ? `${pathname}?${params.toString()}` : pathname

      startTransition(() => {
        router.push(target, { scroll: false })
      })
    },
    [pathname, router, searchParams, startTransition]
  )

  const handleSearchSubmit = useCallback(
    event => {
      event.preventDefault()
      updateSearchParams({ cari: cariValue, per_page: perPageValue, page: undefined })
    },
    [cariValue, perPageValue, updateSearchParams]
  )

  const handleReset = useCallback(() => {
    setCariValue('')
    updateSearchParams({ cari: undefined, per_page: undefined, page: undefined })
  }, [updateSearchParams])

  const handlePageChange = useCallback(
    page => {
      updateSearchParams({ page })
    },
    [updateSearchParams]
  )

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'no',
        header: 'No',
        cell: ({ row }) => <Typography>{(currentPage - 1) * perPage + row.index + 1}</Typography>
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => <ActionsColumn row={row} handleShowLog={handleShowLog} view='registrasi' />,
        enableSorting: false
      }),
      columnHelper.accessor('no_reg', {
        header: 'No Reg',
        cell: ({ row }) => <Typography>{row.original.no_reg}</Typography>
      }),
      columnHelper.accessor('Kode Sumber', {
        header: 'Kode Sumber',
        cell: ({ row }) => <Typography>{row.original.master_sumber_id?.toString().padStart(7, '0')}</Typography>
      }),
      columnHelper.accessor('tahap_reg_id', {
        header: 'Status',
        cell: ({ row }) => (
          <div>
            {row.original.tahapan?.nama}
            <br />
            {getFlagValid(row.original.flag_valid)} <br />
            {getFlagLengkap(row.original.flag_lengkap)}
          </div>
        )
      }),
      columnHelper.accessor('validator_id', {
        header: 'Validator',
        cell: ({ row }) => <div>{row.original.validator?.username}</div>
      }),
      columnHelper.accessor('merk_sumber', {
        header: `Merk Unit/Radionuklida Tipe/No Seri`,
        cell: ({ row }) => (
          <Typography>
            {row.original.merk_sumber?.nama || 'N/A'} <br />
            {row.original.tipe} <br /> {row.original.no_seri}
          </Typography>
        )
      }),
      columnHelper.accessor('merk_tabung', {
        header: 'Merk Tabung Tipe/No Seri',
        cell: ({ row }) => (
          <Typography>
            {row.original.tabung?.nama || '-'} <br /> {row.original.tipe_tabung?.tipe_tabung || '-'} <br />
            {row.original.no_seri_tabung?.no_seri_tabung || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('jenis_sumber', {
        header: 'Jenis Sumber',
        cell: ({ row }) => <Typography>{row.original.jenis_sumber?.nama || 'N/A'}</Typography>
      }),
      columnHelper.accessor('fasilitas', {
        header: 'Fasilitas',
        cell: ({ row }) => <Typography>{row.original.fasilitas?.nama || 'N/A'}</Typography>
      })
    ],
    [columnHelper, currentPage, handleShowLog, perPage]
  )

  const table = useReactTable({
    data: Array.isArray(data) ? data : [],
    columns,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: Math.max(currentPage - 1, 0),
        pageSize: perPage
      }
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card>
      <CardHeader
        title={` Registrasi SRP`}
        action={
          <Link href='/frontend/srp-registrasi/form-registrasi' passHref>
            <Button variant='contained' color='primary'>
              Create Registrasi SRP
            </Button>
          </Link>
        }
      />
      <CardContent>
        <form onSubmit={handleSearchSubmit} className='mb-4'>
          <Grid container spacing={2} alignItems='center'>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomTextField
                fullWidth
                value={cariValue}
                label=''
                onChange={event => setCariValue(event.target.value)}
                placeholder='Cari...'
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomTextField
                select
                fullWidth
                value={perPageValue}
                onChange={event => setPerPageValue(Number(event.target.value))}
                label=''
              >
                {PER_PAGE_OPTIONS.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} container justifyContent='flex-end' spacing={2}>
              <Grid>
                <Button type='submit' variant='outlined'>
                  Cari
                </Button>
              </Grid>
              <Grid>
                <Button variant='tonal' color='primary' type='button' onClick={handleReset}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>

        {isPending ? (
          <div className='flex justify-center items-center py-10'>
            <CircularProgress color='inherit' />
          </div>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <TablePaginationComponent
              total={total}
              per_page={perPage}
              current_page={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </CardContent>

      {openlog && <LogSrp fasId={fasId} regsrpId={regsrpId} open={openlog} handleClose={handleModalClose} />}
    </Card>
  )
}

export default IndexReg
