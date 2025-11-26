'use client'
import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { Typography, IconButton, CircularProgress, Chip } from '@mui/material'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'

import {
  getRegistrasiSrp,
  changePage,
  clearFilters,
  clearValues,
  deleteRegSumber,
  kevalidatorRegSumber,
  kirimOtorisatorSrp,
  selesaiSrp,
  tolakSrp,
  kembalikanSrp
} from '@/redux-store/validasi-data'
import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import OptionMenu from '@/@core/components/option-menu'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import LogSrp from '../validasi-srp/LogSrp'
import ActionsColumn from './ActionColumn'
import { getTahapanValidasi, getFlagValid, getFlagLengkap } from '@/utils/balishelper'
import SearchValidasi from '../validasi-srp/SearchValidasi'

const ViewRegSrp = ({ view }) => {
  const dispatch = useDispatch()
  const columnHelper = createColumnHelper()
  const { data: session } = useSession()
  const pathname = usePathname()
  const username = session?.user?.name || ''

  const [open, setOpen] = useState(false)
  const [openlog, setOpenlog] = useState(false)
  const [opendispo, setOpendispo] = useState(false)
  const [datasrp, setDatarp] = useState(false)

  const [regsrpId, setRegsrpId] = useState()
  const [fasId, setFasId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [showConfirmationSendOtorisator, setShowConfirmationSendOtorisator] = useState(false)
  const [showConfirmationSelesai, setShowConfirmationSelesai] = useState(false)
  const [showConfirmationKembalikan, setShowConfirmationKembalikan] = useState(false)
  const [showConfirmationTolak, setShowConfirmationTolak] = useState(false)

  const { total, tab, per_page, current_page, listRegsrp, tahap_reg_id, isLoading, cari } = useSelector(
    store => store.validasiData
  )

  useEffect(() => {
    dispatch(clearValues())
    dispatch(clearFilters())
  }, [pathname, dispatch])

  useEffect(() => {
    dispatch(getRegistrasiSrp())
  }, [dispatch, current_page, tahap_reg_id, tab, cari, per_page, total])

  const handlePageChange = newPage => {
    dispatch(changePage(newPage))
  }

  const handleShowLog = (regsrpId, fas_id) => {
    setRegsrpId(regsrpId)
    setFasId(fas_id)
    setOpenlog(true)
  }

  const handleModalClose = () => {
    setOpen(false)
    setOpenlog(false)
    setOpendispo(false)
  }

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'no',
        header: 'No',
        cell: ({ row }) => <Typography>{(current_page - 1) * per_page + row.index + 1}</Typography>
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => <ActionsColumn row={row} handleShowLog={handleShowLog} view={view} />,
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
            {row.original.tahapan.nama}
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

      // columnHelper.accessor('tipe_tabung', {
      //   header: 'Tipe Tabung',
      //   cell: ({ row }) => <Typography></Typography>
      // }),
      // columnHelper.accessor('no_seri_tabung', {
      //   header: 'No Seri Tabung',
      //   cell: ({ row }) => <Typography></Typography>
      // }),
      columnHelper.accessor('jenis_sumber', {
        header: 'Jenis Sumber',
        cell: ({ row }) => <Typography>{row.original.jenis_sumber?.nama || 'N/A'}</Typography>
      }),
      columnHelper.accessor('fasilitas', {
        header: 'Fasilitas',
        cell: ({ row }) => <Typography>{row.original.fasilitas?.nama || 'N/A'}</Typography>
      })
    ],
    [current_page, per_page, columnHelper, view]
  )

  const table = useReactTable({
    data: listRegsrp || [],
    columns,
    pageCount: Math.ceil(total / per_page),
    state: {
      pagination: {
        pageIndex: current_page - 1,
        pageSize: per_page
      }
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center py-10'>
          <CircularProgress color='inherit' />
        </div>
      ) : (
        <>
          <SearchValidasi showExcelSelect={true} />

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
            per_page={per_page}
            current_page={current_page}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {openlog && <LogSrp fasId={fasId} regsrpId={regsrpId} open={openlog} handleClose={handleModalClose} />}
    </>
  )
}

export default ViewRegSrp
