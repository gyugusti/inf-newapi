'use client'
import { useEffect, useMemo, useState } from 'react'

import { usePathname } from 'next/navigation'

import { CircularProgress, Typography } from '@mui/material'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'

import TablePaginationComponent from '@/components/TablePaginationComponent'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import {
  changePage,
  clearFilters,
  clearValues,
  deleteRegSumber,
  getRegistrasiSrp,
  kembalikanSrp,
  kevalidatorRegSumber,
  kirimOtorisatorSrp,
  selesaiSrp,
  tolakSrp
} from '@/redux-store/validasi-data'
import { getFlagLengkap, getFlagValid, getJenisValidasi } from '@/utils/balishelper'
import tableStyles from '@core/styles/table.module.css'
import ActionsColumn from './ActionsColumn'
import DocRegistSrp from './DocRegistSrp'
import FormDisposisi from './FormDisposisi'
import LogSrp from './LogSrp'
import SearchValidasi from './SearchValidasi'

const TabelSrp = ({ view }) => {
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

  const { total, tab, per_page, current_page, listRegsrp, tahap_reg_id, jenis_validasi_id, isLoading, cari } =
    useSelector(store => store.validasiData)

  useEffect(() => {
    dispatch(clearValues())
    dispatch(clearFilters())
  }, [pathname, dispatch])

  useEffect(() => {
    if (tahap_reg_id) {
      dispatch(getRegistrasiSrp())
    }
  }, [dispatch, current_page, tahap_reg_id, jenis_validasi_id, tab, cari, per_page, total])

  const handlePageChange = newPage => {
    dispatch(changePage(newPage))
  }

  const handleDeleteClick = regsrpId => {
    setRegsrpId(regsrpId)
    setShowConfirmationDel(true)
  }

  const handleKirimClick = regsrpId => {
    setRegsrpId(regsrpId)
    setShowConfirmationSend(true)
  }

  const handleKirimOtorisator = regsrpId => {
    setRegsrpId(regsrpId)
    setShowConfirmationSendOtorisator(true)
  }

  const handleSelesai = regsrpId => {
    setRegsrpId(regsrpId)
    setShowConfirmationSelesai(true)
  }

  const handleTolak = regsrpId => {
    setRegsrpId(regsrpId)
    setShowConfirmationTolak(true)
  }

  const handleKembalikan = regsrpId => {
    setRegsrpId(regsrpId)
    setShowConfirmationKembalikan(true)
  }

  const handleShowDokumen = (regsrpId, fas_id) => {
    setRegsrpId(regsrpId)
    setFasId(fas_id)
    setOpen(true)
  }

  const handleShowLog = (regsrpId, fas_id) => {
    setRegsrpId(regsrpId)
    setFasId(fas_id)
    setOpenlog(true)
  }

  const handleShowDispo = (regsrpId, data) => {
    setRegsrpId(regsrpId)
    setOpendispo(true)
    setDatarp(data)
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
        cell: ({ row }) => (
          <ActionsColumn
            row={row}
            handleShowDokumen={handleShowDokumen}
            handleShowLog={handleShowLog}
            handleShowDispo={handleShowDispo}
            handleKirimClick={handleKirimClick}
            handleDeleteClick={handleDeleteClick}
            handleKirimOtorisator={handleKirimOtorisator}
            handleSelesai={handleSelesai}
            handleTolak={handleTolak}
            handleKembalikan={handleKembalikan}
            view={view}
          />
        ),
        enableSorting: false
      }),
      columnHelper.accessor('no_reg', {
        header: 'No Reg',
        cell: ({ row }) => <Typography>{row.original.no_reg}</Typography>
      }),
      columnHelper.accessor('jenis_validasi_id', {
        header: 'Jenis',
        cell: ({ row }) => <div>{getJenisValidasi(row.original.jenis_validasi_id)} </div>
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
          <SearchValidasi showExcelSelect={false} />
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

      {open && <DocRegistSrp fasId={fasId} regsrpId={regsrpId} open={open} handleClose={handleModalClose} />}

      {openlog && <LogSrp fasId={fasId} regsrpId={regsrpId} open={openlog} handleClose={handleModalClose} />}

      {opendispo && (
        <FormDisposisi
          datasrp={datasrp}
          fasId={fasId}
          regsrpId={regsrpId}
          open={opendispo}
          handleClose={handleModalClose}
        />
      )}

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={regsrpId}
        onConfirm={regsrpId => {
          if (regsrpId !== 'no') {
            dispatch(deleteRegSumber({ id: regsrpId }))
          }

          setShowConfirmationDel(false)
        }}
        message='Registrasi SRP akan dihapus'
      />

      <KonfirmasiDialog
        open={showConfirmationSend}
        setOpen={showConfirmationSend}
        Id={regsrpId}
        onConfirm={regsrpId => {
          if (regsrpId !== 'no') {
            const dataform = {
              reg_srp_id: [regsrpId],
              username: session ? session.user.name : ''
            }

            dispatch(kevalidatorRegSumber(dataform))
          }

          setShowConfirmationSend(false)
        }}
        message='Registrasi Sumber ini akan dikirim ke Validator'
      />

      <KonfirmasiDialog
        open={showConfirmationSendOtorisator}
        setOpen={setShowConfirmationSendOtorisator}
        Id={regsrpId}
        onConfirm={regsrpId => {
          if (regsrpId !== 'no') {
            const dataform = {
              username: session ? session.user.name : ''
            }

            dispatch(kirimOtorisatorSrp({ id: regsrpId, dataform }))
          }

          setShowConfirmationSendOtorisator(false)
        }}
        message='Registrasi Sumber ini akan dikirim ke Koordinator ?'
      />

      <KonfirmasiDialog
        open={showConfirmationSelesai}
        setOpen={setShowConfirmationSelesai}
        Id={regsrpId}
        onConfirm={regsrpId => {
          if (regsrpId !== 'no') {
            const dataform = {
              username: session ? session.user.name : ''
            }

            dispatch(selesaiSrp({ id: regsrpId, dataform }))
          }

          setShowConfirmationSelesai(false)
        }}
        message='Registrasi Sumber ini selesai di Validasi ?'
      />

      <KonfirmasiDialog
        open={showConfirmationTolak}
        setOpen={setShowConfirmationTolak}
        Id={regsrpId}
        onConfirm={regsrpId => {
          if (regsrpId !== 'no') {
            const dataform = {
              username: session ? session.user.name : ''
            }

            dispatch(tolakSrp({ id: regsrpId, dataform }))
          }

          setShowConfirmationTolak(false)
        }}
        message='Registrasi Sumber ini di Tolak ?'
      />

      <KonfirmasiDialog
        open={showConfirmationKembalikan}
        setOpen={setShowConfirmationKembalikan}
        Id={regsrpId}
        onConfirm={regsrpId => {
          if (regsrpId !== 'no') {
            const dataform = {
              username: session ? session.user.name : ''
            }

            dispatch(kembalikanSrp({ id: regsrpId, dataform }))
          }

          setShowConfirmationKembalikan(false)
        }}
        message='Registrasi Sumber ini dikembalikan ke Pemohon ?'
      />
    </>
  )
}

export default TabelSrp
