import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  propinsi_id: '',
  bidang_id: ''
}

const initialState = {
  isLoading: false,
  lvkf: [],
  fihi: [],
  fihiJadwal: [],
  dataFihi: [],
  fihiPihak: [],
  dataFihidok: [],
  namaDoc: '',
  tab: '',
  subTab: '',
  total: 0,
  numOfPages: 1,
  current_page: 1,
  isEditing: false,
  per_page: 10,
  status: [1],
  fas_id: '',
  fihi_id: '',
  jadwal_id: '',
  status: '',
  ...initialFiltersState
}

export const getFihi = createAsyncThunk('fihi/getFihi', async (_, thunkAPI) => {
  let url = `/api/fihi`
  const session = await getSession()

  const insep = `${thunkAPI.getState().jadwal.insp_master_id}`

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      page: `${thunkAPI.getState().fihi.current_page}`,
      limit: `${thunkAPI.getState().fihi.per_page}`,
      status: `${thunkAPI.getState().fihi.status}`,
      insp_master_id: thunkAPI.getState().jadwal.inspektur
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

export const getfihiJadwal = createAsyncThunk('fihi/getfihiJadwal', async (id, thunkAPI) => {
  let url = `/api/fihi`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      limit: `${thunkAPI.getState().fihi.per_page}`,
      status: `${thunkAPI.getState().fihi.status}`,
      jadwal_id: id
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

export const getdataFihi = createAsyncThunk('fihi/getdataFihi', async (id, thunkAPI) => {
  let url = `/api/fihi/${id}`
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

export const createFihi = createAsyncThunk('fihi/createFihi', async (dataform, thunkAPI) => {
  let url = `/api/fihi`
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

export const getFihiPihak = createAsyncThunk('fihi/getFihiPihak', async (id, thunkAPI) => {
  let url = `/api/fihiPihak`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      limit: `${thunkAPI.getState().fihi.per_page}`,
      fihi_id: id
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

export const createFihiPihak = createAsyncThunk('fihi/createFihiPihak', async (dataform, thunkAPI) => {
  let url = `/api/fihiPihak`
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

export const editFihiPihak = createAsyncThunk('fihi/editFihiPihak', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/fihiPihak/${id}`
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

export const deleteFihiPihak = createAsyncThunk('fihi/deleteFihiPihak', async (params, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/fihiPihak/${params.id}`, {
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

export const fihiFormTabel = createAsyncThunk('fihi/fihiFormTabel', async (dataform, thunkAPI) => {
  let url = `/api/fihiFormTabel`
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

export const fihiFormTabeledit = createAsyncThunk('fihi/fihiFormTabeledit', async ({ id, dataform }, thunkAPI) => {
  try {
    const session = await getSession()
    let url = `/api/fihiFormTabel/${id}`

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

export const fihiFormTabeldelete = createAsyncThunk('fihi/fihiFormTabeldelete', async (params, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/fihiFormTabel/${params.id}`, {
      headers: {
        'balis-token': session.user.accessToken
      },
      params: {
        fihi_id: params.fihi_id
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

export const simpanForm = createAsyncThunk('fihi/simpanForm', async ({ id, dataform }, thunkAPI) => {
  try {
    const session = await getSession()
    let url = `/api/fihi/${id}`

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

export const fihiSimpan = createAsyncThunk('fihi/fihiSimpan', async ({ fihi_id, dataform }, thunkAPI) => {
  try {
    const session = await getSession()
    let url = `/api/fihiSimpan/${fihi_id}`

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

export const deleteFihi = createAsyncThunk('fihi/deleteFihi', async (params, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/fihi/${params.id}`, {
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

export const uploadFihiDok = createAsyncThunk('fihi/uploadFihiDok', async (dataform, thunkAPI) => {
  const session = await getSession()
  let url = `/api/fihi/dok`

  let config = {
    headers: {
      'balis-token': session.user.accessToken,
      'Content-Type': 'multipart/form-data'
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

export const deleteFihiDok = createAsyncThunk('fihi/deleteFihiDok', async (params, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/fihi/dok/${params.id}`, {
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

export const fihiSelesai = createAsyncThunk('fihi/fihiSelesai', async (fihi_id, thunkAPI) => {
  try {
    const session = await getSession()
    let url = `/api/fihiSelesai/${fihi_id}`

    let config = {
      headers: {
        'balis-token': session.user.accessToken
      }
    }
    const resp = await customFetch.put(url, fihi_id, config)

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

export const getDokumenfihi = createAsyncThunk('fihi/getDokumenfihi', async (id, thunkAPI) => {
  const session = await getSession()
  const url = `/api/fihi/dok/${id}`

  const config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    responseType: 'blob' // Set response type to blob to handle binary data
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.status === 200) {
      // Directly return the blob data to the component
      return resp.data
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

const FihiSlice = createSlice({
  name: 'fihi',
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
    setEdit: (state, { payload }) => {
      return { ...state, isEditing: true, sbi: payload }
    },
    setTab: (state, { payload }) => {
      state.tab = payload
    },
    setNamadoc: (state, { payload }) => {
      state.namaDoc = payload
    },
    setStatusFihi: (state, { payload }) => {
      state.status = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getFihi.pending, state => {
        state.isLoading = true
      })
      .addCase(getFihi.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.fihi = payload.data
      })
      .addCase(getFihi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getfihiJadwal.pending, state => {
        state.isLoading = true
      })
      .addCase(getfihiJadwal.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.fihiJadwal = payload
      })
      .addCase(getfihiJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createFihi.pending, state => {
        state.isLoading = true
      })
      .addCase(createFihi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Fihi berhasil ditambahkan...')
      })
      .addCase(createFihi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(getdataFihi.pending, state => {
        state.isLoading = true
      })
      .addCase(getdataFihi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataFihi = payload
      })
      .addCase(getdataFihi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getFihiPihak.pending, state => {
        state.isLoading = true
      })
      .addCase(getFihiPihak.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.fihiPihak = payload.data
      })
      .addCase(getFihiPihak.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createFihiPihak.pending, state => {
        state.isLoading = true
      })
      .addCase(createFihiPihak.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Fihi pihak berhasil ditambahkan...')
      })
      .addCase(createFihiPihak.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(editFihiPihak.pending, state => {
        state.isLoading = true
      })
      .addCase(editFihiPihak.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Fihi pihak berhasil diupdate...')
      })
      .addCase(editFihiPihak.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(deleteFihiPihak.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteFihiPihak.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteFihiPihak.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(fihiFormTabel.pending, state => {
        state.isLoading = true
      })
      .addCase(fihiFormTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data tabel berhasil ditambahkan...')
      })
      .addCase(fihiFormTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(fihiFormTabeledit.pending, state => {
        state.isLoading = true
      })
      .addCase(fihiFormTabeledit.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data berhasil diupdate...')
      })
      .addCase(fihiFormTabeledit.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(fihiFormTabeldelete.pending, state => {
        state.isLoading = true
      })
      .addCase(fihiFormTabeldelete.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(fihiFormTabeldelete.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(simpanForm.pending, state => {
        state.isLoading = true
      })
      .addCase(simpanForm.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Penilian Fihi disimpan...')
      })
      .addCase(simpanForm.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(fihiSimpan.pending, state => {
        state.isLoading = true
      })
      .addCase(fihiSimpan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Penilaian FIHI disimpan...')
      })
      .addCase(fihiSimpan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteFihi.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteFihi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteFihi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(uploadFihiDok.pending, state => {
        state.isLoading = true
      })
      .addCase(uploadFihiDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Fihi dokumen berhasil diupload...')
      })
      .addCase(uploadFihiDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(deleteFihiDok.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteFihiDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteFihiDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(fihiSelesai.pending, state => {
        state.isLoading = true
      })
      .addCase(fihiSelesai.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Fihi selesai...')
      })
      .addCase(fihiSelesai.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getDokumenfihi.pending, state => {
        state.isLoading = true
      })
      .addCase(getDokumenfihi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataFihidok = payload

        // Create a URL for the file and determine its MIME type and extension
        const fileUrl = window.URL.createObjectURL(payload)
        const mimeType = payload.type
        let extension = ''

        // Set the file extension based on the MIME type
        switch (mimeType) {
          case 'application/pdf':
            extension = 'pdf'
            break
          case 'image/jpeg':
            extension = 'jpg'
            break
          case 'image/png':
            extension = 'png'
            break
          case 'application/msword':
            extension = 'doc'
            break
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            extension = 'docx'
            break
          case 'application/vnd.ms-excel':
            extension = 'xls'
            break
          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            extension = 'xlsx'
            break
          default:
            extension = 'file' // fallback if MIME type is unrecognized
        }

        // Create and click the download link
        const link = document.createElement('a')

        link.href = fileUrl
        link.setAttribute('download', `${state.namaDoc || 'document'}.${extension}`) // Use `namadoc` if available
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
      })
      .addCase(getDokumenfihi.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { clearValues, changePage, setTab, setStatusFihi, setNamadoc } = FihiSlice.actions

export default FihiSlice.reducer
