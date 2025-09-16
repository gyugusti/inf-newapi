import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

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
  tab: '',
  total: 0,
  detailJadwal: [],
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

const handleThunkError = (error, thunkAPI, defaultMessage = 'There was an error') => {
  const status = error?.response?.status

  if (status === 401) {
    thunkAPI.dispatch(handleLogout())

    return thunkAPI.rejectWithValue({ status, message: 'Unauthorized' })
  }

  return thunkAPI.rejectWithValue({
    status: status || 500,
    message: error?.response?.data?.message || defaultMessage
  })
}

const extractIdAndDataform = payload => {
  if (typeof payload === 'object' && payload !== null) {
    const { id, dataform, jadwal_id } = payload

    return { id: id ?? jadwal_id, dataform }
  }

  return { id: payload, dataform: undefined }
}

export const fetchList = createAsyncThunk('jadwalKoord/fetchList', async (_, thunkAPI) => {
  const state = thunkAPI.getState().jadwalKoord
  const params = {
    page: state.current_page,
    limit: state.per_page,
    status_id: state.status,
    propinsi_id: state.propinsi_id,
    bidang_id: state.bidang_id,
    sbi: state.sbi,
    spi: state.spi,
    fas_id: state.fas_id,
    insp_master_id: state.inspektur,
    surat_kat_id: state.surat_kat_id,
    cari: state.search
  }

  try {
    const resp = await customFetch.get('/api/koor/jadwal', { params })

    if (resp.data.status === 200) {
      return resp.data.response
    }

    return thunkAPI.rejectWithValue({
      status: resp.data.status,
      message: resp.data.keterangan || 'Unknown error'
    })
  } catch (error) {
    return handleThunkError(error, thunkAPI)
  }
})

export const create = createAsyncThunk('jadwalKoord/create', async (dataform, thunkAPI) => {
  try {
    const resp = await customFetch.post('/api/koor/jadwal', dataform)

    return resp.data
  } catch (error) {
    return handleThunkError(error, thunkAPI, 'Gagal menambahkan jadwal')
  }
})

export const detail = createAsyncThunk('jadwalKoord/detail', async (id, thunkAPI) => {
  const params = { status_fihi: thunkAPI.getState().jadwalKoord.status_fihi }

  try {
    const resp = await customFetch.get(`/api/koor/jadwal/${id}`, { params })

    if (resp.data.status === 200) {
      return resp.data.response
    }

    return thunkAPI.rejectWithValue({
      status: resp.data.status,
      message: resp.data.keterangan || 'Unknown error'
    })
  } catch (error) {
    return handleThunkError(error, thunkAPI)
  }
})

export const update = createAsyncThunk('jadwalKoord/update', async ({ id, dataform }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/koor/jadwal/${id}`, dataform)

    return resp.data
  } catch (error) {
    return handleThunkError(error, thunkAPI, 'Gagal memperbarui jadwal')
  }
})

export const remove = createAsyncThunk('jadwalKoord/remove', async (id, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/koor/jadwal/${id}`)

    if (resp.data.status === 200) {
      return resp.data
    }

    return thunkAPI.rejectWithValue({
      status: resp.data.status,
      message: resp.data.keterangan || 'Unknown error'
    })
  } catch (error) {
    return handleThunkError(error, thunkAPI, 'Gagal menghapus jadwal')
  }
})

export const approve = createAsyncThunk('jadwalKoord/approve', async (payload, thunkAPI) => {
  const { id, dataform } = extractIdAndDataform(payload)

  if (!id) {
    return thunkAPI.rejectWithValue({ status: 400, message: 'ID jadwal tidak ditemukan' })
  }

  try {
    const resp = await customFetch.put(`/api/koor/jadwalSetujui/${id}`, dataform ?? {})

    return resp.data
  } catch (error) {
    return handleThunkError(error, thunkAPI, 'Gagal menyetujui jadwal')
  }
})

export const returnJadwal = createAsyncThunk('jadwalKoord/return', async (payload, thunkAPI) => {
  const { id, dataform } = extractIdAndDataform(payload)

  if (!id) {
    return thunkAPI.rejectWithValue({ status: 400, message: 'ID jadwal tidak ditemukan' })
  }

  try {
    const resp = await customFetch.put(`/api/koor/jadwalKembali/${id}`, dataform ?? {})

    return resp.data
  } catch (error) {
    return handleThunkError(error, thunkAPI, 'Gagal mengembalikan jadwal')
  }
})

