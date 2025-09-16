import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialFiltersState = {
  search: '',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  kelompok_id: '',
  bidang_id: ''
}

const initialState = {
  kelompokKegiatan: [],
  kegiatan: [],
  current_page: 1,
  numOfPages: 1,
  per_page: 20,
  total: 0,
  tab: '',
  ...initialFiltersState
}

export const getkelKegiatan = createAsyncThunk('kelKegiatan/getkelKegiatan', async (_, thunkAPI) => {
  let url = `/api/kelKegiatan`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken // Access the accessToken from the session
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

export const getKegiatanKelompok = createAsyncThunk('kelKegiatan/getKegiatanKelompok', async (id, thunkAPI) => {
  let url = `/api/kelKegiatan/${id}`
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

export const getKegiatan = createAsyncThunk('kelKegiatan/getKegiatan', async (_, thunkAPI) => {
  const session = await getSession()
  let url = `/apiBalis/kegiatan`

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().kelKegiatan.current_page}`,
      limit: `${thunkAPI.getState().kelKegiatan.per_page}`,
      bidang_id: `${thunkAPI.getState().kelKegiatan.bidang_id}`,
      kelompok_id: `${thunkAPI.getState().kelKegiatan.kelompok_id}`
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

export const editKegiatan = createAsyncThunk(
  'kelKegiatan/editKegiatan',
  async ({ kegiatan_id, dataform }, thunkAPI) => {
    try {
      const session = await getSession()

      const resp = await customFetch.put(`/api/kegiatanKel/update/${kegiatan_id}`, dataform, {
        headers: {
          'balis-token': session.user.accessToken
        }
      })

      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(handleLogout())

        return thunkAPI.rejectWithValue('Unautorized ! Logging Out...')
      } else {
        return thunkAPI.rejectWithValue(error.response)
      }
    }
  }
)

export const createKelompokKeg = createAsyncThunk('kelKegiatan/createKelompokKeg', async (dataform, thunkAPI) => {
  let url = `/api/kelKegiatan`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    }
  }

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

export const editKelompokKeg = createAsyncThunk('kelKegiatan/editKelompokKeg', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/kelKegiatan/${id}`
    const session = await getSession()

    let config = {
      headers: {
        'balis-token': session.user.accessToken
      }
    }

    const resp = await customFetch.put(url, dataform, config)

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

export const deleteKelompok = createAsyncThunk('kelKegiatan/deleteKelompok', async (id, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/kelKegiatan/${id}`, {
      headers: {
        'balis-token': session.user.accessToken
      }
    })

    if (resp.data.status === 200) {
      return resp.data
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unautorized ! Logging Out...')
    } else {
      return thunkAPI.rejectWithValue(error.response)
    }
  }
})

const kelKegiatanSlice = createSlice({
  name: 'kelKegiatan',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1
      state[name] = value
    },
    changeTab: (state, { payload }) => {
      state.tab = payload
    },
    changePage: (state, { payload }) => {
      state.current_page = payload
    },
    setKelompokId: (state, { payload }) => {
      state.kelompok_id = payload
    },
    setTab: (state, { payload }) => {
      state.tab = payload
    },
    clearFilters: state => {
      return { ...state, ...initialFiltersState }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getkelKegiatan.pending, state => {
        state.isLoading = true
      })
      .addCase(getkelKegiatan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.kelompokKegiatan = payload.data
      })
      .addCase(getkelKegiatan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getKegiatan.pending, state => {
        state.isLoading = true
      })
      .addCase(getKegiatan.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.kegiatan = payload.data
      })
      .addCase(getKegiatan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getKegiatanKelompok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.kegiatan = payload.kegiatan
      })
      .addCase(getKegiatanKelompok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(editKegiatan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('kegiatan diupdate...')
      })
      .addCase(editKegiatan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = `error ${payload} something wrong with the server`

          console.log(message)
          toast.error(message)
        }
      })
      .addCase(createKelompokKeg.pending, state => {
        state.isLoading = true
      })
      .addCase(createKelompokKeg.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Kelompok Kegiatan berhasil ditambahkan...')
      })
      .addCase(createKelompokKeg.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(editKelompokKeg.pending, state => {
        state.isLoading = true
      })
      .addCase(editKelompokKeg.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Kelompok kegiatan berhasil diupdate...')
      })
      .addCase(editKelompokKeg.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(deleteKelompok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteKelompok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
  }
})

export const { changeTab, changePage, setKelompokId, handleChange, clearFilters, setTab } = kelKegiatanSlice.actions

export default kelKegiatanSlice.reducer
