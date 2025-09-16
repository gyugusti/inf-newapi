import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import {
  LHI_BATAL,
  LHI_CETAK,
  LHI_DRAFT,
  LHI_HAPUS,
  LHI_MENUNGGU_VERIF,
  LHI_SELESAI,
  LHI_SELESAI_VERIF
} from '@/configs/lhiConfig'
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
  lhi: [],
  dataLhi: [],
  lhiPihak: [],
  datalhidok: [],
  tab: '',
  subTab: '',
  total: 0,
  numOfPages: 1,
  current_page: 1,
  isEditing: false,
  per_page: 10,
  fas_id: '',
  lhi_id: '',
  insp_master_id: '',
  bidang_id: '',
  propinsi_id: '',
  status_id: '',
  namaDoc: '',
  ...initialFiltersState
}

export const getLhi = createAsyncThunk('lhi/getLhi', async (_, thunkAPI) => {
  let url = `/api/lhi`

  let config = {
    params: {
      page: `${thunkAPI.getState().lhi.current_page}`,
      limit: `${thunkAPI.getState().lhi.per_page}`,
      status_id: thunkAPI.getState().lhi.status_id,
      insp_master_id: thunkAPI.getState().lhi.insp_master_id,
      bidang_id: thunkAPI.getState().lhi.bidang_id,
      propinsi_id: thunkAPI.getState().lhi.propinsi_id
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

export const createLhi = createAsyncThunk('lhi/createLhi', async (dataform, thunkAPI) => {
  let url = `/api/lhi`

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

export const getdataLhi = createAsyncThunk('lhi/getdataLhi', async (id, thunkAPI) => {
  let url = `/api/lhi/${id}`

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

export const deleteLhi = createAsyncThunk('lhi/deleteLhi', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lhi/${params.id}`)

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

export const getLhiPihak = createAsyncThunk('lhi/getLhiPihak', async (id, thunkAPI) => {
  let url = `/api/lhiPihak`

  let config = {
    params: {
      limit: `${thunkAPI.getState().lhi.per_page}`,
      lhi_id: id
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

export const createLhiPihak = createAsyncThunk('lhi/createLhiPihak', async (dataform, thunkAPI) => {
  let url = `/api/lhiPihak`

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

export const editLhiPihak = createAsyncThunk('lhi/editLhiPihak', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lhiPihak/${id}`

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

export const deleteLhiPihak = createAsyncThunk('lhi/deleteLhiPihak', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lhiPihak/${params.id}`)

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

export const editLhitemuan = createAsyncThunk('lhi/editLhitemuan', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lhiTemuan/edit/${id}`

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

export const editLhilokasi = createAsyncThunk('lhi/editLhilokasi', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lhi/lokasi/${id}`

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

export const updateLhi = createAsyncThunk('lhi/updateLhi', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lhi/${id}`

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

export const lhiKirimVer = createAsyncThunk('lhi/lhiKirimVer', async (lhi_id, thunkAPI) => {
  try {
    let url = `/api/lhiKirim/verif/${lhi_id}`

    let config = {}
    const resp = await customFetch.put(url, lhi_id, config)

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

export const lhiKirimKoor = createAsyncThunk('lhi/lhiKirimKoor', async (lhi_id, thunkAPI) => {
  try {
    let url = `/api/lhiKirim/Koor/${lhi_id}`

    let config = {}
    const resp = await customFetch.put(url, lhi_id, config)

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

export const lhiFormTabel = createAsyncThunk('lhi/lhiFormTabel', async (dataform, thunkAPI) => {
  let url = `/api/lhiFormTabel`

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

export const lhiFormTabeledit = createAsyncThunk('lhi/lhiFormTabeledit', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lhiFormTabel/${id}`

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

export const lhiFormTabeldelete = createAsyncThunk('lhi/lhiFormTabeldelete', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lhiFormTabel/${params.id}`, {
      params: {
        lhi_id: params.lhi_id
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

export const lhiSelesai = createAsyncThunk('lhi/lhiSelesai', async (lhi_id, thunkAPI) => {
  try {
    let url = `/api/lhiSelesai/${lhi_id}`

    let config = {}
    const resp = await customFetch.put(url, lhi_id, config)

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

export const getDokumenlhi = createAsyncThunk('lhi/getDokumenlhi', async (id, thunkAPI) => {
  const url = `/api/lhi/dok/${id}`

  const config = {
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

export const deleteLhiDok = createAsyncThunk('lhi/deleteLhiDok', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lhi/dok/${params.id}`)

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

export const uploadLhiDok = createAsyncThunk('lhi/uploadLhiDok', async (dataform, thunkAPI) => {
  let url = `/api/lhi/dok`

  let config = {
    headers: {
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

const LhiSlice = createSlice({
  name: 'lhi',
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
    setTab: (state, { payload }) => {
      state.tab = payload
    },
    setInspektur: (state, { payload }) => {
      state.insp_master_id = payload
    },
    setNamadoc: (state, { payload }) => {
      state.namaDoc = payload
    },
    setStatusLhi: (state, { payload }) => {
      state.current_page = 1

      switch (payload) {
        case 'draft_inspektur':
          state.status_id = [LHI_DRAFT]
          break

        case 'arsip_inspektur':
          state.status_id = [LHI_BATAL, LHI_HAPUS, LHI_MENUNGGU_VERIF, LHI_SELESAI_VERIF, LHI_CETAK, LHI_SELESAI]
          break

        default:
          // Optional: handle cases where the payload doesn't match any known values
          state.status_id = payload
          break
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getLhi.pending, state => {
        state.isLoading = true
      })
      .addCase(getLhi.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.lhi = payload.data
      })
      .addCase(getLhi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getdataLhi.pending, state => {
        state.isLoading = true
      })
      .addCase(getdataLhi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataLhi = payload
      })
      .addCase(getdataLhi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLhi.pending, state => {
        state.isLoading = true
      })
      .addCase(createLhi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Lhi berhasil ditambahkan...')
      })
      .addCase(createLhi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(deleteLhi.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLhi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLhi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })

      .addCase(getLhiPihak.pending, state => {
        state.isLoading = true
      })
      .addCase(getLhiPihak.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.lhiPihak = payload.data
      })
      .addCase(getLhiPihak.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLhiPihak.pending, state => {
        state.isLoading = true
      })
      .addCase(createLhiPihak.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Lhi pihak berhasil ditambahkan...')
      })
      .addCase(createLhiPihak.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(editLhiPihak.pending, state => {
        state.isLoading = true
      })
      .addCase(editLhiPihak.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Lhi pihak berhasil diupdate...')
      })
      .addCase(editLhiPihak.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(deleteLhiPihak.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLhiPihak.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLhiPihak.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editLhitemuan.pending, state => {
        state.isLoading = true
      })
      .addCase(editLhitemuan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Lhi temuan berhasil diupdate...')
      })
      .addCase(editLhitemuan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(editLhilokasi.pending, state => {
        state.isLoading = true
      })
      .addCase(editLhilokasi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Lhi temuan berhasil diupdate...')
      })
      .addCase(editLhilokasi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(updateLhi.pending, state => {
        state.isLoading = true
      })
      .addCase(updateLhi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Lhi temuan berhasil diupdate...')
      })
      .addCase(updateLhi.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(lhiKirimVer.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Lhi berhasil dikirim...')
      })
      .addCase(lhiKirimVer.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          if (payload.status) {
            var message = `error ${payload.status} something wrong with the server`
          } else {
            var message = JSON.stringify(payload)
          }

          toast.error(message)
        }
      })
      .addCase(lhiKirimKoor.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Lhi berhasil dikirim...')
      })
      .addCase(lhiKirimKoor.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          if (payload.status) {
            var message = `error ${payload.status} something wrong with the server`
          } else {
            var message = JSON.stringify(payload)
          }

          toast.error(message)
        }
      })
      .addCase(lhiFormTabel.pending, state => {
        state.isLoading = true
      })
      .addCase(lhiFormTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data tabel berhasil ditambahkan...')
      })
      .addCase(lhiFormTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lhiFormTabeledit.pending, state => {
        state.isLoading = true
      })
      .addCase(lhiFormTabeledit.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data berhasil diupdate...')
      })
      .addCase(lhiFormTabeledit.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(lhiFormTabeldelete.pending, state => {
        state.isLoading = true
      })
      .addCase(lhiFormTabeldelete.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(lhiFormTabeldelete.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lhiSelesai.pending, state => {
        state.isLoading = true
      })
      .addCase(lhiSelesai.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('lhi selesai...')
      })
      .addCase(lhiSelesai.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getDokumenlhi.pending, state => {
        state.isLoading = true
      })
      .addCase(getDokumenlhi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.datalhidok = payload

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
      .addCase(getDokumenlhi.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteLhiDok.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteLhiDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteLhiDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(uploadLhiDok.pending, state => {
        state.isLoading = true
      })
      .addCase(uploadLhiDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('lhi dokumen berhasil diupload...')
      })
      .addCase(uploadLhiDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
  }
})

export const { clearValues, changePage, setTab, setStatusLhi, setInspektur, setNamadoc } = LhiSlice.actions

export default LhiSlice.reducer
