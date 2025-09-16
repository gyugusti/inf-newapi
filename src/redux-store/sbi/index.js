import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { JADWAL_PELAKSANAAN, JADWAL_SELESAI } from '@/configs/jadwalConfig'
import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialFiltersState = {
  search: '',
  tab: ''
}

const initialState = {
  isLoading: false,
  listSurat: [],
  sbi: [],
  spi: [],
  total: 0,
  numOfPages: 1,
  page: 1,
  current_page: 1,
  isEditing: false,
  per_page: 20,
  fas_id: '',
  surat_kat_id: '',
  status_id: '',
  ...initialFiltersState
}

export const getListSbi = createAsyncThunk('sbi/getListSbi', async (_, thunkAPI) => {
  const session = await getSession()
  let url = `/api/sbi`

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().sbi.current_page}`,
      limit: `${thunkAPI.getState().sbi.per_page}`,
      status_id: thunkAPI.getState().sbi.status_id,
      fas_id: thunkAPI.getState().sbi.fas_id
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

export const getSbi = createAsyncThunk('sbi/getSbi', async (id, thunkAPI) => {
  const session = await getSession()
  let url = `api/sbi/${id}`

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

export const getSpi = createAsyncThunk('sbi/getSpi', async (id, thunkAPI) => {
  const session = await getSession()
  let url = `api/spi/${id}`

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

export const createSbi = createAsyncThunk('sbi/createSbi', async (dataform, thunkAPI) => {
  const session = await getSession()
  let url = `/api/sbi`

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

export const editSbi = createAsyncThunk('sbi/editSbi', async ({ id, dataform }, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.put(`/api/sbi/${id}`, dataform, {
      headers: {
        'balis-token': session.user.accessToken
      }
    })

    thunkAPI.dispatch(clearValues())

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

export const createSpi = createAsyncThunk('sbi/createSpi', async (dataform, thunkAPI) => {
  const session = await getSession()
  let url = `/api/spi`

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

export const editSpi = createAsyncThunk('sbi/editSpi', async ({ id, dataform }, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.put(`/api/spi/${id}`, dataform, {
      headers: {
        'balis-token': session.user.accessToken
      }
    })

    thunkAPI.dispatch(clearValues())

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

const SbiSlice = createSlice({
  name: 'sbi',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.current_page = payload
    },
    clearValues: () => {
      return {
        ...initialState
      }
    },
    setEditSbi: (state, { payload }) => {
      return { ...state, isEditing: true, sbi: payload }
    },
    setFasilitas: (state, { payload }) => {
      state.fas_id = payload
    },
    setStatus: (state, { payload }) => {
      state.page = 1

      if (payload === 'pelaksanaan') {
        state.status_id = JADWAL_PELAKSANAAN
      }

      if (payload === 'arsip') {
        state.status_id = JADWAL_SELESAI
      }
    },
    setTab: (state, { payload }) => {
      state.tab = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getListSbi.pending, state => {
        state.isLoading = true
      })
      .addCase(getListSbi.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.listSurat = payload.data
      })
      .addCase(getListSbi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getSbi.pending, state => {
        state.isLoading = true
      })
      .addCase(getSbi.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.sbi = payload
      })
      .addCase(getSbi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getSpi.pending, state => {
        state.isLoading = true
      })
      .addCase(getSpi.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.spi = payload
      })
      .addCase(getSpi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createSbi.pending, state => {
        state.isLoading = true
      })
      .addCase(createSbi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        console.log(payload)
        toast.success('Sbi berhasil dibuat...')
      })
      .addCase(createSbi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(createSpi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(createSpi.pending, state => {
        state.isLoading = true
      })
      .addCase(createSpi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload

        toast.success('Spi berhasil dibuat...')
      })
      .addCase(editSbi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        console.log('payload')
        toast.success('surat SBI diupdate...')
      })
      .addCase(editSbi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = `error ${payload.status} something wrong with the server`

          toast.error(message)
        }
      })
      .addCase(editSpi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        console.log('payload')
        toast.success('surat SPI diupdate...')
      })
      .addCase(editSpi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = `error ${payload.status} something wrong with the server`

          toast.error(message)
        }
      })
  }
})

export const { clearValues, changePage, setEditSbi, setFasilitas, setStatus, setTab } = SbiSlice.actions

export default SbiSlice.reducer
