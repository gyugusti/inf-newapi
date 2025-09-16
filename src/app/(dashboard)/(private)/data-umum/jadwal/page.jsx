import { redirect } from 'next/navigation'

import { signOut } from 'next-auth/react'

import JadwalIndex from '@/views/data-umum/jadwal/JadwalIndex'
import { fetchJadwal } from '../server-action/fetchJadwal'
import SearchContainer from '@/views/data-umum/jadwal/SearchContainer'
import ShadowBox from '@/components/styles/ShadowBox'
import Error500 from '@/components/Error500'
import { getServerMode } from '@core/utils/serverHelpers'

export default async function JadwalPage({ searchParams }) {
  const mode = await getServerMode()

  const page = parseInt(searchParams.page || '1', 10)

  const data = await fetchJadwal(searchParams)

  if (data?.error) {
    // ✅ Render Error500 component jika selain 401
    return <Error500 message={data.error.message} mode={mode} />
  }

  return (
    <div>
      <ShadowBox>
        {/* <SearchContainer /> */}
        <JadwalIndex data={data.data} page={page} totalPage={data.last_page} />
      </ShadowBox>
    </div>
  )
}
