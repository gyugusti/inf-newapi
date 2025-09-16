import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  jenisTabel: [],
  current_page: 1,
  numOfPages: 1,
  per_page: 20,
  total: 0,
  tab: '',
  isLoading: false,
  isEditing: false,
  nama_tabel: '',
  keterangan: ''
}

export const getlkfJenisTabel = createAsyncThunk('lkfJenisTabel/getkatInspektur', async (_, thunkAPI) => {
  let url = `/api/lkfJenisTabel`
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

export const createlkfJenisTabel = createAsyncThunk('lkfJenisTabel/createlkfJenisTabel', async (dataform, thunkAPI) => {
  try {
    let url = `/api/lkfJenisTabel`
    const session = await getSession()

    let config = {
      headers: {
        'balis-token': session.user.accessToken
      }
    }
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

export const editlkfJenisTabel = createAsyncThunk(
  'lkfJenisTabel/editlkfJenisTabel',
  async ({ jenis_tabel_id, dataform }, thunkAPI) => {
    try {
      let url = `/api/lkfJenisTabel/${jenis_tabel_id}`
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
  }
)

export const deletelkfJenisTabel = createAsyncThunk(
  'lkfJenisTabel/deletelkfJenisTabel',
  async (jenis_tabel_id, thunkAPI) => {
    try {
      const session = await getSession()

      const resp = await customFetch.delete(`/api/lkfJenisTabel/${jenis_tabel_id}`, {
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
  }
)

const lkfJenisTabelSlice = createSlice({
  name: 'lkfJenisTabel',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
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
      .addCase(getlkfJenisTabel.pending, state => {
        state.isLoading = true
      })
      .addCase(getlkfJenisTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jenisTabel = payload.data
      })
      .addCase(getlkfJenisTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createlkfJenisTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('jenis tabel diupdate...')
      })
      .addCase(createlkfJenisTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deletelkfJenisTabel.pending, state => {
        state.isLoading = true
      })
      .addCase(deletelkfJenisTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('jenis tabel dihapus...')
      })
      .addCase(deletelkfJenisTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(editlkfJenisTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('jenis tabel diupdate...')
      })
      .addCase(editlkfJenisTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { setEdit, clearValues } = lkfJenisTabelSlice.actions

export default lkfJenisTabelSlice.reducer
