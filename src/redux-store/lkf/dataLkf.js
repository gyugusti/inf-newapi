import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialFiltersState = {
  searchSrp: '',
  searchDoc: '',
  propinsi_id: '',
  bidang_id: ''
}

const initSrplkfState = {
  numOfPagesSrp: 1,
  totalSrp: 0,
  current_pageSrp: 1
}

const initialState = {
  isLoading: false,
  isLoadingSrp: false,
  sumberLkf: [],
  pekerjaLkf: [],
  dosisLkf: [],
  kesehatanLkf: [],
  dokumenLkf: [],
  tab: '',
  isEditing: false,
  per_page: 10,
  fas_id: '',
  numOfPages: 1,
  total: 0,
  current_page: 1,
  search: '',
  ...initialFiltersState,
  ...initSrplkfState
}

export const getLkfSumber = createAsyncThunk('dataLkf/lkfSumber', async (_, thunkAPI) => {
  let url = `/api/lkfSumber`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataLkf.current_pageSrp}`,
      limit: `${thunkAPI.getState().dataLkf.per_page}`,
      fas_id: thunkAPI.getState().dataLkf.fas_id,
      cari: thunkAPI.getState().dataLkf.searchSrp
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

export const createLkfSumber = createAsyncThunk('dataLkf/createLkfSumber', async (dataform, thunkAPI) => {
  let url = `/api/lkfSumber`

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

export const editLkfSumber = createAsyncThunk('dataLkf/editLkfSumber', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lkfSumber/${id}`

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

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

export const deleteLkfSumber = createAsyncThunk('dataLkf/deleteLkfSumber', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lkfSumber/${params.id}`)

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

export const getLkfPekerja = createAsyncThunk('dataLkf/getLkfPekerja', async (searchTerm = '', thunkAPI) => {
  let url = `/api/lkfPekerja`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataLkf.current_page}`,
      limit: `${thunkAPI.getState().dataLkf.per_page}`,
      fas_id: thunkAPI.getState().dataLkf.fas_id,
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

export const createLkfPekerja = createAsyncThunk('dataLkf/createLkfPekerja', async (dataform, thunkAPI) => {
  let url = `/api/lkfPekerja`

  let config = {}

  try {
    const resp = await customFetch.post(url, dataform, config)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const editLkfPekerja = createAsyncThunk('dataLkf/editLkfPekerja', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lkfPekerja/${id}`

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

export const deleteLkfPekerja = createAsyncThunk('dataLkf/deleteLkfPekerja', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lkfPekerja/${params.id}`)

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

export const lkfPekerjaStore = createAsyncThunk('dataLkf/lkfPekerjaStore', async (dataform, thunkAPI) => {
  let url = `/api/lkfPekerjaStore`

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

export const getLkfDosis = createAsyncThunk('dataLkf/getLkfDosis', async (_, thunkAPI) => {
  let url = `/api/lkfDosis`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataLkf.current_page}`,
      limit: `${thunkAPI.getState().dataLkf.per_page}`,
      fas_id: thunkAPI.getState().dataLkf.fas_id,
      cari: thunkAPI.getState().dataLkf.searchSrp
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

export const createLkfDosis = createAsyncThunk('dataLkf/createLkfDosis', async (dataform, thunkAPI) => {
  let url = `/api/lkfDosis`

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

export const editLkfDosis = createAsyncThunk('dataLkf/editLkfDosis', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lkfDosis/${id}`

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

export const deleteLkfDosis = createAsyncThunk('dataLkf/deleteLkfDosis', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lkfDosis/${params.id}`)

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

export const lkfDosisStore = createAsyncThunk('dataLkf/lkfDosisStore', async (dataform, thunkAPI) => {
  let url = `/api/lkfDosisStore`

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

export const getLkfKes = createAsyncThunk('dataLkf/getLkfKes', async (_, thunkAPI) => {
  let url = `/api/lkfKes`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataLkf.current_page}`,
      limit: `${thunkAPI.getState().dataLkf.per_page}`,
      fas_id: thunkAPI.getState().dataLkf.fas_id,
      cari: thunkAPI.getState().dataLkf.searchSrp
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

export const createLkfkes = createAsyncThunk('dataLkf/createLkfkes', async (dataform, thunkAPI) => {
  let url = `/api/lkfKes`

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

export const deleteLkfKes = createAsyncThunk('dataLkf/deleteLkfKes', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lkfKes/${params.id}`)

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

export const lkfKesStore = createAsyncThunk('dataLkf/lkfKesStore', async (dataform, thunkAPI) => {
  let url = `/api/lkfKesStore`

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

export const editLkfKes = createAsyncThunk('dataLkf/editLkfKes', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lkfKes/${id}`

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

export const getlkfDok = createAsyncThunk('dataLkf/lkfDok', async (_, thunkAPI) => {
  let url = `/api/dokumen`

  let config = {
    params: {
      page: `${thunkAPI.getState().dataLkf.current_page}`,
      limit: `${thunkAPI.getState().dataLkf.per_page}`,
      fas_id: thunkAPI.getState().dataLkf.fas_id,
      cari: thunkAPI.getState().dataLkf.searchDoc
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

export const createLkfDok = createAsyncThunk('dataLkf/createLkfDok', async ({ id, dataform }, thunkAPI) => {
  let url = `/api/lkfDokumen/${id}`

  let config = {}

  try {
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

const DataLkfSlice = createSlice({
  name: 'dataLkf',
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
      .addCase(getLkfSumber.pending, state => {
        state.isLoadingSrp = true
      })
      .addCase(getLkfSumber.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoadingSrp = false
        state.numOfPagesSrp = countPage
        state.totalSrp = payload.total
        state.current_pageSrp = payload.current_page
        state.sumberLkf = payload.data
      })
      .addCase(getLkfSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLkfSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(createLkfSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data sumber berhasil ditambahkan...')
      })
      .addCase(createLkfSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLkfSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(editLkfSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data sumber berhasil ditambahkan...')
      })
      .addCase(editLkfSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteLkfSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLkfSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLkfSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getLkfPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(getLkfPekerja.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.pekerjaLkf = payload.data
      })
      .addCase(getLkfPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLkfPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(createLkfPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf pekerja berhasil ditambahkan...')
      })
      .addCase(createLkfPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLkfPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(editLkfPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf pekerja berhasil ditambahkan...')
      })
      .addCase(editLkfPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteLkfPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLkfPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLkfPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lkfPekerjaStore.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfPekerjaStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf pekerja berhasil ditambahkan...')
      })
      .addCase(lkfPekerjaStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getLkfDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(getLkfDosis.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dosisLkf = payload.data
      })
      .addCase(getLkfDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLkfDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(createLkfDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf pekerja berhasil ditambahkan...')
      })
      .addCase(createLkfDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLkfDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(editLkfDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf pekerja berhasil ditambahkan...')
      })
      .addCase(editLkfDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lkfDosisStore.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfDosisStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf dosis pekerja berhasil ditambahkan...')
      })
      .addCase(lkfDosisStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteLkfDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLkfDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLkfDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getLkfKes.pending, state => {
        state.isLoading = true
      })
      .addCase(getLkfKes.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.kesehatanLkf = payload.data
      })
      .addCase(getLkfKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLkfkes.pending, state => {
        state.isLoading = true
      })
      .addCase(createLkfkes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf kesehatan berhasil ditambahkan...')
      })
      .addCase(createLkfkes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteLkfKes.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLkfKes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLkfKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lkfKesStore.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfKesStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf dosis pekerja berhasil ditambahkan...')
      })
      .addCase(lkfKesStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLkfKes.pending, state => {
        state.isLoading = true
      })
      .addCase(editLkfKes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lkf pekerja berhasil ditambahkan...')
      })
      .addCase(editLkfKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getlkfDok.pending, state => {
        state.isLoading = true
      })
      .addCase(getlkfDok.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dokumenLkf = payload.data
      })
      .addCase(getlkfDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLkfDok.pending, state => {
        state.isLoading = true
      })
      .addCase(createLkfDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data dokumen berhasil diupdate...')
      })
      .addCase(createLkfDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
  }
})

export const { clearValues, changePage, changePageSrp, handleChangeSrp, setFasilitas, clearSrpfilter } =
  DataLkfSlice.actions

export default DataLkfSlice.reducer
