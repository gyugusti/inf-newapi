import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  isLoading: false,
  tab: '',
  total: 0,
  numOfPages: 1,
  current_page: 1,
  page: 1,
  limit: 100,
  per_page: 20,
  jadwal_id: null,
  bidang_id: '',
  status_id: '',
  fas_id: '',
  sort_by: null,
  order_by: null
}

export const getDataJadwal = createAsyncThunk('dataUmum/getDataJadwal', async (_, thunkAPI) => {
  let url = `/api/data/jadwal`

  const params = {
    page: `${thunkAPI.getState().jadwal.current_page}`,
    limit: `${thunkAPI.getState().jadwal.per_page}`,
    status_id: thunkAPI.getState().jadwal.status,
    propinsi_id: thunkAPI.getState().jadwal.propinsi_id,
    bidang_id: thunkAPI.getState().jadwal.bidang_id,
    fas_id: thunkAPI.getState().jadwal.fas_id
  }

  try {
    const resp = await customFetch.get(url, { params })

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

export const getDataPengawasan = createAsyncThunk('dataUmum/getDataPengawasan', async (_, thunkAPI) => {
  let url = `/api/data/pengawasan`

  const params = {
    page: `${thunkAPI.getState().jadwal.current_page}`,
    limit: `${thunkAPI.getState().jadwal.per_page}`,
    status_id: thunkAPI.getState().jadwal.status,
    propinsi_id: thunkAPI.getState().jadwal.propinsi_id,
    bidang_id: thunkAPI.getState().jadwal.bidang_id,
    fas_id: thunkAPI.getState().jadwal.fas_id
  }

  try {
    const resp = await customFetch.get(url, { params })

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

export const getDataFasilitas = createAsyncThunk('dataUmum/getDataFasilitas', async (_, thunkAPI) => {
  let url = `/api/data/fasilitas`

  const params = {
    page: `${thunkAPI.getState().jadwal.current_page}`,
    limit: `${thunkAPI.getState().jadwal.per_page}`,
    status_id: thunkAPI.getState().jadwal.status,
    propinsi_id: thunkAPI.getState().jadwal.propinsi_id,
    bidang_id: thunkAPI.getState().jadwal.bidang_id,
    fas_id: thunkAPI.getState().jadwal.fas_id
  }

  try {
    const resp = await customFetch.get(url, { params })

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

const dataUmumSlice = createSlice({
  name: 'dataUmum',
  initialState,
  reducers: {
    handleLog: (state, { payload: { name, value } }) => {
      state[name] = value
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getDataJadwal.pending, state => {
        state.isLoading = true
      })
      .addCase(getDataJadwal.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.listJadwal = payload.data
      })
      .addCase(getDataJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getDataPengawasan.pending, state => {
        state.isLoading = true
      })
      .addCase(getDataPengawasan.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dataPengawasan = payload.data
      })
      .addCase(getDataPengawasan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getDataFasilitas.pending, state => {
        state.isLoading = true
      })
      .addCase(getDataFasilitas.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dataFasilitas = payload.data
      })
      .addCase(getDataFasilitas.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { handleLog } = dataUmumSlice.actions

export default dataUmumSlice.reducer
