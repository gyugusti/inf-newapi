import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initItemState = {
  nama_temuan: '',
  kode_temuan: '',
  urut_temuan: '',
  rekomendasi: '',
  rekomendasi_sphi: '',
  ket_temuan: '',
  level_id: '',
  inkf_id: ''
}

const initialState = {
  temuanLib: [],
  temuanKel: [],
  temuanCreate: [],
  current_page: 1,
  numOfPages: 1,
  per_page: 20,
  total: 0,
  tab: '',
  isLoading: false,
  isEditing: false,
  nama_tabel: '',
  keterangan: '',
  ...initItemState
}

export const getTemuanLib = createAsyncThunk('temuan/getTemuanLib', async (inkf_id, thunkAPI) => {
  let url = `/api/temuanLib`
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

export const getTemuanKel = createAsyncThunk('temuan/getTemuanKel', async (kelompok_id, thunkAPI) => {
  let url = `/api/temuan/${kelompok_id}`
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

export const createTemuan = createAsyncThunk('temuan/createTemuan', async (dataform, thunkAPI) => {
  let url = `/api/temuan`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    }
  }

  try {
    const resp = await customFetch.post(url, dataform, config)

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

export const getTemuanCreate = createAsyncThunk('temuan/getTemuanCreate', async (kelompok_id, thunkAPI) => {
  let url = `/api/temuanCreate`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      kelompok_id: `${kelompok_id}`
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

export const createItemLib = createAsyncThunk('temuan/createItemLib', async (dataform, thunkAPI) => {
  try {
    let url = `/api/temuanLib`
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

export const editItemLib = createAsyncThunk('temuan/editItemLib', async ({ temuan_id, dataform }, thunkAPI) => {
  try {
    let url = `/api/temuanLib/${temuan_id}`
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

export const deleteItemLib = createAsyncThunk('temuan/deleteItemLib', async (temuan_id, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/temuanLib/${temuan_id}`, {
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

export const deleteTemuanKel = createAsyncThunk('temuan/deleteTemuanKel', async (acuan_id, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/temuan/${acuan_id}`, {
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

const temuanSlice = createSlice({
  name: 'temuan',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
    clearValues: (state, { payload }) => {
      return {
        ...initialState,
        inkf_id: payload
      }
    },
    setCreate: (state, { payload }) => {
      state.isEditing = true
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTemuanLib.pending, state => {
        state.isLoading = true
      })
      .addCase(getTemuanLib.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.temuanLib = payload.data
      })
      .addCase(getTemuanLib.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getTemuanKel.pending, state => {
        state.isLoading = true
      })
      .addCase(getTemuanKel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.temuanKel = payload
      })
      .addCase(getTemuanKel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getTemuanCreate.pending, state => {
        state.isLoading = true
      })
      .addCase(getTemuanCreate.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.temuanCreate = payload
      })
      .addCase(getTemuanCreate.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createTemuan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isEditing = false
        toast.success('temuan ditambahkan...')
      })
      .addCase(createTemuan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createItemLib.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('jenis tabel ditambahkan...')
      })
      .addCase(createItemLib.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(editItemLib.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('jenis tabel diupdate...')
      })
      .addCase(editItemLib.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteItemLib.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteItemLib.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Lib Item dihapus...')
      })
      .addCase(deleteItemLib.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteTemuanKel.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteTemuanKel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Lib Item dihapus...')
      })
      .addCase(deleteTemuanKel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { setEdit, setCreate, clearValues } = temuanSlice.actions

export default temuanSlice.reducer
