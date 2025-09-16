import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import customFetch from '@/utils/axios'
import { handleLogout } from '@/redux-store/auth'

const initialFiltersState = {
  search: '',
  propinsi_id: '',
  bidang_id: '',
  tahap_reg_id: '',
  limit: 100,
  merk: '',
  merk_tabung: '',
  no_seri: '',
  no_seri_tabung: '',
  tipe: '',
  tipe_tabung: ''
}

const initialState = {
  isLoading: false,
  isLoadingSrp: false,
  listRegsrp: [],
  listDokumenSrp: [],
  detailRegsrp: [],
  listMasterSrp: [],
  jenis_dokumen_id: [],
  srpId: [],
  jadwalSrp: [],
  validator: '',
  inspektur: '',
  tab: '',
  msg: '',
  totalRegsrpval: 0,
  totalRegsrpoto: 0,
  total: 0,
  numOfPages: 1,
  current_page: 1,
  per_page: 20,
  ...initialFiltersState
}

export const countRegistrasiSrpval = createAsyncThunk(
  'countingData/countRegistrasiSrpval',
  async (userRoles, thunkAPI) => {
    let url = `/apiRegistrasi/srp`
    const session = await getSession()
    let validator_id
    let tahapan = [1]

    if (userRoles.includes('verifikator')) {
      validator_id = session?.user?.id //
    }

    let config = {
      params: {
        tahap_reg_id: tahapan,
        validator_id: validator_id
      }
    }

    try {
      const resp = await customFetch.get(url, config)

      if (resp.data.status === 200) {
        return resp.data.response
      } else {
        return thunkAPI.rejectWithValue(resp.data.keterangan || 'Unknown error')
      }
    } catch (error) {
      console.log('Error response:', error.response?.status, error.response?.data)

      if (error.response?.status === 401 || error.response?.status === 400) {
        thunkAPI.dispatch(handleLogout())

        return thunkAPI.rejectWithValue({
          status: 401,
          message: 'Unauthorized'
        })
      } else {
        return thunkAPI.rejectWithValue({
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'There was an error'
        })
      }
    }
  }
)

export const countRegistrasiSrpoto = createAsyncThunk(
  'countingData/countRegistrasiSrpoto',
  async (userRoles, thunkAPI) => {
    let url = `/apiRegistrasi/srp`
    const session = await getSession()
    let tahapan = [2]

    let koordinator_id

    if (userRoles.includes('koordinator')) {
      koordinator_id = session?.user?.id //
    }

    let config = {
      params: {
        tahap_reg_id: tahapan,
        koordinator_id: koordinator_id
      }
    }

    try {
      const resp = await customFetch.get(url, config)

      if (resp.data.status === 200) {
        return resp.data.response
      } else {
        return thunkAPI.rejectWithValue(resp.data.keterangan || 'Unknown error')
      }
    } catch (error) {
      console.log('Error response:', error.response?.status, error.response?.data)

      if (error.response?.status === 401 || error.response?.status === 400) {
        thunkAPI.dispatch(handleLogout())

        return thunkAPI.rejectWithValue({
          status: 401,
          message: 'Unauthorized'
        })
      } else {
        return thunkAPI.rejectWithValue({
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'There was an error'
        })
      }
    }
  }
)

const countingDataSlice = createSlice({
  name: 'countingData',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.current_page = 1
      state[name] = value
    },

    changePage: (state, { payload }) => {
      state.current_page = payload
    },

    clearValues: () => {
      return {
        ...initialState
      }
    },

    setInspektur: (state, { payload }) => {
      state.inspektur = payload
    },
    setValidator: (state, { payload }) => {
      state.validator = payload
    },
    setTahapan: (state, { payload }) => {
      state.current_page = 1
      state.tahap_reg_id = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(countRegistrasiSrpval.pending, state => {
        state.isLoading = true
      })
      .addCase(countRegistrasiSrpval.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.totalRegsrpval = payload.total
      })
      .addCase(countRegistrasiSrpval.rejected, (state, { payload }) => {
        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })
      .addCase(countRegistrasiSrpoto.pending, state => {
        state.isLoading = true
      })
      .addCase(countRegistrasiSrpoto.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.totalRegsrpoto = payload.total
      })
      .addCase(countRegistrasiSrpoto.rejected, (state, { payload }) => {
        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })
  }
})

export const {
  clearValues,
  clearFilters,
  clearSrpfilter,
  changePage,
  handleChange,
  handleChangeSrp,
  setTahapan,
  setSrpId,
  setInspektur,
  setJadwalSrp,
  setValidator
} = countingDataSlice.actions

export default countingDataSlice.reducer
