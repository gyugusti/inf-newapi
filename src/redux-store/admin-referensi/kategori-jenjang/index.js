import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initJenjangState = {
  insp_jenjang_id: '',
  nama: '',
  ket_jenjang: '',
  urutan: '',
  tahun: '',
  tugas: '',
  status_id: '',
  is_inspektur: ''
}

const initialState = {
  kategoriInsp: [],
  jenjangInsp: [],
  current_page: 1,
  numOfPages: 1,
  per_page: 20,
  total: 0,
  tab: '',
  isLoading: false,
  isEditing: false,
  ...initJenjangState
}

export const getkatInspektur = createAsyncThunk('kategoriJenjang/getkatInspektur', async (_, thunkAPI) => {
  let url = `/api/katInspektur`
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

export const getjenInspektur = createAsyncThunk('kategoriJenjang/getjenInspektur', async (_, thunkAPI) => {
  let url = `/api/jenInspektur`
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

export const createCategori = createAsyncThunk('kategoriJenjang/createCategori', async (dataform, thunkAPI) => {
  try {
    let url = `/api/katInspektur`
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

export const deleteKategori = createAsyncThunk('kategoriJenjang/deleteKategori', async (insp_kat_id, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/katInspektur/${insp_kat_id}`)

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

export const createJenjang = createAsyncThunk('kategoriJenjang/createJenjang', async (dataform, thunkAPI) => {
  try {
    let url = `/api/jenInspektur`

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

export const deleteJenjang = createAsyncThunk('kategoriJenjang/deleteJenjang', async (insp_jenjang_id, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/jenInspektur/${insp_jenjang_id}`)

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

export const editJenjang = createAsyncThunk(
  'kategoriJenjang/editJenjang',
  async ({ insp_jenjang_id, dataform }, thunkAPI) => {
    try {
      let url = `/api/jenInspektur/${insp_jenjang_id}`
      let config = {}
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
  }
)

const kategoriJenjangSlice = createSlice({
  name: 'kategoriJenjang',
  initialState,
  reducers: {
    changeTab: (state, { payload }) => {
      state.tab = payload
    },
    changePage: (state, { payload }) => {
      state.current_page = payload
    },
    setKelompokId: (state, { payload }) => {
      state.kelompok_id = payload
    },
    setEditJenjang: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
    clearValues: () => {
      return {
        ...initialState
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getkatInspektur.pending, state => {
        state.isLoading = true
      })
      .addCase(getkatInspektur.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.kategoriInsp = payload.data
      })
      .addCase(getkatInspektur.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getjenInspektur.pending, state => {
        state.isLoading = true
      })
      .addCase(getjenInspektur.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jenjangInsp = payload.data
      })
      .addCase(getjenInspektur.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createCategori.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('kategori diupdate...')
      })
      .addCase(createCategori.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = payload.data.keterangan ? payload.data.keterangan : JSON.stringify(payload.data)

          toast.error(message)
        }
      })
      .addCase(deleteKategori.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('kategori dihapus...')
        state.tab = 'kategori'
      })
      .addCase(deleteKategori.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = JSON.stringify(payload.data)

          toast.error(message)
        }
      })
      .addCase(createJenjang.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('jenjang diupdate...')
      })
      .addCase(createJenjang.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = payload.data.keterangan ? payload.data.keterangan : JSON.stringify(payload.data)

          toast.error(message)
        }
      })
      .addCase(deleteJenjang.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Jenjang dihapus...')
        state.tab = payload
      })
      .addCase(deleteJenjang.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = JSON.stringify(payload.data)

          toast.error(message)
        }
      })
      .addCase(editJenjang.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('jenjang diupdate...')
      })
      .addCase(editJenjang.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          const message = payload.data.keterangan ? payload.data.keterangan : JSON.stringify(payload.data)

          toast.error(message)
        }
      })
  }
})

export const { changeTab, changePage, setEditJenjang, clearValues } = kategoriJenjangSlice.actions

export default kategoriJenjangSlice.reducer
