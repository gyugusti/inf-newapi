import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  isLoading: false,
  dataSpi: [],
  dataSbi: [],
  datakonfFas: [],
  datakonfInsp: [],
  dataFihipdf: [],
  dataFihiresume: [],
  dataLkf: [],
  dataLhipdf: [],
  dataDokfile: [],
  draftSphi: [],
  dataJadwal: [],
  namaDoc: '',
  total: 0,
  numOfPages: 1,
  current_page: 1,
  page: 1,
  limit: 100,
  per_page: 20,
  sort_by: null,
  order_by: null
}

export const getcetakSpi = createAsyncThunk('cetakPdf/getcetakSpi', async (surat_id, thunkAPI) => {
  let url = `/api/pdf/spi/${surat_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getcetakSbi = createAsyncThunk('cetakPdf/getcetakSbi', async (surat_id, thunkAPI) => {
  let url = `/api/pdf/sbi/${surat_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getcetakKonfirmasiFas = createAsyncThunk('cetakPdf/getcetakKonfirmasiFas', async (surat_id, thunkAPI) => {
  let url = `/api/pdf/konfirmasiFas/${surat_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getcetakKonfirmasiInsp = createAsyncThunk(
  'cetakPdf/getcetakKonfirmasiInsp',
  async (jadwal_id, thunkAPI) => {
    let url = `/api/pdf/konfirmasiInsp/${jadwal_id}`

    let config = {}

    try {
      const resp = await customFetch.get(url, config)

      if (resp.data.status === 200) {
        return resp.data.response
      } else {
        return thunkAPI.rejectWithValue(resp.data.keterangan)
      }
    } catch (error) {
      console.log(error.response?.status)

      if (error.response?.status === 401) {
        thunkAPI.dispatch(handleLogout())

        return thunkAPI.rejectWithValue(401)
      } else {
        return thunkAPI.rejectWithValue('There was an error')
      }
    }
  }
)

export const getcetakFihi = createAsyncThunk('cetakPdf/getcetakFihi', async (fihi_id, thunkAPI) => {
  let url = `/api/pdf/fihi/${fihi_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getcetakFihiResume = createAsyncThunk('cetakPdf/getcetakFihiResume', async (fihi_id, thunkAPI) => {
  let url = `/api/pdf/resumeFihi/${fihi_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getcetakLkf = createAsyncThunk('cetakPdf/getcetakLkf', async (lkf_id, thunkAPI) => {
  let url = `/api/pdf/lkf/${lkf_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getcetakJadwal = createAsyncThunk('cetakPdf/getcetakJadwal', async (jadwal_id, thunkAPI) => {
  let url = `/api/pdf/jadwal/${jadwal_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getcetakLhi = createAsyncThunk('cetakPdf/getcetakLhi', async (lhi_id, thunkAPI) => {
  let url = `/api/pdf/lhi/${lhi_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getDraftSphi = createAsyncThunk('cetakPdf/getDraftSphi', async (lhi_id, thunkAPI) => {
  let url = `/api/pdf/draftSphi/${lhi_id}`

  let config = {}

  try {
    const resp = await customFetch.get(url, config)

    if (resp.data.status === 200) {
      return resp.data.response
    } else {
      return thunkAPI.rejectWithValue(resp.data.keterangan)
    }
  } catch (error) {
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const downloadDokfile = createAsyncThunk('cetakPdf/downloadDokfile', async (id, thunkAPI) => {

  const url = `/api/downloadDokFile/${id}`

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

export const downloadKtun = createAsyncThunk('cetakPdf/downloadKtun', async (id, thunkAPI) => {

  const url = `/api/downloadKtun/${id}`

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

const cetakPdfSlice = createSlice({
  name: 'cetakPdf',
  initialState,
  reducers: {
    handleState: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    setNamadoc: (state, { payload }) => {
      state.namaDoc = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getcetakSpi.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakSpi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataSpi = payload
      })
      .addCase(getcetakSpi.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getcetakSbi.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakSbi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataSbi = payload
      })
      .addCase(getcetakSbi.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getcetakKonfirmasiInsp.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakKonfirmasiInsp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.datakonfInsp = payload
      })
      .addCase(getcetakKonfirmasiInsp.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getcetakKonfirmasiFas.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakKonfirmasiFas.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.datakonfFas = payload
      })
      .addCase(getcetakKonfirmasiFas.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getcetakFihi.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakFihi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataFihipdf = payload
      })
      .addCase(getcetakFihi.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getcetakFihiResume.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakFihiResume.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataFihiresume = payload
      })
      .addCase(getcetakFihiResume.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getcetakLkf.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakLkf.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataLkf = payload
      })
      .addCase(getcetakLkf.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })

      .addCase(getcetakJadwal.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakJadwal.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataJadwal = payload
      })
      .addCase(getcetakJadwal.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getcetakLhi.pending, state => {
        state.isLoading = true
      })
      .addCase(getcetakLhi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataLhipdf = payload
      })
      .addCase(getcetakLhi.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(getDraftSphi.pending, state => {
        state.isLoading = true
      })
      .addCase(getDraftSphi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.draftSphi = payload
      })
      .addCase(getDraftSphi.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(downloadDokfile.pending, state => {
        state.isLoading = true
      })
      .addCase(downloadDokfile.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataDokfile = payload

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
        // const link = document.createElement('a')
        // link.href = fileUrl
        // link.setAttribute('download', `${state.namaDoc || 'document'}.${extension}`) // Use `namadoc` if available
        // document.body.appendChild(link)
        // link.click()
        // link.parentNode.removeChild(link)
      })
      .addCase(downloadDokfile.rejected, (state, { payload }) => {
        state.isLoading = false // Ensure isLoading is reset on failure

        if (payload === 401) {
          toast.error('User Belum memiliki akses! Logging Out...')
          window.location.href = '/'
        } else {
          toast.error(payload)
        }
      })
      .addCase(downloadKtun.pending, state => {
        state.isLoading = true
      })
      .addCase(downloadKtun.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.dataDokfile = payload

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
      })
      .addCase(downloadKtun.rejected, (state, { payload }) => {
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

export const { handleState, setNamadoc } = cetakPdfSlice.actions

export default cetakPdfSlice.reducer
