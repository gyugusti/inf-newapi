'use client'

import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Tab from '@mui/material/Tab'
import { Card, CardContent } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import CustomTabList from '@/@core/components/mui/TabList'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import { JadwalSbi } from '@/views/jadwal/sbi/JadwalSbi'

import SpiSbiFilters from './SpiSbiFilters'

const DEFAULT_TAB = 'sbi'

const SpiSbiClient = ({
  initialTab = DEFAULT_TAB,
  data = [],
  currentPage = 1,
  perPage = 20,
  totalPages = 1,
  propinsiOptions = [],
  bidangOptions = [],
  cari = '',
  propinsiId = '',
  bidangId = ''
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [tabValue, setTabValue] = useState(initialTab)
  const [, startTransition] = useTransition()

  useEffect(() => {
    setTabValue(initialTab)
  }, [initialTab])

  const breadcrumbs = useMemo(
    () => [
      {
        name: 'SPI-SBI',
        path: '/spi-sbi'
      }
    ],
    []
  )

  const updateSearchParams = useCallback(
    updates => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
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

  const handleTabChange = useCallback(
    (_, newValue) => {
      setTabValue(newValue)

      updateSearchParams({ tab: newValue !== DEFAULT_TAB ? newValue : undefined, page: undefined })
    },
    [updateSearchParams]
  )

  const handleFilterChange = useCallback(
    updates => {
      updateSearchParams({ ...updates, page: undefined })
    },
    [updateSearchParams]
  )

  const handlePageChange = useCallback(
    page => {
      updateSearchParams({ page })
    },
    [updateSearchParams]
  )

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <TabContext value={tabValue}>
            <CustomTabList variant='fullWidth' onChange={handleTabChange} aria-label='spi sbi tabs'>
              <Tab value='sbi' label='Daftar Jadwal' />
              <Tab value='arsip' label='Arsip' />
            </CustomTabList>
            <TabPanel value={tabValue} sx={{ px: 0 }}>
              <SpiSbiFilters
                bidangOptions={bidangOptions}
                propinsiOptions={propinsiOptions}
                cari={cari}
                propinsiId={propinsiId}
                bidangId={bidangId}
                onFilterChange={handleFilterChange}
              />
              <JadwalSbi
                data={data}
                currentPage={currentPage}
                perPage={perPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}

export default SpiSbiClient
