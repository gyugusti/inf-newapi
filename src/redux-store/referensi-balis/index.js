import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  isLoading: false,
  propinsi: [],
  kabupaten: [],
  bidang: [],
  listUser: [],
  listTtd: [],
  listAlamat: [],
  listDokumen: [],
  dafModelSumber: [],
  dafSatuan: [],
  dafJenisPekerja: [],
  total: 0,
  numOfPages: 1,
  per_page: 10,
  fas_id: '',
  page: 1,
  limit: 100
}

export const getKabupaten = createAsyncThunk('refbalis/getKab', async (propinsi_id, thunkAPI) => {
  let url = `apiBalis/getKabupaten`

  let config = {
    params: {
      propinsi_id: propinsi_id
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === '200') {
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

export const getPropinsi = createAsyncThunk('refbalis/getPropinsi', async (_, thunkAPI) => {
  let url = `apiBalis/getPropinsi`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === '200') {
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

export const getBidang = createAsyncThunk('refbalis/getBidang', async (_, thunkAPI) => {
  let url = `apiBalis/getBidang`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === '200') {
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

export const getModelSumber = createAsyncThunk('refbalis/getModelSumber', async (_, thunkAPI) => {
  let url = `apiBalis/getModelSumber`

  let config = {}

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

export const getSatuan = createAsyncThunk('refbalis/getSatuan', async (_, thunkAPI) => {
  let url = `apiBalis/getSatuan`

  let config = {}

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

export const getJenisPekerja = createAsyncThunk('refbalis/getJenisPekerja', async (_, thunkAPI) => {
  let url = `apiBalis/getJenisPekerja`

  let config = {}

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

export const getListUser = createAsyncThunk('refbalis/getListUser', async (_, thunkAPI) => {
  let url = `apiBalis/getListUser`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === '200') {
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

export const getPenandatangan = createAsyncThunk('refbalis/getPenandatangan', async (_, thunkAPI) => {
  let url = `api/ttd`

  let config = {}

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

export const getAlamat = createAsyncThunk('refbalis/getAlamat', async (fas_id, thunkAPI) => {
  let url = `apiBalis/getFasilitasAlamat`

  let config = {
    params: {
      fas_id: fas_id
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === '200') {
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

export const getDokumen = createAsyncThunk('refbalis/getDokumen', async (fas_id, thunkAPI) => {
  let url = `/api/dokumen`

  let config = {
    params: {
      fas_id: fas_id
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
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      if (error.response?.status === 400) {
        return thunkAPI.rejectWithValue(error.response?.data?.keterangan || 'There was an error')
      } else {
        return thunkAPI.rejectWithValue({
          status: error.response?.status || 500,
          message: error.response?.data?.keterangan || 'There was an error'
        })
      }
    }
  }
})

const refbalisSlice = createSlice({
  name: 'refbalis',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.current_page = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPropinsi.pending, state => {
        state.isLoading = true
      })
      .addCase(getPropinsi.fulfilled, (state, { payload }) => {
        state.isLoading = false

        const datas = payload.map(({ propinsi_id, nama }) => ({
          label: nama,
          value: propinsi_id
        }))

        state.propinsi = datas
      })
      .addCase(getPropinsi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getKabupaten.pending, state => {
        state.isLoading = true
      })
      .addCase(getKabupaten.fulfilled, (state, { payload }) => {
        state.isLoading = false

        const datas = payload.map(({ kab_id, nama }) => ({
          label: nama,
          value: kab_id
        }))

        state.kabupaten = datas
      })
      .addCase(getKabupaten.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getBidang.pending, state => {
        state.isLoading = true
      })
      .addCase(getBidang.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.bidang = payload
      })
      .addCase(getBidang.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getListUser.pending, state => {
        state.isLoading = true
      })
      .addCase(getListUser.fulfilled, (state, { payload }) => {
        state.isLoading = false

        const userdata = payload.data.map(({ id, nama }) => ({
          label: nama,
          value: id
        }))

        state.listUser = userdata
      })
      .addCase(getListUser.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getPenandatangan.pending, state => {
        state.isLoading = true
      })
      .addCase(getPenandatangan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.listTtd = payload.data
      })
      .addCase(getPenandatangan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getAlamat.pending, state => {
        state.isLoading = true
      })
      .addCase(getAlamat.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.listAlamat = payload.data
      })
      .addCase(getAlamat.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getModelSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(getModelSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dafModelSumber = payload
      })
      .addCase(getModelSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getSatuan.pending, state => {
        state.isLoading = true
      })
      .addCase(getSatuan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dafSatuan = payload
      })
      .addCase(getSatuan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getJenisPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(getJenisPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dafJenisPekerja = payload
      })
      .addCase(getJenisPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getDokumen.pending, state => {
        state.isLoading = true
      })
      .addCase(getDokumen.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.isLoading = false
        state.listDokumen = payload.data
      })
      .addCase(getDokumen.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { clearValues, changePage } = refbalisSlice.actions

export default refbalisSlice.reducer
