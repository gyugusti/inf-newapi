import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify' // Import from react-toastify

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  ikk: [],
  detailIkk: [],
  inkf_id: '',
  current_page: 1,
  numOfPages: 1,
  per_page: 20,
  total: 0,
  tab: '',
  isLoading: false,
  isEditing: false
}

export const getIkk = createAsyncThunk('ikk/getIkk', async (_, thunkAPI) => {
  let url = `/api/ikk`

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

export const getDetailIkk = createAsyncThunk('ikk/getDetailIkk', async (_, thunkAPI) => {
  let url = `/api/ikk`
  let config = {
    params: {
      inkf_id: `${thunkAPI.getState().ikk.inkf_id}`
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

export const createIkk = createAsyncThunk('ikk/createIkk', async (dataform, thunkAPI) => {
  try {
    let url = `/api/ikk`

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

export const editIkk = createAsyncThunk('ikk/editIkk', async ({ ikk_item_id, dataform }, thunkAPI) => {
  try {
    let url = `/api/ikk/${ikk_item_id}`

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
})

export const deleteIkk = createAsyncThunk('ikk/deleteIkk', async (ikk_item_id, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/ikk/${ikk_item_id}`)

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

const ikkSlice = createSlice({
  name: 'ikk',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
    setDetail: (state, { payload }) => {
      state.inkf_id = payload
    },
    clearValues: () => {
      return {
        ...initialState
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getIkk.pending, state => {
        state.isLoading = true
      })
      .addCase(getIkk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.ikk = payload.data
      })
      .addCase(getIkk.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getDetailIkk.pending, state => {
        state.isLoading = true
      })
      .addCase(getDetailIkk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.detailIkk = payload.data
      })
      .addCase(getDetailIkk.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createIkk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('IKK ditambahkan...')
      })
      .addCase(createIkk.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(editIkk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('IKF diupdate...')
      })
      .addCase(editIkk.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteIkk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('IKF dihapus...')
      })
      .addCase(deleteIkk.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { clearValues, setDetail } = ikkSlice.actions

export default ikkSlice.reducer
