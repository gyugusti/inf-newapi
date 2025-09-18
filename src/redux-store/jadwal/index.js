// src/redux-store/jadwal/index.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// HAPUS import getSession - tidak diperlukan lagi karena token diinject via interceptor
// import { getSession } from 'next-auth/react'

import {
  JADWAL_DRAFT,
  JADWAL_PELAKSANAAN,
  JADWAL_PERBAIKAN,
  JADWAL_PERSETUJUAN,
  JADWAL_SELESAI,
  JADWAL_TERJADWAL
} from '@/configs/jadwalConfig'
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
  listJadwal: [],
  listJadwalIns: [],
  tab: '',
  total: 0,
  detailJadwal: [],
  detailInspektur: [],
  isEditing: false,
  numOfPages: 1,
  current_page: 1,
  per_page: 20,
  kode_area: '',
  tgl_mulai: '',
  tgl_akhir: '',
  hari: '',
  nama_kontak: '',
  telp_kontak: '',
  user_id_pj: '',
  user_input: '',
  batas_konfirmasi_insp: '',
  batas_konfirmasi_fas: '',
  status_id: '',
  status: '',
  sbi: '',
  spi: '',
  fas_id: '',
  surat_kat_id: '',
  inspektur: '',
  status_fihi: '',
  ...initialFiltersState
}

// ========================= Thunks =========================

export const getJadwal = createAsyncThunk('jadwal/getJadwal', async (_, thunkAPI) => {
  const params = {
    page: thunkAPI.getState().jadwal.current_page,
    limit: thunkAPI.getState().jadwal.per_page,
    status_id: thunkAPI.getState().jadwal.status,
    propinsi_id: thunkAPI.getState().jadwal.propinsi_id,
    bidang_id: thunkAPI.getState().jadwal.bidang_id,
    sbi: thunkAPI.getState().jadwal.sbi,
    spi: thunkAPI.getState().jadwal.spi,
    fas_id: thunkAPI.getState().jadwal.fas_id,
    insp_master_id: thunkAPI.getState().jadwal.inspektur,
    surat_kat_id: thunkAPI.getState().jadwal.surat_kat_id,
    cari: thunkAPI.getState().jadwal.search
  }

  try {
    const resp = await customFetch.get('/api/ver/jadwal', { params })

    if (resp.data.status === 200) {
      return resp.data.response
    }

    return thunkAPI.rejectWithValue(resp.data.keterangan || 'Unknown error')
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    }

    return thunkAPI.rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'There was an error'
    })
  }
})

export const getJadwalIns = createAsyncThunk('jadwal/getJadwalIns', async (_, thunkAPI) => {
  const params = {
    page: thunkAPI.getState().jadwal.current_page,
    limit: thunkAPI.getState().jadwal.per_page,
    status_id: thunkAPI.getState().jadwal.status,
    propinsi_id: thunkAPI.getState().jadwal.propinsi_id,
    bidang_id: thunkAPI.getState().jadwal.bidang_id,
    sbi: thunkAPI.getState().jadwal.sbi,
    spi: thunkAPI.getState().jadwal.spi,
    fas_id: thunkAPI.getState().jadwal.fas_id,
    insp_master_id: thunkAPI.getState().jadwal.inspektur,
    surat_kat_id: thunkAPI.getState().jadwal.surat_kat_id,
    cari: thunkAPI.getState().jadwal.search
  }

  try {
    const resp = await customFetch.get('/api/ins/jadwal', { params })

    if (resp.data.status === 200) {
      return resp.data.response
    }

    return thunkAPI.rejectWithValue(resp.data.keterangan || 'Unknown error')
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue({ status: 401, message: 'Unauthorized' })
    }

    return thunkAPI.rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'There was an error'
    })
  }
})

