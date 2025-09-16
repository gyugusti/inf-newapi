import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  isLoading: false,
  listJadwal: [],
  dataPengawasan: [],
  dataFasilitas: [],
  jadwalProp: [],
  jadwalKab: [],
  bebanInspektur: [],
  dataInspektur: [],
  dataInspekturThnDet: [],
  tab: '',
  total: 0,
  tahun: '',
  numOfPages: 1,
  current_page: 1,
  page: 1,
  limit: 100,
  per_page: 20,
  jadwal_id: null,
  bidang_id: '',
  status_id: '',
  fas_id: '',
  searchTerm: '',
  sort_by: null,
  order_by: null
}

export const getDataJadwal = createAsyncThunk('dataInspeksi/getDataJadwal', async (_, thunkAPI) => {
  let url = `/api/data/jadwal`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataInspeksi.current_page}`,
      limit: `${thunkAPI.getState().dataInspeksi.per_page}`,
      status_id: thunkAPI.getState().dataInspeksi.status,
      propinsi_id: thunkAPI.getState().dataInspeksi.propinsi_id,
      bidang_id: thunkAPI.getState().dataInspeksi.bidang_id,
      fas_id: thunkAPI.getState().dataInspeksi.fas_id
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

export const getJadwalProp = createAsyncThunk('dataInspeksi/getJadwalProp', async (_, thunkAPI) => {
  let url = `/api/data/jadwalProp`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataInspeksi.current_page}`,
      limit: `${thunkAPI.getState().dataInspeksi.per_page}`
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

export const getjadwalKab = createAsyncThunk('dataInspeksi/getjadwalKab', async (_, thunkAPI) => {
  let url = `/api/data/getjadwalKab`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataInspeksi.current_page}`,
      limit: `${thunkAPI.getState().dataInspeksi.per_page}`
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

export const getBebanKerja = createAsyncThunk('dataInspeksi/getBebanKerja', async (_, thunkAPI) => {
  let url = `/api/data/inspektur/tahun`
  const session = await getSession()

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

export const getInspekturDet = createAsyncThunk('dataInspeksi/getInspekturDet', async (_, thunkAPI) => {
  let url = `/api/data/inspektur/detail`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataInspeksi.current_page}`,
      limit: `${thunkAPI.getState().dataInspeksi.per_page}`
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

export const getInspekturTahun = createAsyncThunk('dataInspeksi/getInspekturTahun', async (_, thunkAPI) => {
  let url = `/api/data/inspektur/tahun/${tahun}`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataInspeksi.current_page}`,
      limit: `${thunkAPI.getState().dataInspeksi.per_page}`
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

export const getDataPengawasan = createAsyncThunk('dataInspeksi/getDataPengawasan', async (_, thunkAPI) => {
  let url = `/api/data/pengawasan`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataInspeksi.current_page}`,
      limit: `${thunkAPI.getState().dataInspeksi.per_page}`,
      propinsi_id: thunkAPI.getState().dataInspeksi.propinsi_id,
      fas_id: thunkAPI.getState().dataInspeksi.fas_id
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

export const getDataFasilitas = createAsyncThunk('dataInspeksi/getDataFasilitas', async (_, thunkAPI) => {
  let url = `/api/data/fasilitas`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session?.user?.accessToken
    },
    params: {
      page: thunkAPI.getState().dataInspeksi.current_page,
      limit: thunkAPI.getState().dataInspeksi.per_page,
      fas_id: thunkAPI.getState().dataInspeksi.fas_id,
      cari: thunkAPI.getState().dataInspeksi.searchTerm
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
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getInspekturThnDet = createAsyncThunk('dataInspeksi/getInspekturThnDet', async (id, thunkAPI) => {
  let url = `/api/data/inspektur/tahun/${id}`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataInspeksi.current_page}`,
      limit: `${thunkAPI.getState().dataInspeksi.per_page}`
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

const dataInspeksiSlice = createSlice({
  name: 'dataInspeksi',
  initialState,
  reducers: {
    handleLog: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    changePage: (state, { payload }) => {
      state.current_page = payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
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
      .addCase(getDataFasilitas.rejected, state => {
        state.isLoading = false
      })
      .addCase(getJadwalProp.pending, state => {
        state.isLoading = true
      })
      .addCase(getJadwalProp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jadwalProp = payload
      })
      .addCase(getJadwalProp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getjadwalKab.pending, state => {
        state.isLoading = true
      })
      .addCase(getjadwalKab.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.jadwalKab = payload.data
      })
      .addCase(getjadwalKab.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getBebanKerja.pending, state => {
        state.isLoading = true
      })
      .addCase(getBebanKerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.bebanInspektur = payload.data
      })
      .addCase(getBebanKerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getInspekturDet.pending, state => {
        state.isLoading = true
      })
      .addCase(getInspekturDet.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dataInspektur = payload.data
      })
      .addCase(getInspekturDet.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getInspekturThnDet.pending, state => {
        state.isLoading = true
      })
      .addCase(getInspekturThnDet.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dataInspektur = payload.data
      })
      .addCase(getInspekturThnDet.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { handleLog, changePage } = dataInspeksiSlice.actions

export default dataInspeksiSlice.reducer
