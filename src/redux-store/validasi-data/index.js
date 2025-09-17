import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialFiltersState = {
  search: '',
  searchSrp: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  propinsi_id: '',
  bidang_id: '',
  tahap_reg_id: '',
  limit: 100,
  merk: '',
  merk_tabung: '',
  no_seri: '',
  no_seri_tabung: '',
  tipe: '',
  tipe_tabung: '',
  cari: '',
  current_pageSrp: 1
}

const initialState = {
  isLoading: false,
  isLoadingSrp: false,
  listRegsrp: [],
  listDokumenSrp: [],
  detailRegsrp: [],
  listMasterSrp: [],
  listSrpInstansi: [],
  detailSrp: [],
  jenis_sumber_id: '',
  jenis_dokumen_id: [],
  srpId: [],
  jadwalSrp: [],
  validator: '',
  inspektur: '',
  koordinator: '',
  fasId: '',
  tab: '',
  msg: '',
  total: 0,
  numOfPages: 1,
  current_page: 1,
  per_page: 20,
  saveSuccess: false,
  ...initialFiltersState
}

export const getRegistrasiSrp = createAsyncThunk('validasiData/getRegistrasiSrp', async (_, thunkAPI) => {
  let url = `/api/registrasi/srp`

  let config = {
    params: {
      page: thunkAPI.getState().validasiData.current_page,
      limit: thunkAPI.getState().validasiData.per_page,
      tahap_reg_id: thunkAPI.getState().validasiData.tahap_reg_id,
      validator_id: thunkAPI.getState().validasiData.validator,
      otorisator_id: thunkAPI.getState().validasiData.koordinator,
      insp_master_id: thunkAPI.getState().validasiData.inspektur,
      cari: thunkAPI.getState().validasiData.cari
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan || 'Unknown error')
    }
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401 || error.response?.status === 400) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      return thunkAPI.rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'There was an error'
      })
    }
  }
})

export const getRegsrpDetail = createAsyncThunk('validasiData/getRegsrpDetail', async (id, thunkAPI) => {
  let url = `/api/registrasi/srp/${id}`

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

export const createRegSumber = createAsyncThunk('validasiData/createRegSumber', async (dataform, thunkAPI) => {
  let url = `/api/registrasi/srp`

  let config = {}

  try {
    const resp = await customFetch.post(url, dataform, config)

    return resp.data
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      if (error.response?.status === 400) {
        return thunkAPI.rejectWithValue(error.response?.data?.keterangan || 'There was an error')
      } else {
        return thunkAPI.rejectWithValue({
          status: error.response?.status || 500,
          message: error.response?.data?.keterangan || 'There was an error'
        })
      }
    }
  }
})

export const editRegSumber = createAsyncThunk('validasiData/editRegSumber', async ({ id, dataforms }, thunkAPI) => {
  try {
    let url = `/api/registrasi/srp/${id}`

    let config = {}

    const resp = await customFetch.put(url, dataforms, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      return thunkAPI.rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'There was an error'
      })
    }
  }
})

