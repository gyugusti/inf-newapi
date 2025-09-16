import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  syaratItem: [],
  current_page: 1,
  numOfPages: 1,
  per_page: 20,
  total: 0,
  tab: '',
  isLoading: false,
  isEditing: false,
  nama: '',
  urutan: '',
  item_id: ''
}

export const getsyaratItem = createAsyncThunk('syaratItem/getsyaratItem', async (_, thunkAPI) => {
  let url = `/api/syaratItem`
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

export const createSyaratItem = createAsyncThunk('syaratItem/createSyaratItem', async (dataform, thunkAPI) => {
  try {
    let url = `/api/syaratItem`
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

export const editsyaratItem = createAsyncThunk('syaratItem/editsyaratItem', async ({ item_id, dataform }, thunkAPI) => {
  try {
    let url = `/api/syaratItem/${item_id}`
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

export const deletesyaratItem = createAsyncThunk('syaratItem/deletesyaratItem', async (item_id, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/syaratItem/${item_id}`, {
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

const syaratItemSlice = createSlice({
  name: 'syaratItem',
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
      .addCase(getsyaratItem.pending, state => {
        state.isLoading = true
      })
      .addCase(getsyaratItem.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.syaratItem = payload.data
      })
      .addCase(getsyaratItem.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createSyaratItem.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('syarat item diupdate...')
      })
      .addCase(createSyaratItem.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deletesyaratItem.pending, state => {
        state.isLoading = true
      })
      .addCase(deletesyaratItem.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('jenis tabel dihapus...')
      })
      .addCase(deletesyaratItem.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(editsyaratItem.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('jenis tabel diupdate...')
      })
      .addCase(editsyaratItem.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { setEdit, clearValues } = syaratItemSlice.actions

export default syaratItemSlice.reducer