export const jadwalPelaksanaan = createAsyncThunk('jadwalKoord/jadwalPelaksanaan', async (payload, thunkAPI) => {
  const { id, dataform } = extractIdAndDataform(payload)

  if (!id) {
    return thunkAPI.rejectWithValue({ status: 400, message: 'ID jadwal tidak ditemukan' })
  }

  try {
    const resp = await customFetch.put(`/api/koor/jadwalPelaksanaan/${id}`, dataform ?? {})

    return resp.data
  } catch (error) {
    return handleThunkError(error, thunkAPI, 'Gagal mengubah status jadwal menjadi pelaksanaan')
  }
})

export const jadwalSelesai = createAsyncThunk('jadwalKoord/jadwalSelesai', async (payload, thunkAPI) => {
  const { id, dataform } = extractIdAndDataform(payload)

  if (!id) {
    return thunkAPI.rejectWithValue({ status: 400, message: 'ID jadwal tidak ditemukan' })
  }

  try {
    const resp = await customFetch.put(`/api/koor/jadwalSelesai/${id}`, dataform ?? {})

    return resp.data
  } catch (error) {
    return handleThunkError(error, thunkAPI, 'Gagal mengubah status jadwal menjadi selesai')
  }
})

export const createKelompokKegiatan = createAsyncThunk(
  'jadwalKoord/createKelompokKegiatan',
  async (dataform, thunkAPI) => {
    try {
      const resp = await customFetch.post('/api/koor/jadwalKeg', dataform)

      return resp.data
    } catch (error) {
      return handleThunkError(error, thunkAPI, 'Gagal memperbarui kegiatan')
    }
  }
)

const jadwalKoordSlice = createSlice({
  name: 'jadwalKoord',
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
      .addCase(fetchList.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchList.fulfilled, (state, { payload }) => {
        const countPage = Math.ceil(payload.total / state.per_page)

        state.isLoading = false
        state.numOfPages = countPage
        state.total = payload.total
        state.current_page = payload.current_page
        state.listJadwal = payload.data
      })
      .addCase(fetchList.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(create.pending, state => {
        state.isLoading = true
      })
      .addCase(create.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Jadwal berhasil ditambahkan...')
      })
      .addCase(create.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(detail.pending, state => {
        state.isLoading = true
      })
      .addCase(detail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.detailJadwal = payload
      })
      .addCase(detail.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(update.pending, state => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, state => {
        state.isLoading = false
        toast.success('Jadwal berhasil diperbarui...')
      })
      .addCase(update.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(remove.pending, state => {
        state.isLoading = true
      })
      .addCase(remove.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Jadwal berhasil dihapus...')
      })
      .addCase(remove.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(approve.pending, state => {
        state.isLoading = true
      })
      .addCase(approve.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Jadwal berhasil disetujui...')
      })
      .addCase(approve.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(jadwalPelaksanaan.pending, state => {
        state.isLoading = true
      })
      .addCase(jadwalPelaksanaan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Status jadwal diubah menjadi pelaksanaan.')
      })
      .addCase(jadwalPelaksanaan.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(jadwalSelesai.pending, state => {
        state.isLoading = true
      })
      .addCase(jadwalSelesai.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Status jadwal diubah menjadi selesai')
      })
      .addCase(jadwalSelesai.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(returnJadwal.pending, state => {
        state.isLoading = true
      })
      .addCase(returnJadwal.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = JSON.stringify(payload)
        toast.success('Jadwal berhasil dikembalikan...')
      })
      .addCase(returnJadwal.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })

      .addCase(createKelompokKegiatan.pending, state => {
        state.isLoading = true
      })
      .addCase(createKelompokKegiatan.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = `${payload?.keterangan ?? ''}alamatkeg`
        toast.success('Kegiatan berhasil diperbarui...')
      })
      .addCase(createKelompokKegiatan.rejected, (state, { payload }) => {
        state.isLoading = false

        if (payload?.status === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload?.message || 'Terjadi kesalahan')
        }
      })
  }
})

export const {
  setDetail,
  handleChange,
  changePage,
  clearValues,
  clearFilters,
  setEditJadwal,
  setStatus,
  setSbi,
  setFasilitas,
  setInspektur,
  setSurat,
  setTab,
  setFihi
} = jadwalKoordSlice.actions

export default jadwalKoordSlice.reducer
