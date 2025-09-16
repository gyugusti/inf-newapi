import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialFiltersState = {
  searchSrp: '',
  propinsi_id: '',
  bidang_id: ''
}

const initSrplhiState = {
  numOfPagesSrp: 1,
  totalSrp: 0,
  current_pageSrp: 1
}

const initialState = {
  isLoading: false,
  isLoadingSrp: false,
  sumberLhi: [],
  pekerjaLhi: [],
  dosisLhi: [],
  kesehatanLhi: [],
  dokumenLhi: [],
  tab: '',
  isEditing: false,
  per_page: 10,
  fas_id: '',
  numOfPages: 1,
  total: 0,
  current_page: 1,
  search: '',
  ...initialFiltersState,
  ...initSrplhiState
}

export const getLhiSumber = createAsyncThunk('dataLhi/lhiSumber', async (_, thunkAPI) => {
  let url = `/api/lhiSumber`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataLhi.current_pageSrp}`,
      limit: `${thunkAPI.getState().dataLhi.per_page}`,
      fas_id: thunkAPI.getState().dataLhi.fas_id,
      cari: thunkAPI.getState().dataLhi.searchSrp
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

export const createLhiSumber = createAsyncThunk('dataLhi/createLhiSumber', async (dataform, thunkAPI) => {
  let url = `/api/lhiSumber`
  const session = await getSession()

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

export const editLhiSumber = createAsyncThunk('dataLhi/editLhiSumber', async ({ id, dataform }, thunkAPI) => {
  try {
    const session = await getSession()
    let url = `/api/lhiSumber/${id}`

    let config = {
      headers: {
        'balis-token': session.user.accessToken
      }
    }

    const resp = await customFetch.put(url, dataform, config)

    if (resp.data.status === 200) {
      return resp.data.response
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

export const deleteLhiSumber = createAsyncThunk('dataLhi/deleteLhiSumber', async (params, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/lhiSumber/${params.id}`, {
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

export const getLhiPekerja = createAsyncThunk('dataLhi/getLhiPekerja', async (searchTerm = '', thunkAPI) => {
  let url = `/api/lhiPekerja`
  const session = await getSession()

  console.log(searchTerm)

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataLhi.current_page}`,
      limit: `${thunkAPI.getState().dataLhi.per_page}`,
      fas_id: thunkAPI.getState().dataLhi.fas_id,
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

export const createLhiPekerja = createAsyncThunk('dataLhi/createLhiPekerja', async (dataform, thunkAPI) => {
  let url = `/api/lhiPekerja`
  const session = await getSession()

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

export const editLhiPekerja = createAsyncThunk('dataLhi/editLhiPekerja', async ({ id, dataform }, thunkAPI) => {
  try {
    const session = await getSession()
    let url = `/api/lhiPekerja/${id}`

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

export const deleteLhiPekerja = createAsyncThunk('dataLhi/deleteLhiPekerja', async (params, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/lhiPekerja/${params.id}`, {
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

export const lhiPekerjaStore = createAsyncThunk('dataLhi/lhiPekerjaStore', async (dataform, thunkAPI) => {
  let url = `/api/lhiPekerjaStore`
  const session = await getSession()

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

export const getLhiDosis = createAsyncThunk('dataLhi/getLhiDosis', async (_, thunkAPI) => {
  let url = `/api/lhiDosis`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataLhi.current_page}`,
      limit: `${thunkAPI.getState().dataLhi.per_page}`,
      fas_id: thunkAPI.getState().dataLhi.fas_id,
      cari: thunkAPI.getState().dataLhi.searchSrp
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

export const createLhiDosis = createAsyncThunk('dataLhi/createLhiDosis', async (dataform, thunkAPI) => {
  let url = `/api/lhiDosis`
  const session = await getSession()

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

export const editLhiDosis = createAsyncThunk('dataLhi/editLhiDosis', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lhiDosis/${id}`
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

export const deleteLhiDosis = createAsyncThunk('dataLhi/deleteLhiDosis', async (params, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/lhiDosis/${params.id}`, {
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

export const lhiDosisStore = createAsyncThunk('dataLhi/lhiDosisStore', async (dataform, thunkAPI) => {
  let url = `/api/lhiDosisStore`
  const session = await getSession()

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

export const getLhiKes = createAsyncThunk('dataLhi/getLhiKes', async (_, thunkAPI) => {
  let url = `/api/lhiKes`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataLhi.current_page}`,
      limit: `${thunkAPI.getState().dataLhi.per_page}`
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

export const createLhikes = createAsyncThunk('dataLhi/createLhikes', async (dataform, thunkAPI) => {
  let url = `/api/lhiKes`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    }
  }

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

export const deleteLhiKes = createAsyncThunk('dataLhi/deleteLhiKes', async (params, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/lhiKes/${params.id}`, {
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
    console.error('Error Response:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const lhiKesStore = createAsyncThunk('dataLhi/lhiKesStore', async (dataform, thunkAPI) => {
  let url = `/api/lhiKesStore`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    }
  }

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

export const editLhiKes = createAsyncThunk('dataLhi/editLhiKes', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lhiKes/${id}`
    const session = await getSession()

    let config = {
      headers: {
        'balis-token': session.user.accessToken
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

export const getLhiDok = createAsyncThunk('dataLhi/lhiDok', async (_, thunkAPI) => {
  let url = `/api/lhiDok`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().dataLhi.current_page}`,
      limit: `${thunkAPI.getState().dataLhi.per_page}`,
      fas_id: thunkAPI.getState().dataLhi.fas_id,
      cari: thunkAPI.getState().dataLhi.searchSrp
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
    console.error('Error Response:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const createLhiDok = createAsyncThunk('dataLhi/createLhiDok', async (dataform, thunkAPI) => {
  let url = `/api/lhiDok`
  const session = await getSession()

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

const DataLhiSlice = createSlice({
  name: 'dataLhi',
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
      .addCase(getLhiSumber.pending, state => {
        state.isLoadingSrp = true
      })
      .addCase(getLhiSumber.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoadingSrp = false
        state.numOfPagesSrp = countPage
        state.totalSrp = payload.total
        state.current_pageSrp = payload.current_page
        state.sumberLhi = payload.data
      })
      .addCase(getLhiSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLhiSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(createLhiSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data sumber berhasil ditambahkan...')
      })
      .addCase(createLhiSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLhiSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(editLhiSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data sumber berhasil diedit...')
      })
      .addCase(editLhiSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteLhiSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLhiSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLhiSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getLhiPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(getLhiPekerja.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.pekerjaLhi = payload.data
      })
      .addCase(getLhiPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLhiPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(createLhiPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi pekerja berhasil ditambahkan...')
      })
      .addCase(createLhiPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLhiPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(editLhiPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi pekerja berhasil ditambahkan...')
      })
      .addCase(editLhiPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteLhiPekerja.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLhiPekerja.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLhiPekerja.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lhiPekerjaStore.pending, state => {
        state.isLoading = true
      })
      .addCase(lhiPekerjaStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi pekerja berhasil ditambahkan...')
      })
      .addCase(lhiPekerjaStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getLhiDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(getLhiDosis.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dosisLhi = payload.data
      })
      .addCase(getLhiDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLhiDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(createLhiDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi pekerja berhasil ditambahkan...')
      })
      .addCase(createLhiDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLhiDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(editLhiDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi pekerja berhasil ditambahkan...')
      })
      .addCase(editLhiDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lhiDosisStore.pending, state => {
        state.isLoading = true
      })
      .addCase(lhiDosisStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi dosis pekerja berhasil ditambahkan...')
      })
      .addCase(lhiDosisStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteLhiDosis.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLhiDosis.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLhiDosis.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getLhiKes.pending, state => {
        state.isLoading = true
      })
      .addCase(getLhiKes.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.kesehatanLhi = payload.data
      })
      .addCase(getLhiKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLhikes.pending, state => {
        state.isLoading = true
      })
      .addCase(createLhikes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi kesehatan berhasil ditambahkan...')
      })
      .addCase(createLhikes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteLhiKes.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLhiKes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLhiKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lhiKesStore.pending, state => {
        state.isLoading = true
      })
      .addCase(lhiKesStore.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi dosis pekerja berhasil ditambahkan...')
      })
      .addCase(lhiKesStore.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLhiKes.pending, state => {
        state.isLoading = true
      })
      .addCase(editLhiKes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data Lhi pekerja berhasil ditambahkan...')
      })
      .addCase(editLhiKes.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getLhiDok.pending, state => {
        state.isLoading = true
      })
      .addCase(getLhiDok.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.dokumenLhi = payload.data
      })
      .addCase(getLhiDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLhiDok.pending, state => {
        state.isLoading = true
      })
      .addCase(createLhiDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data dokumen berhasil diupdate...')
      })
      .addCase(createLhiDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
  }
})

export const { clearValues, changePage, changePageSrp, handleChangeSrp, setFasilitas, clearSrpfilter } =
  DataLhiSlice.actions

export default DataLhiSlice.reducer
