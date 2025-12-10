"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Box, Card, Tab, Tabs } from '@mui/material'

import IndexTabsensus from './IndexTabsensus.js.jsx'
import IndexSrp from './IndexSrp'

const TAB_CONFIG = [
  { value: 'srp', label: 'Srp' },
  { value: 'sensus-draft', label: 'Pengajuan Sensus', tahapRegId: ['0', '3'] },
  { value: 'sensus-proses', label: 'Proses Sensus', tahapRegId: ['1', '2'] },
  { value: 'arsip', label: 'Arsip', tahapRegId: ['4', '-1'] }
]

const serializeTahapRegId = ids => (Array.isArray(ids) ? ids : typeof ids === 'string' ? ids.split(',') : [])
  .filter(Boolean)
  .join(',')

const IndexSensus = ({
  data = [],
  currentPage = 1,
  perPage = 20,
  total = 0,
  totalPages = 1,
  searchTerm = '',
  tahapRegId = '',
  tab: initialTab
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const normalizedTahapRegId = useMemo(() => serializeTahapRegId(tahapRegId), [tahapRegId])

  const getTabFromTahap = useCallback(() => {
    const matchedTab = TAB_CONFIG.find(
      tabConfig => tabConfig.tahapRegId && serializeTahapRegId(tabConfig.tahapRegId) === normalizedTahapRegId
    )

    return matchedTab?.value
  }, [normalizedTahapRegId])

  const [tabValue, setTabValue] = useState(() => initialTab || getTabFromTahap() || 'srp')

  useEffect(() => {
    const tabFromParams = searchParams.get('tab')
    const resolvedTab = tabFromParams || getTabFromTahap() || 'srp'

    setTabValue(resolvedTab)
  }, [getTabFromTahap, searchParams])

  const handleTabChange = useCallback(
    (_, newValue) => {
      setTabValue(newValue)

      const params = new URLSearchParams(searchParams.toString())
      const targetTab = TAB_CONFIG.find(tabConfig => tabConfig.value === newValue)

      if (targetTab?.tahapRegId) {
        params.set('tahap_reg_id', targetTab.tahapRegId.join(','))
      } else {
        params.delete('tahap_reg_id')
      }

      params.set('tab', newValue)
      params.set('page', '1')

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const renderContent = () => {
    if (tabValue === 'srp') {
      return <IndexSrp />
    }

    const selectedTab = TAB_CONFIG.find(tabConfig => tabConfig.value === tabValue)
    const selectedTahapRegId = selectedTab?.tahapRegId || []

    return (
      <IndexTabsensus
        data={data}
        currentPage={currentPage}
        perPage={perPage}
        total={total}
        totalPages={totalPages}
        searchTerm={searchTerm}
        tahapRegId={selectedTahapRegId}
      />
    )
  }

  return (
    <Card>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 4, pt: 2 }}>
        {TAB_CONFIG.map(tabConfig => (
          <Tab key={tabConfig.value} value={tabConfig.value} label={tabConfig.label} />
        ))}
      </Tabs>
      <Box p={3}>{renderContent()}</Box>
    </Card>
  )
}

export default IndexSensus
