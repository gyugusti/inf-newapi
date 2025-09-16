import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { STATUS_LKF } from '@/configs/lkfConfig'
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
  detailLkf: [],
  inkfdetail: [],
  nilaiLkf: [],
  sumberLkf: [],
  tab: '',
  subTab: '',
  total: 0,
  numOfPages: 1,
  current_page: 1,
  isEditing: false,
  per_page: 10,
  status: [1],
  fas_id: '',
  ...initialFiltersState
}

export const getLkf = createAsyncThunk('jadwal/getLkf', async (_, thunkAPI) => {
  let url = `/api/lkf`

  let config = {
    params: {
      page: `${thunkAPI.getState().lkf.current_page}`,
      limit: `${thunkAPI.getState().lkf.per_page}`,
      status: thunkAPI.getState().lkf.status,
      propinsi_id: thunkAPI.getState().lkf.propinsi_id,
      bidang_id: thunkAPI.getState().lkf.bidang_id,
      fas_id: thunkAPI.getState().lkf.fas_id
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

export const getShowLkf = createAsyncThunk('lkf/getShowLkf', async (id, thunkAPI) => {
  let url = `/api/lkf/${id}`

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

export const getInkfDetail = createAsyncThunk('lkf/getInkfDetail', async (id, thunkAPI) => {
  let url = `/api/lkfInkfDetail/${id}`

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

export const lkfNilai = createAsyncThunk('lkf/lkfNilai', async (id, thunkAPI) => {
  let url = `/api/lkfNilai/${id}`

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

export const simpanEva = createAsyncThunk('lkf/simpanEva', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lkfSimpanEva/${id}`

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

export const lkfSimpan = createAsyncThunk('lkf/lkfSimpan', async ({ lkf_id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lkfSimpan/${lkf_id}`

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

export const lkfSelesai = createAsyncThunk('lkf/lkfSelesai', async (lkf_id, thunkAPI) => {
  try {
    let url = `/api/lkfSelesai/${lkf_id}`

    let config = {}
    const resp = await customFetch.put(url, lkf_id, config)

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

export const lkfKembalikan = createAsyncThunk('lkf/lkfKembalikan', async (lkf_id, thunkAPI) => {
  try {
    let url = `/api/lkfKembalikan/${lkf_id}`

    let config = {}
    const resp = await customFetch.put(url, lkf_id, config)

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

export const lkfFormTabel = createAsyncThunk('lkf/lkfFormTabel', async (dataform, thunkAPI) => {
  let url = `/api/lkfFormTabel`

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

export const lkfFormTabeledit = createAsyncThunk('lkf/lkfFormTabeledit', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lkfFormTabel/${id}`

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

export const lkfFormTabeldelete = createAsyncThunk('lkf/lkfFormTabeldelete', async (params, thunkAPI) => {
  try {

    const resp = await customFetch.delete(`/api/lkfFormTabel/${params.id}`, {
      params: {
        lkf_id: params.lkf_id
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

export const lkfKirim = createAsyncThunk('lkf/lkfKirim', async (lkf_id, thunkAPI) => {
  try {
    let url = `/api/lkfKirim/${lkf_id}`

    let config = {}
    const resp = await customFetch.put(url, lkf_id, config)

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

const LkfSlice = createSlice({
  name: 'lkf',
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
    setStatus: (state, { payload }) => {
      state.current_page = 1

      switch (payload) {
        case 'daftar':
          state.status = [STATUS_LKF.LKF_VERI]
          break
        case 'arsip':
          state.status = [STATUS_LKF.LKF_ARSIP, STATUS_LKF.LKF_KEMBALI]
          break
        case 'draft_frontend':
          state.status = [STATUS_LKF.LKF_DRAFT, STATUS_LKF.LKF_KEMBALI]
          break
        case 'arsip_frontend':
          state.status = [STATUS_LKF.LKF_VERI, STATUS_LKF.LKF_ARSIP]
          break
        default:
          // Optional: Handle an unexpected payload value
          console.warn(`Unhandled payload: ${payload}`)
          break
      }
    },
    setSubtab: (state, { payload }) => {
      state.subTab = payload
    },
    setTab: (state, { payload }) => {
      state.tab = payload
    },
    setFasilitas: (state, { payload }) => {
      state.fas_id = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getLkf.pending, state => {
        state.isLoading = true
      })
      .addCase(getLkf.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.lvkf = payload.data
      })
      .addCase(getLkf.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getShowLkf.pending, state => {
        state.isLoading = true
      })
      .addCase(getShowLkf.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.detailLkf = payload
      })
      .addCase(getShowLkf.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(lkfNilai.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfNilai.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.nilaiLkf = payload
      })
      .addCase(lkfNilai.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(simpanEva.pending, state => {
        state.isLoading = true
      })
      .addCase(simpanEva.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Evaluasi Lkf disimpan...')
      })
      .addCase(simpanEva.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(lkfSimpan.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfSimpan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Penilaian Lvkf disimpan...')
      })
      .addCase(lkfSimpan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(lkfSelesai.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfSelesai.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('LKF berhasil di masukkan ke arsip...')
      })
      .addCase(lkfSelesai.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(lkfKembalikan.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfKembalikan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('LKF berhasil di masukkan ke arsip...')
      })
      .addCase(lkfKembalikan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(lkfKirim.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfKirim.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('LKF berhasil di kirim...')
      })
      .addCase(lkfKirim.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getInkfDetail.pending, state => {
        state.isLoading = true
      })
      .addCase(getInkfDetail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.inkfdetail = payload
      })
      .addCase(getInkfDetail.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(lkfFormTabel.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfFormTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data berhasil ditambahkan...')
      })
      .addCase(lkfFormTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(lkfFormTabeledit.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfFormTabeledit.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Data berhasil diupdate...')
      })
      .addCase(lkfFormTabeledit.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(lkfFormTabeldelete.pending, state => {
        state.isLoading = true
      })
      .addCase(lkfFormTabeldelete.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(lkfFormTabeldelete.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
  }
})

export const { clearValues, changePage, setStatus, setTab, setSubtab, setFasilitas } = LkfSlice.actions

export default LkfSlice.reducer