export const createJadwal = createAsyncThunk('jadwal/createJadwal', async (dataform, thunkAPI) => {
  try {
    const resp = await customFetch.post('/api/ver/jadwal', dataform)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const editJadwal = createAsyncThunk('jadwal/editJadwal', async ({ jadwal_id, data }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/api/ver/jadwal/${jadwal_id}`, data)

    thunkAPI.dispatch(clearValues())

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const deleteJadwal = createAsyncThunk('jadwal/deleteJadwal', async (jadwal_id, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/ver/jadwal/${jadwal_id}`)

    if (resp.data.status === 200) {
      return resp.data
    }

    return thunkAPI.rejectWithValue(resp.data.keterangan)
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const kirimJadwal = createAsyncThunk('jadwal/kirimJadwal', async (jadwal_id, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/ver/jadwalKirim/${jadwal_id}`, jadwal_id)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const setujuiJadwal = createAsyncThunk('jadwal/jadwalSetujui', async (jadwal_id, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/ver/jadwalSetujui/${jadwal_id}`, jadwal_id)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const kembaliJadwal = createAsyncThunk('jadwal/kembaliJadwal', async ({ jadwal_id, dataform }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/ver/jadwalKembali/${jadwal_id}`, dataform)

    thunkAPI.dispatch(clearValues())

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const jadwalPelaksanaan = createAsyncThunk('jadwal/jadwalPelaksanaan', async (jadwal_id, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/ver/jadwalPelaksanaan/${jadwal_id}`, jadwal_id)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const jadwalSelesai = createAsyncThunk('jadwal/jadwalSelesai', async (jadwal_id, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/ver/jadwalSelesai/${jadwal_id}`, jadwal_id)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const getdetailJadwal = createAsyncThunk('jadwal/getdetailJadwal', async (id, thunkAPI) => {
  const params = { status_fihi: thunkAPI.getState().jadwal.status_fihi }

  try {
    const resp = await customFetch.get(`/api/ver/jadwal/${id}`, { params })

    if (resp.data.status === 200) {
      return resp.data.response
    }

    return thunkAPI.rejectWithValue(resp.data.keterangan)
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    }

    return thunkAPI.rejectWithValue('There was an error')
  }
})

export const createJadwalTim = createAsyncThunk('jadwal/createJadwalTim', async (dataform, thunkAPI) => {
  try {
    const resp = await customFetch.post('/api/ver/jadwalTim', dataform)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const deleteJadwalTim = createAsyncThunk('jadwal/deleteJadwalTim', async (inspektur_id, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/ver/jadwalTim/${inspektur_id}`)

    if (resp.data.status === 200) {
      return resp.data
    }

    return thunkAPI.rejectWithValue(resp.data.keterangan)
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const editJadwalTim = createAsyncThunk('jadwal/editJadwalTim', async ({ inspektur_id, dataform }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/api/ver/jadwalTim/${inspektur_id}`, dataform)

    thunkAPI.dispatch(clearValues())

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const createJadwalFas = createAsyncThunk('jadwal/createJadwalFas', async (dataform, thunkAPI) => {
  try {
    const resp = await customFetch.post('/api/ver/jadwalFas', dataform)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const editJadwalFas = createAsyncThunk('jadwal/editJadwalFas', async ({ insp_fas_id, datas }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/ver/jadwalFas/${insp_fas_id}`, datas)

    thunkAPI.dispatch(clearValues())

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const deleteJadwalFas = createAsyncThunk('jadwal/deleteJadwalFas', async (insp_fas_id, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/ver/jadwalFas/${insp_fas_id}`)

    if (resp.data.status === 200) {
      return resp.data
    }

    return thunkAPI.rejectWithValue(resp.data.keterangan)
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const createJadwalKeg = createAsyncThunk('jadwal/createJadwalKeg', async (dataform, thunkAPI) => {
  try {
    const resp = await customFetch.post('/api/ver/jadwalKeg', dataform)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

export const createKonfirmInsp = createAsyncThunk('jadwal/createKonfirmInsp', async (dataform, thunkAPI) => {
  try {
    const resp = await customFetch.post('/api/ins/konfirmasi', dataform)

    return resp.data
  } catch (error) {
    // Log detail untuk debugging
    console.error('Error Response:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong')
  }
})

export const kirimJadwalInsp = createAsyncThunk('jadwal/kirimJadwalInsp', async (id, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/ins/kirim/${id}`, id)

    return resp.data
  } catch (error) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue('Unauthorized ! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response)
  }
})

// ========================= Slice =========================

const jadwalSlice = createSlice({
  name: 'jadwal',
  initialState,
  reducers: {
    setDetail: (state, { payload }) => {
      state.jadwal_id = payload
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.current_page = 1
      state[name] = value
    },
    changePage: (state, { payload }) => {
      state.current_page = payload
    },
    clearValues: () => {
      return {
        ...initialState
      }
    },
    clearFilters: state => {
      state.bidang_id = ''
      state.propinsi_id = ''
      state.search = ''
    },
    setEditJadwal: (state, { payload }) => {
      return { ...state, isEditing: true, detailJadwal: payload, ...payload }
    },
    setEditInspektur: (state, { payload }) => {
      return { isEditing: true, detailInspektur: payload, ...payload }
    },
    setStatus: (state, { payload }) => {
      state.current_page = 1

      switch (payload) {
        case 'draft':
          state.status = [JADWAL_DRAFT, JADWAL_PERBAIKAN]
          break
        case 'persetujuan':
          state.status = [JADWAL_PERSETUJUAN]
          break
        case 'terjadwal':
          state.status = [JADWAL_TERJADWAL]
          break
        case 'pelaksanaan':
          state.status = [JADWAL_PELAKSANAAN]
          break
        case 'arsip':
          state.status = [JADWAL_SELESAI]
          break
        case 'sbi':
          state.status = [JADWAL_PERSETUJUAN, JADWAL_TERJADWAL, JADWAL_PELAKSANAAN]
          break
        default:
          state.status = payload
          break
      }
    },
    setSbi: (state, { payload }) => {
      state.current_page = 1

      if (payload === 'sbi') {
        state.spi = 0
        state.sbi = 0
      }

      if (payload === 'arsip') {
        state.spi = 1
        state.sbi = 1
      }
    },
    setFasilitas: (state, { payload }) => {
      state.fas_id = payload
    },
    setInspektur: (state, { payload }) => {
      state.inspektur = payload
    },
    setSurat: (state, { payload }) => {
      state.surat_kat_id = payload
    },
    setTab: (state, { payload }) => {
      state.tab = payload
    },
    setFihi: (state, { payload }) => {
      state.status_fihi = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getJadwal.pending, state => {
        state.isLoading = true
      })
      .addCase(getJadwal.fulfilled, (state, { payload }) => {
        const countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.listJadwal = payload.data
      })
      .addCase(getJadwal.rejected, (state, { payload }) => {
        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(getJadwalIns.pending, state => {
        state.isLoading = true
      })
      .addCase(getJadwalIns.fulfilled, (state, { payload }) => {
        const countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.listJadwalIns = payload.data
      })
      .addCase(getJadwalIns.rejected, (state, { payload }) => {
        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(createJadwal.pending, state => {
        state.isLoading = true
      })
      .addCase(createJadwal.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Jadwal berhasil ditambahkan...')
      })
      .addCase(createJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error('error something wrong with the server')
        }
      })

      .addCase(deleteJadwal.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Jadwal berhasil dihapus...')
      })
      .addCase(deleteJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = payload?.status
            ? `error ${payload.status} something wrong with the server`
            : JSON.stringify(payload)

          toast.error(message)
        }
      })

      .addCase(kirimJadwal.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(`${payload} - kirim`)
        toast.success('Jadwal berhasil dikirim...')
      })
      .addCase(kirimJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = payload?.status
            ? `error ${payload.status} something wrong with the server`
            : JSON.stringify(payload)

          toast.error(message)
        }
      })

      .addCase(jadwalPelaksanaan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Status jadwal diubah menjadi pelaksanaan.')
      })
      .addCase(jadwalPelaksanaan.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = payload?.status
            ? `error ${payload.status} something wrong with the server`
            : JSON.stringify(payload)

          toast.error(message)
        }
      })

      .addCase(jadwalSelesai.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Status jadwal diubah menjadi selesai')
      })
      .addCase(jadwalSelesai.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = payload?.status
            ? `error ${payload.status} something wrong with the server`
            : JSON.stringify(payload)

          toast.error(message)
        }
      })

      .addCase(setujuiJadwal.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Jadwal berhasil disetujui...')
      })
      .addCase(setujuiJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = payload?.status
            ? `error ${payload.status} something wrong with the server`
            : JSON.stringify(payload)

          toast.error(message)
        }
      })

      .addCase(kembaliJadwal.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Jadwal berhasil dikembalikan...')
      })
      .addCase(kembaliJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = payload?.status
            ? `error ${payload.status} something wrong with the server`
            : JSON.stringify(payload)

          toast.error(message)
        }
      })

      .addCase(editJadwal.fulfilled, state => {
        state.isLoading = false
        toast.success('jadwal diupdate...')
      })
      .addCase(editJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = `error ${payload?.status} something wrong with the server`

          toast.error(message)
        }
      })

      .addCase(getdetailJadwal.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.detailJadwal = payload
      })
      .addCase(getdetailJadwal.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })

      .addCase(createJadwalTim.pending, state => {
        state.isLoading = true
      })
      .addCase(createJadwalTim.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tim berhasil ditambahkan...')
      })
      .addCase(createJadwalTim.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })

      .addCase(deleteJadwalTim.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteJadwalTim.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })

      .addCase(editJadwalTim.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('jadwal diupdate...')
      })
      .addCase(editJadwalTim.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = `error ${payload?.status} something wrong with the server`

          toast.error(message)
        }
      })

      .addCase(createJadwalFas.pending, state => {
        state.isLoading = true
      })
      .addCase(createJadwalFas.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = `${payload}alamatfas`
        toast.success('Alamat berhasil ditambahkan...')
      })
      .addCase(createJadwalFas.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })

      .addCase(editJadwalFas.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('jadwal fas diupdate...')
      })
      .addCase(editJadwalFas.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = `error ${payload?.status} something wrong with the server`

          toast.error(message)
        }
      })

      .addCase(deleteJadwalFas.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success(payload.keterangan)
      })
      .addCase(deleteJadwalFas.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(JSON.stringify(payload))
        }
      })

      .addCase(createJadwalKeg.pending, state => {
        state.isLoading = true
      })
      .addCase(createJadwalKeg.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = `${payload.keterangan}alamatkeg`
        toast.success('Kegiatan berhasil diupdate...')
      })
      .addCase(createJadwalKeg.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })

      .addCase(createKonfirmInsp.pending, state => {
        state.isLoading = true
      })
      .addCase(createKonfirmInsp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = `${payload}alamatkeg`
        toast.success('Kegiatan berhasil diupdate...')
      })
      .addCase(createKonfirmInsp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(JSON.stringify(payload))
        }
      })

      .addCase(kirimJadwalInsp.pending, state => {
        state.isLoading = true
      })
      .addCase(kirimJadwalInsp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Jadwal berhasil dikirim...')
      })
      .addCase(kirimJadwalInsp.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          const message = payload?.status
            ? `error ${payload.status} something wrong with the server`
            : JSON.stringify(payload)

          toast.error(message)
        }
      })
  }
})

export const {
  clearValues,
  clearFilters,
  setDetail,
  setEditJadwal,
  setFasilitas,
  changePage,
  setStatus,
  setSbi,
  setSurat,
  setTab,
  setFihi,
  setInspektur,
  handleChange
} = jadwalSlice.actions

export default jadwalSlice.reducer