export const deleteRegSumber = createAsyncThunk('validasiData/deleteRegSumber', async (params, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/registrasi/srp/destroy`, {
      params: {
        reg_srp_id: [params.id]
      }
    })

    if (resp.data.status === 200) {
      return resp.data
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      return thunkAPI.rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'There was an error'
      })
    }
  }
})

export const insertDocSumber = createAsyncThunk('validasiData/insertDocSumber', async (dataform, thunkAPI) => {
  let url = `/api/registrasi/srp/doc`

  let config = {}

  try {
    const resp = await customFetch.post(url, dataform, config)

    return resp.data
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      if (error.response?.status === 400) {
        return thunkAPI.rejectWithValue(error.response?.data?.keterangan || 'There was an error')
      } else {
        return thunkAPI.rejectWithValue({
          status: error.response?.status || 500,
          message: error.response?.data?.keterangan || 'There was an error'
        })
      }
    }
  }
})

export const kevalidatorRegSumber = createAsyncThunk(
  'validasiData/kevalidatorRegSumber',
  async (dataform, thunkAPI) => {
    let url = `/api/registrasi/srp/kirim`

    let config = {}

    try {
      const resp = await customFetch.post(url, dataform, config)

      return resp.data
    } catch (error) {
      console.log('Error response:', error.response?.status, error.response?.data)

      if (error.response?.status === 401) {
        thunkAPI.dispatch(handleLogout())

        return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
      } else {
        if (error.response?.status === 400) {
          return thunkAPI.rejectWithValue(error.response?.data?.keterangan || 'There was an error')
        } else {
          return thunkAPI.rejectWithValue({
            status: error.response?.status || 500,
            message: error.response?.data?.keterangan || 'There was an error'
          })
        }
      }
    }
  }
)

export const kirimOtorisatorSrp = createAsyncThunk(
  'validasiData/kirimOtorisatorSrp',
  async ({ id, dataform }, thunkAPI) => {
    try {
      let url = `/api/registrasi/srp/kirimOtorisator/${id}`

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
  }
)

export const kembalikanSrp = createAsyncThunk('validasiData/kembalikanSrp', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/registrasi/srp/kembalikan/${id}`

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

export const tolakSrp = createAsyncThunk('validasiData/tolakSrp', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/registrasi/srp/ditolak/${id}`

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

export const selesaiSrp = createAsyncThunk('validasiData/selesaiSrp', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/registrasi/srp/selesai/${id}`

    let config = {}
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
      if (error.response.keterangan) {
        return thunkAPI.rejectWithValue(error.response.keterangan)
      } else {
        return thunkAPI.rejectWithValue(error.response)
      }
    }
  }
})

export const dokumenRegSumber = createAsyncThunk('validasiData/dokumenRegSumber', async (reg_srp_id, thunkAPI) => {
  let url = `/api/registrasi/srp/doc`

  let config = {
    params: {
      reg_srp_id: reg_srp_id,
      jenis_dokumen_id: thunkAPI.getState().validasiData.jenis_dokumen_id
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

export const validasiSrpSimpan = createAsyncThunk(
  'validasiData/validasiSrpSimpan',
  async ({ id, dataform }, thunkAPI) => {
    try {
      let url = `/api/registrasi/srp/simpan/${id}`

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
  }
)

export const getListMasterSrp = createAsyncThunk('validasiData/getListMasterSrp', async (_, thunkAPI) => {
  let url = `/api/registrasi/srp/list`

  let config = {
    params: {
      limit: thunkAPI.getState().validasiData.limit,
      jenis_sumber_id: thunkAPI.getState().validasiData.jenis_sumber_id,
      merk: thunkAPI.getState().validasiData.merk,
      merk_tabung: thunkAPI.getState().validasiData.merk_tabung,
      no_seri: thunkAPI.getState().validasiData.no_seri,
      no_seri_tabung: thunkAPI.getState().validasiData.no_seri_tabung,
      tipe: thunkAPI.getState().validasiData.tipe,
      tipe_tabung: thunkAPI.getState().validasiData.tipe_tabung
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan || 'Unknown error')
    }
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      return thunkAPI.rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'There was an error'
      })
    }
  }
})

export const dispoManualSrp = createAsyncThunk('validasiData/dispoManualSrp', async ({ id, dataforms }, thunkAPI) => {
  try {
    console.log(dataforms)

    let url = `/api/registrasi/srp/dispoManual/${id}`

    let config = {}
    const resp = await customFetch.put(url, dataforms, config)

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

export const getSensusSrp = createAsyncThunk('validasiData/getSensusSrp', async (_, thunkAPI) => {
  let url = `/api/validasi/sumber`

  let config = {
    params: {
      page: thunkAPI.getState().validasiData.current_page,
      limit: thunkAPI.getState().validasiData.per_page,
      flag_valid: thunkAPI.getState().validasiData.flag_valid,
      cari: thunkAPI.getState().validasiData.cari,
      merk: thunkAPI.getState().validasiData.merk,
      merk_tabung: thunkAPI.getState().validasiData.merk_tabung,
      no_seri: thunkAPI.getState().validasiData.no_seri,
      no_seri_tabung: thunkAPI.getState().validasiData.no_seri_tabung,
      tipe: thunkAPI.getState().validasiData.tipe,
      tipe_tabung: thunkAPI.getState().validasiData.tipe_tabung,
      jenis_sumber_id: thunkAPI.getState().validasiData.jenis_sumber_id,
      fas_id: thunkAPI.getState().validasiData.fas_id
    }
  }

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan || 'Unknown error')
    }
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401 || error.response?.status === 400) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      return thunkAPI.rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'There was an error'
      })
    }
  }
})

