import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  isLoading: false,
  listInspektur: [],
  listInspekturRwy: [],
  InspekturDetail: [],
  bidangInsp: [],
  logProses: [],
  total: 0,
  numOfPages: 1,
  current_page: 1,
  page: 1,
  limit: 100,
  per_page: 20,
  jadwal_id: null,
  lhi_id: null,
  ikk_id: null,
  lkf_id: null,
  tlhi_id: null,
  sort_by: null,
  order_by: null
}

export const getInspektur = createAsyncThunk('refInfara/getInspektur', async (_, thunkAPI) => {
  const session = await getSession()
  let url = `api/inspektur`

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response.status)

    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getInspekturRiwayat = createAsyncThunk('refInfara/getInspekturRiwayat', async (_, thunkAPI) => {
  const session = await getSession()
  let url = `api/inspekturRiwayat`

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      status: 1
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response.status)

    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getProsesLog = createAsyncThunk('refinfara/getProsesLog', async (_, thunkAPI) => {
  const session = await getSession()
  let url = `api/proses/log`

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().refInfara.current_page}`,
      limit: `${thunkAPI.getState().refInfara.per_page}`,
      status: thunkAPI.getState().refInfara.status,
      jadwal_id: thunkAPI.getState().refInfara.jadwal_id,
      lhi_id: thunkAPI.getState().refInfara.lhi_id,
      ikk_id: thunkAPI.getState().refInfara.ikk_id,
      lkf_id: thunkAPI.getState().refInfara.lkf_id,
      tlhi_id: thunkAPI.getState().refInfara.tlhi_id,
      sort_by: thunkAPI.getState().refInfara.sort_by,
      order_by: thunkAPI.getState().refInfara.order_by
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response.status)

    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getInspekturDetail = createAsyncThunk('refInfara/getInspekturDetail', async (id, thunkAPI) => {
  const session = await getSession()
  let url = `api/inspektur/${id}`

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response.status)

    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

const refInfaraSlice = createSlice({
  name: 'refInfara',
  initialState,
  reducers: {
    handleLog: (state, { payload: { name, value } }) => {
      state[name] = value
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getInspektur.pending, state => {
        state.isLoading = true
      })
      .addCase(getInspektur.fulfilled, (state, { payload }) => {
        state.isLoading = false

        const userdata = payload.data.map(({ insp_master_id, nama }) => ({
          label: `${nama}`,
          value: insp_master_id
        }))

        state.listInspektur = userdata
      })
      .addCase(getInspektur.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getInspekturRiwayat.pending, state => {
        state.isLoading = true
      })
      .addCase(getInspekturRiwayat.fulfilled, (state, { payload }) => {
        state.isLoading = false

        const userdata = payload.data.map(({ riw_insp_id, jenjang, bidang, nama }) => ({
          label: `${nama} ( ${jenjang}  ), ${bidang} `,
          value: riw_insp_id
        }))

        state.listInspekturRwy = userdata
      })
      .addCase(getInspekturRiwayat.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getProsesLog.pending, state => {
        state.isLoading = true
      })
      .addCase(getProsesLog.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.logProses = payload.data
      })
      .addCase(getProsesLog.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getInspekturDetail.pending, state => {
        state.isLoading = true
      })
      .addCase(getInspekturDetail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.InspekturDetail = payload
      })
      .addCase(getInspekturDetail.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { handleLog } = refInfaraSlice.actions

export default refInfaraSlice.reducer
