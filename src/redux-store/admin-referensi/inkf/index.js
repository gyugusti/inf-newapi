import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  inkf: [],
  detailInkf: [],
  current_page: 1,
  numOfPages: 1,
  per_page: 20,
  total: 0,
  tab: '',
  isLoading: false,
  isEditing: false,
  inkf_id: '',
  nama: '',
  uraian: '',
  bobot: ''
}

export const getInkf = createAsyncThunk('inkf/getInkf', async (_, thunkAPI) => {
  let url = `/api/inkf`
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

export const getDetailInkf = createAsyncThunk('ikk/getDetailInkf', async (_, thunkAPI) => {
  let url = `/api/inkf`
  let config = {
    params: {
      inkf_id: `${thunkAPI.getState().inkf.inkf_id}`
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

export const createInkf = createAsyncThunk('inkf/createInkf', async (dataform, thunkAPI) => {
  try {
    let url = `/api/inkf`
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

export const editInkf = createAsyncThunk('inkf/editInkf', async ({ inkf_id, dataform }, thunkAPI) => {
  try {
    let url = `/api/inkf/${inkf_id}`
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

export const deleteInkf = createAsyncThunk('inkf/deleteInkf', async (inkf_id, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/inkf/${inkf_id}`)

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

const inkfSlice = createSlice({
  name: 'inkf',
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
      .addCase(getInkf.pending, state => {
        state.isLoading = true
      })
      .addCase(getInkf.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.inkf = payload.data
      })
      .addCase(getInkf.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getDetailInkf.pending, state => {
        state.isLoading = true
      })
      .addCase(getDetailInkf.fulfilled, (state, { payload }) => {
        const detail = payload.data

        state.detailInkf = detail[0]
        state.isLoading = false
      })
      .addCase(getDetailInkf.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createInkf.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('IKF diupdate...')
      })
      .addCase(createInkf.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteInkf.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteInkf.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('IKF dihapus...')
      })
      .addCase(deleteInkf.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(editInkf.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('IKF diupdate...')
      })
      .addCase(editInkf.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { setEdit, clearValues, setDetail } = inkfSlice.actions

export default inkfSlice.reducer