export const getSensusSrpDetail = createAsyncThunk('validasiData/getSensusSrpDetail', async (id, thunkAPI) => {
  let url = `/api/validasi/sumber/${id}`

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

export const updateSumber = createAsyncThunk('validasiData/updateSumber', async ({ id, dataforms }, thunkAPI) => {
  try {
    let url = `/api/validasi/sumber/${id}`

    let config = {}

    const resp = await customFetch.put(url, dataforms, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      return thunkAPI.rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'There was an error'
      })
    }
  }
})

export const ubahStatusSrp = createAsyncThunk('validasiData/ubahStatusSrp', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/validasi/sumber/ubahStatusFas/${id}`

    console.log(dataform)

    let config = {}
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
      if (error.response.keterangan) {
        return thunkAPI.rejectWithValue(error.response.keterangan)
      } else {
        return thunkAPI.rejectWithValue(error.response)
      }
    }
  }
})

export const validasiSensusSimpan = createAsyncThunk(
  'validasiData/validasiSensusSimpan',
  async ({ id, dataform }, thunkAPI) => {
    try {
      let url = `/api/validasi/sumber/simpan/${id}`

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
  }
)

export const simpanInstansi = createAsyncThunk('validasiData/simpanInstansi', async (dataform, thunkAPI) => {
  try {
    const url = `/api/validasi/sumber/fasSumber`

    let config = {}

    const resp = await customFetch.post(url, dataform, config)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unautorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'There was an error')
  }
})

export const uploadSrpDok = createAsyncThunk('validasiData/uploadSrpDok', async (dataform, thunkAPI) => {
  console.log('upload')
  let url = `/api/validasi/sumber/doc`

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

export const deleteSrpDok = createAsyncThunk('validasiData/deleteSrpDok', async (params, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/validasi/sumber/deleteDoc/${params.id}`, {
      params: {
        reg_srp_id: [params.id]
      }
    })

    if (resp.data.status === 200) {
      return resp.data
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log('Error response:', error.response?.status, error.response?.data)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    } else {
      return thunkAPI.rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'There was an error'
      })
    }
  }
})

