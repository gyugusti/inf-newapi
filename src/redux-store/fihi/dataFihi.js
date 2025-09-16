import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialFiltersState = {
  searchSrp: '',
  propinsi_id: '',
  bidang_id: ''
}

const initSrpfihiState = {
  numOfPagesSrp: 1,
  totalSrp: 0,
  current_pageSrp: 1
}

const initialState = {
  isLoading: false,
  isLoadingSrp: false,
  sumberFihi: [],
  pekerjaFihi: [],
  dosisFihi: [],
  kesehatanFihi: [],
  dokumenFihi: [],
  tab: '',
  isEditing: false,
  per_page: 10,
  fas_id: '',
  numOfPages: 1,
  total: 0,
  current_page: 1,
  search: '',
  ...initialFiltersState,
  ...initSrpfihiState
}

export const getFihiSumber = createAsyncThunk('dataFihi/fihiSumber', async (_, thunkAPI) => {
  let url = `/api/fihiSumber`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataFihi.current_pageSrp}`,
      limit: `${thunkAPI.getState().dataFihi.per_page}`,
      fas_id: thunkAPI.getState().dataFihi.fas_id,
      cari: thunkAPI.getState().dataFihi.searchSrp
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

export const createFihiSumber = createAsyncThunk('dataFihi/createFihiSumber', async (dataform, thunkAPI) => {
  let url = `/api/fihiSumber`

  let config = {}

  try {
    const resp = await customFetch.post(url, dataform, config)

    return resp.data
  } catch (error) {
    console.error('Error Response:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const editFihiSumber = createAsyncThunk('dataFihi/editFihiSumber', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/fihiSumber/${id}`

    let config = {}

    const resp = await customFetch.put(url, dataform, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.error('Error Response:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const deleteFihiSumber = createAsyncThunk('dataFihi/deleteFihiSumber', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/fihiSumber/${params.id}`)

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

export const getFihiPekerja = createAsyncThunk('dataFihi/getFihiPekerja', async (searchTerm = '', thunkAPI) => {
  let url = `/api/fihiPekerja`

  console.log(searchTerm)

  let config = {
    params: {
      page: `${thunkAPI.getState().dataFihi.current_page}`,
      limit: `${thunkAPI.getState().dataFihi.per_page}`,
      fas_id: thunkAPI.getState().dataFihi.fas_id,
      cari: searchTerm.length >= 3 ? searchTerm : '' // Only include 'cari' if searchTerm has 3 or more characters
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

export const createFihiPekerja = createAsyncThunk('dataFihi/createFihiPekerja', async (dataform, thunkAPI) => {
  let url = `/api/fihiPekerja`

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

export const editFihiPekerja = createAsyncThunk('dataFihi/editFihiPekerja', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/fihiPekerja/${id}`

    let config = {}

    const resp = await customFetch.put(url, dataform, config)

    return resp.data
  } catch (error) {
    console.error('Error Response:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const deleteFihiPekerja = createAsyncThunk('dataFihi/deleteFihiPekerja', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/fihiPekerja/${params.id}`)

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

export const fihiPekerjaStore = createAsyncThunk('dataFihi/fihiPekerjaStore', async (dataform, thunkAPI) => {
  let url = `/api/fihiPekerjaStore`

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

export const getFihiDosis = createAsyncThunk('dataFihi/getFihiDosis', async (_, thunkAPI) => {
  let url = `/api/fihiDosis`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataFihi.current_page}`,
      limit: `${thunkAPI.getState().dataFihi.per_page}`,
      fas_id: thunkAPI.getState().dataFihi.fas_id,
      cari: thunkAPI.getState().dataFihi.searchSrp
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

export const createFihiDosis = createAsyncThunk('dataFihi/createFihiDosis', async (dataform, thunkAPI) => {
  let url = `/api/fihiDosis`

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

export const editFihiDosis = createAsyncThunk('dataFihi/editFihiDosis', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/fihiDosis/${id}`

    let config = {}

    const resp = await customFetch.put(url, dataform, config)

    return resp.data
  } catch (error) {
    console.error('Error Response:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const deleteFihiDosis = createAsyncThunk('dataFihi/deleteFihiDosis', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/fihiDosis/${params.id}`)

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

export const fihiDosisStore = createAsyncThunk('dataFihi/fihiDosisStore', async (dataform, thunkAPI) => {
  let url = `/api/fihiDosisStore`

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

export const getFihiKes = createAsyncThunk('dataFihi/getFihiKes', async (_, thunkAPI) => {
  let url = `/api/fihiKes`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataFihi.current_page}`,
      limit: `${thunkAPI.getState().dataFihi.per_page}`
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

export const createFihikes = createAsyncThunk('dataFihi/createFihikes', async (dataform, thunkAPI) => {
  let url = `/api/fihiKes`

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

export const deleteFihiKes = createAsyncThunk('dataFihi/deleteFihiKes', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/fihiKes/${params.id}`)

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

export const fihiKesStore = createAsyncThunk('dataFihi/fihiKesStore', async (dataform, thunkAPI) => {
  let url = `/api/fihiKesStore`

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

export const editFihiKes = createAsyncThunk('dataFihi/editFihiKes', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/fihiKes/${id}`

    let config = {}

    const resp = await customFetch.put(url, dataform, config)

    return resp.data
  } catch (error) {
    console.error('Error Response:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const getFihiDok = createAsyncThunk('dataFihi/fihiDok', async (_, thunkAPI) => {
  let url = `/api/fihiDok`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataFihi.current_page}`,
      limit: `${thunkAPI.getState().dataFihi.per_page}`,
      fas_id: thunkAPI.getState().dataFihi.fas_id,
      cari: thunkAPI.getState().dataFihi.searchSrp
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

export const createFihiDok = createAsyncThunk('dataFihi/createFihiDok', async (dataform, thunkAPI) => {
  let url = `/api/fihiDok`

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

const DataFihiSlice = createSlice({
  name: 'dataFihi',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.current_page = payload
    },
    changePageSrp: (state, { payload }) => {
      state.current_pageSrp = payload
    },
    handleChangeSrp: (state, { payload: { name, value } }) => {
      state.current_page = 1
      state[name] = value
    },
    clearValues: () => {
      return {
        ...initialState
      }
    },
    clearSrpfilter: () => {
      return {
        ...initialFiltersState
      }
    },
    setFasilitas: (state, { payload }) => {
      state.fas_id = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getFihiSumber.pending, state => {
        state.isLoadingSrp = true
      })
      .addCase(getFihiSumber.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoadingSrp = false
        state.numOfPagesSrp = countPage
        state.totalSrp = payload.total
        state.current_pageSrp = payload.current_page
        state.sumberFihi = payload.data
      })
      .addCase(getFihiSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createFihiSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(createFihiSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data sumber berhasil ditambahkan...')
      })
      .addCase(createFihiSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editFihiSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(editFihiSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data sumber berhasil diedit...')
      })
      .addCase(editFihiSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteFihiSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteFihiSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteFihiSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getFihiPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(getFihiPekerja.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.pekerjaFihi = payload.data
      })
      .addCase(getFihiPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createFihiPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(createFihiPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi pekerja berhasil ditambahkan...')
      })
      .addCase(createFihiPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editFihiPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(editFihiPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi pekerja berhasil ditambahkan...')
      })
      .addCase(editFihiPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteFihiPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteFihiPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteFihiPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(fihiPekerjaStore.pending, state => {
        state.isLoading = true
      })
      .addCase(fihiPekerjaStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi pekerja berhasil ditambahkan...')
      })
      .addCase(fihiPekerjaStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getFihiDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(getFihiDosis.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dosisFihi = payload.data
      })
      .addCase(getFihiDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createFihiDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(createFihiDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi pekerja berhasil ditambahkan...')
      })
      .addCase(createFihiDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editFihiDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(editFihiDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi pekerja berhasil ditambahkan...')
      })
      .addCase(editFihiDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(fihiDosisStore.pending, state => {
        state.isLoading = true
      })
      .addCase(fihiDosisStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi dosis pekerja berhasil ditambahkan...')
      })
      .addCase(fihiDosisStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteFihiDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteFihiDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteFihiDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getFihiKes.pending, state => {
        state.isLoading = true
      })
      .addCase(getFihiKes.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.kesehatanFihi = payload.data
      })
      .addCase(getFihiKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createFihikes.pending, state => {
        state.isLoading = true
      })
      .addCase(createFihikes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi kesehatan berhasil ditambahkan...')
      })
      .addCase(createFihikes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteFihiKes.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteFihiKes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteFihiKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(fihiKesStore.pending, state => {
        state.isLoading = true
      })
      .addCase(fihiKesStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi dosis pekerja berhasil ditambahkan...')
      })
      .addCase(fihiKesStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editFihiKes.pending, state => {
        state.isLoading = true
      })
      .addCase(editFihiKes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Fihi pekerja berhasil ditambahkan...')
      })
      .addCase(editFihiKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getFihiDok.pending, state => {
        state.isLoading = true
      })
      .addCase(getFihiDok.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dokumenFihi = payload.data
      })
      .addCase(getFihiDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createFihiDok.pending, state => {
        state.isLoading = true
      })
      .addCase(createFihiDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data dokumen berhasil diupdate...')
      })
      .addCase(createFihiDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
  }
})

export const { clearValues, changePage, changePageSrp, handleChangeSrp, setFasilitas, clearSrpfilter } =
  DataFihiSlice.actions

export default DataFihiSlice.reducer
