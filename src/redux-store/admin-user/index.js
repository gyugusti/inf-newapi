import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  isLoading: false,
  cari: '',
  akses_inspeksi: '',
  fas_id: '4100',
  listAkun: [],
  userAkses: [],
  roleInspeksi: [],
  total: 0,
  numOfPages: 1,
  current_page: 1,
  per_page: 20,
  tab: ''
}

export const getAkunInspeksi = createAsyncThunk('akun/getAkunInspeksi', async (accestoken, thunkAPI) => {
  let url = `api/akunInspeksi`

  let config = {
    params: {
      fas_id: thunkAPI.getState().akun.fas_id,
      page: `${thunkAPI.getState().akun.current_page}`,
      limit: `${thunkAPI.getState().akun.per_page}`,
      cari: `${thunkAPI.getState().akun.cari}`,
      akses_inspeksi: `${thunkAPI.getState().akun.akses_inspeksi}`
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

export const getUserAkses = createAsyncThunk('akun/getUserAkses', async (id, thunkAPI) => {
  let url = `/api/getUserAkses`
  let config = {
    params: {
      user_id: id
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
    console.error('Error fetching user access:', error)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getRoleInspeksi = createAsyncThunk('akun/getRoleInspeksi', async (_, thunkAPI) => {
  let url = `/api/roleInspeksi`
  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.error('Error fetching user access:', error)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const storeAkses = createAsyncThunk('akun/storeAkses', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/akunInspeksi/storeAkses/${id}`

    let config = {}
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

export const deleteAkses = createAsyncThunk('akun/deleteAkses', async (id, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/akunInspeksi/deleteAkses/${id}`)

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

export const createRoleRef = createAsyncThunk('akun/createRoleRef', async (dataform, thunkAPI) => {
  let url = `/api/roleInspeksi`

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

export const getTokenVirtual = createAsyncThunk('authUser/getTokenVirtual', async (id, thunkAPI) => {
  let url = `/api/loginVirtual/${id}`

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

const akunSlice = createSlice({
  name: 'akun',
  initialState,
  reducers: {
    setDetail: (state, { payload }) => {
      state.inkf_id = payload
    },
    changePage: (state, { payload }) => {
      console.log(payload)
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
      state.cari = ''
      state.fas_id = '4100'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAkunInspeksi.pending, state => {
        state.isLoading = true
      })
      .addCase(getAkunInspeksi.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.listAkun = payload.data
      })
      .addCase(getAkunInspeksi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getUserAkses.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserAkses.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.userAkses = payload
      })
      .addCase(getUserAkses.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getRoleInspeksi.pending, state => {
        state.isLoading = true
      })
      .addCase(getRoleInspeksi.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.roleInspeksi = payload.data
      })
      .addCase(getRoleInspeksi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(storeAkses.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload

        toast.success('Hak akses diupdate...')
      })
      .addCase(storeAkses.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = payload.data.keterangan ? payload.data.keterangan : JSON.stringify(payload.data)

          toast.error(message)
        }
      })
      .addCase(deleteAkses.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Hak akses dihapus...')
        state.tab = payload
      })
      .addCase(deleteAkses.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = JSON.stringify(payload.data)

          toast.error(message)
        }
      })
      .addCase(createRoleRef.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload

        toast.success('Referensi Role Baru di updatE...')
      })
      .addCase(createRoleRef.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = payload.data.keterangan ? payload.data.keterangan : JSON.stringify(payload.data)

          toast.error(message)
        }
      })
      .addCase(getTokenVirtual.pending, state => {
        state.isLoading = true
      })
      .addCase(getTokenVirtual.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload

        toast.success('user mendapat token virtual...')
      })
      .addCase(getTokenVirtual.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { clearValues, changePage, handleChange, clearFilters } = akunSlice.actions

export default akunSlice.reducer