const validasiDataSlice = createSlice({
  name: 'validasiData',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.current_page = 1
      state[name] = value
    },

    handleChangeSrp: (state, { payload }) => {
      const { cari } = payload

      let updatedState = { ...state, ...payload }

      if (cari) {
        updatedState.current_page = 1
      }

      return updatedState
    },

    changePage: (state, { payload }) => {
      state.current_page = payload
    },
    changePageSrp: (state, { payload }) => {
      state.current_pageSrp = payload
    },
    clearValues: () => {
      return {
        ...initialState
      }
    },
    clearFilters: state => {
      state.cari = ''
      state.per_page = 20
      state.current_page = 1
      state.total = 0
    },
    clearSrpfilter: state => {
      state.merk = ''
      state.merk_tabung = ''
      state.no_seri = ''
      state.no_seri_tabung = ''
      state.tipe = ''
      state.tipe_tabung = ''
    },
    setInspektur: (state, { payload }) => {
      state.inspektur = payload
    },
    setValidator: (state, { payload }) => {
      state.validator = payload
    },
    setKoordinator: (state, { payload }) => {
      state.koordinator = payload
    },
    setTahapan: (state, { payload }) => {
      state.current_page = 1
      state.tahap_reg_id = payload
    },
    setSrpId: (state, { payload }) => {
      state.srpId = payload
    },
    setJadwalSrp: (state, { payload }) => {
      state.jadwalSrp = payload
    },
    setFasId: (state, { payload }) => {
      state.fasId = payload
    },
    resetSaveSuccess: state => {
      state.saveSuccess = false
    },
    setFlagValid: (state, { payload }) => {
      state.current_page = 1
      state.flag_valid = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getRegistrasiSrp.pending, state => {
        state.isLoading = true
      })
      .addCase(getRegistrasiSrp.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.listRegsrp = payload.data
      })
      .addCase(getRegistrasiSrp.rejected, (state, { payload }) => {
        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })
      .addCase(createRegSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(createRegSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        state.msg = 200
        toast.success('Data sumber berhasil ditambahkan...')
      })
      .addCase(createRegSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(editRegSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(editRegSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload

        toast.success('Data registrasi SRP berhasil di ubah')
      })
      .addCase(editRegSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(deleteRegSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteRegSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteRegSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(kirimOtorisatorSrp.pending, state => {
        state.isLoading = true
      })
      .addCase(kirimOtorisatorSrp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(kirimOtorisatorSrp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(dispoManualSrp.pending, state => {
        state.isLoading = true
      })
      .addCase(dispoManualSrp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        state.saveSuccess = true
        toast.success(payload.keterangan)
      })
      .addCase(dispoManualSrp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(kevalidatorRegSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(kevalidatorRegSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        state.msg = 200
        toast.success(payload.keterangan)
      })
      .addCase(kevalidatorRegSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(dokumenRegSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(dokumenRegSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.listDokumenSrp = payload
      })
      .addCase(dokumenRegSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(insertDocSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(insertDocSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        state.msg = 200
        toast.success('Dokumen sumber berhasil ditambahkan...')
      })
      .addCase(insertDocSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getRegsrpDetail.pending, state => {
        state.isLoading = true
      })
      .addCase(getRegsrpDetail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.detailRegsrp = payload
      })
      .addCase(getRegsrpDetail.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(validasiSrpSimpan.pending, state => {
        state.isLoading = true
      })
      .addCase(validasiSrpSimpan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        state.saveSuccess = true
        state.srpId = null
        toast.success('Validasi Srp disimpan...')
      })
      .addCase(validasiSrpSimpan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getListMasterSrp.pending, state => {
        state.isLoadingSrp = true
      })
      .addCase(getListMasterSrp.fulfilled, (state, { payload }) => {
        state.isLoadingSrp = false
        state.listMasterSrp = payload
      })
      .addCase(getListMasterSrp.rejected, (state, { payload }) => {
        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })
      .addCase(selesaiSrp.pending, state => {
        state.isLoading = true
      })
      .addCase(selesaiSrp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(selesaiSrp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(kembalikanSrp.pending, state => {
        state.isLoading = true
      })
      .addCase(kembalikanSrp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(kembalikanSrp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(tolakSrp.pending, state => {
        state.isLoading = true
      })
      .addCase(tolakSrp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(tolakSrp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(getSensusSrp.pending, state => {
        state.isLoading = true
      })
      .addCase(getSensusSrp.fulfilled, (state, { payload }) => {
        let countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.listSrpInstansi = payload.data
      })
      .addCase(getSensusSrp.rejected, (state, { payload }) => {
        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })
      .addCase(getSensusSrpDetail.pending, state => {
        state.isLoading = true
      })
      .addCase(getSensusSrpDetail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.detailSrp = payload
      })
      .addCase(getSensusSrpDetail.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(updateSumber.pending, state => {
        state.isLoading = true
      })
      .addCase(updateSumber.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload

        toast.success('Data registrasi SRP berhasil di ubah')
      })
      .addCase(updateSumber.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(ubahStatusSrp.pending, state => {
        state.isLoading = true
      })
      .addCase(ubahStatusSrp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(ubahStatusSrp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(validasiSensusSimpan.pending, state => {
        state.isLoading = true
      })
      .addCase(validasiSensusSimpan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        state.saveSuccess = true
        toast.success('Validasi Srp disimpan...')
      })
      .addCase(validasiSensusSimpan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(simpanInstansi.pending, state => {
        state.isLoading = true
      })
      .addCase(simpanInstansi.fulfilled, state => {
        state.isLoading = false
        state.saveSuccess = true
        toast.success('Instansi berhasil disimpan')
      })
      .addCase(simpanInstansi.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
      .addCase(uploadSrpDok.pending, state => {
        state.isLoading = true
      })
      .addCase(uploadSrpDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Srp dokumen berhasil diupload...')
      })
      .addCase(uploadSrpDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })
      .addCase(deleteSrpDok.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteSrpDok.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteSrpDok.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })
  }
})

export const {
  clearValues,
  clearFilters,
  clearSrpfilter,
  changePage,
  changePageSrp,
  handleChange,
  handleChangeSrp,
  setTahapan,
  setSrpId,
  setInspektur,
  setJadwalSrp,
  setValidator,
  setKoordinator,
  setFasId,
  resetSaveSuccess,
  setFlagValid
} = validasiDataSlice.actions

export default validasiDataSlice.reducer
