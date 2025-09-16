import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialFiltersState = {
  search: '',
  tab: '',
  kab_id: '',
  limit: '',
  page: '',
  propinsi_id: '',
  sort_by: ''
}

const initialState = {
  isLoading: false,
  jadwalFas: [],
  total: 0,
  numOfPages: 1,
  page: 1,
  per_page: 20,
  ...initialFiltersState
}

export const getJadwalFas = createAsyncThunk('jadwalFas/getJadwalFas', async (_, thunkAPI) => {
  let url = `/api/jadwalFas`

  let config = {
    params: {
      page: `${thunkAPI.getState().jadwalFas.current_page}`,
      limit: `${thunkAPI.getState().jadwalFas.per_page}`,
      cari: `${thunkAPI.getState().jadwalFas.search}`,
      kab_id: `${thunkAPI.getState().jadwalFas.kab_id}`,
      propinsi_id: `${thunkAPI.getState().jadwalFas.propinsi_id}`,
      sort_by: `${thunkAPI.getState().jadwalFas.sort_by}`
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

export const jadwalKonfirm = createAsyncThunk('jadwalFas/jadwalKonfirm', async (dataform, thunkAPI) => {
  let url = `/api/jadwalKonfirm/fas`

  let config = {}

  try {
    const resp = await customFetch.post(url, dataform, config)

    return resp.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unautorized ! Logging Out...')
    } else {
      return thunkAPI.rejectWithValue(error.response)
    }
  }
})

export const jadwalKonfirmSimpan = createAsyncThunk('jadwalFas/jadwalKonfirmSimpan', async (dataform, thunkAPI) => {
  let url = `/api/jadwalKonfirm/simpan`

  let config = {}

  try {
    const resp = await customFetch.post(url, dataform, config)

    return resp.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unautorized ! Logging Out...')
    } else {
      return thunkAPI.rejectWithValue(error.response)
    }
  }
})

export const selesaiJadwalFas = createAsyncThunk('jadwalFas/selesaiJadwalFas', async (id, thunkAPI) => {
  let url = `/api/jadwalKonfirm/selesai/${id}`

  let config = {}

  try {
    const resp = await customFetch.put(url, id, config)

    return resp.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unautorized ! Logging Out...')
    } else {
      return thunkAPI.rejectWithValue(error.response)
    }
  }
})

const JadwalFasSlice = createSlice({
  name: 'jadwalFas',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.current_page = payload
    },
    clearValues: () => {
      return {
        ...initialState
      }
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.current_page = 1
      state[name] = value
    },
    clearFilters: state => {
      state.kab_id = ''
      state.propinsi_id = ''
      state.search = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getJadwalFas.pending, state => {
        state.isLoading = true
      })
      .addCase(getJadwalFas.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.jadwalFas = payload.data
      })
      .addCase(getJadwalFas.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(jadwalKonfirm.pending, state => {
        state.isLoading = true
      })
      .addCase(jadwalKonfirm.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Konfirmasi Jadwal berhasil dikirimkan...')
      })
      .addCase(jadwalKonfirm.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(jadwalKonfirmSimpan.pending, state => {
        state.isLoading = true
      })
      .addCase(jadwalKonfirmSimpan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Status Jadwal berhasil diubah...')
      })
      .addCase(jadwalKonfirmSimpan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(selesaiJadwalFas.pending, state => {
        state.isLoading = true
      })
      .addCase(selesaiJadwalFas.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Status Jadwal berhasil diubah...')
      })
      .addCase(selesaiJadwalFas.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
  }
})

export const { clearValues, changePage, clearFilters, handleChange } = JadwalFasSlice.actions

export default JadwalFasSlice.reducer
