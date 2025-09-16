import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getSession } from 'next-auth/react'

import { handleLogout } from '@/redux-store/auth'
import customFetch from '@/utils/axios'

const initialState = {
  tabelKel: [],
  jenisTabel: [],
  strukturTabel: [],
  tabelHeader: [],
  tipeKolom: [],
  inkf_id: '',
  tab: '',
  isLoading: false,
  isEditing: false
}

export const createInkfTabel = createAsyncThunk('tabel/createInkfTabel', async (dataform, thunkAPI) => {
  try {
    let url = `/api/inkfTabel`
    const session = await getSession()

    let config = {
      headers: {
        'balis-token': session.user.accessToken
      }
    }
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

export const editInkfTabel = createAsyncThunk('tabel/editInkfTabel', async ({ tabel_id, dataform }, thunkAPI) => {
  try {
    let url = `/api/inkfTabel/${tabel_id}`
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

export const deleteInkfTabel = createAsyncThunk('tabel/deleteInkfTabel', async (tabel_id, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/inkfTabel/${tabel_id}`, {
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

export const createLfkLib = createAsyncThunk('tabel/createLfkLib', async (dataform, thunkAPI) => {
  try {
    let url = `/api/lfkLib`
    const session = await getSession()

    let config = {
      headers: {
        'balis-token': session.user.accessToken
      }
    }
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

export const editLfkLib = createAsyncThunk('tabel/editLfkLib', async ({ lkf_lib_id, dataform }, thunkAPI) => {
  try {
    let url = `/api/lfkLib/${lkf_lib_id}`
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

export const deleteLfkLib = createAsyncThunk('tabel/deleteLfkLib', async (lkf_lib_id, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/lfkLib/${lkf_lib_id}`, {
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

export const getJenisTabel = createAsyncThunk('tabel/getJenisTabel', async thunkAPI => {
  let url = `/api/lkfJenisTabel`
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

export const getTabelKel = createAsyncThunk('tabel/getTabelKel', async (kelompok_id, thunkAPI) => {
  let url = `/api/tabelSetting`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      kelompok_id: `${kelompok_id}`
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
    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const createTabel = createAsyncThunk('tabel/createTabel', async (dataform, thunkAPI) => {
  let url = `/api/tabelSetting`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    }
  }

  try {
    const resp = await customFetch.post(url, dataform, config)

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

export const getStruktur = createAsyncThunk('tabel/getStruktur', async (tabel_id, thunkAPI) => {
  let url = `/api/strukturTabel`
  const session = await getSession()

  let config = {
    headers: {
      'balis-token': session.user.accessToken
    },
    params: {
      tabel_id: `${tabel_id}`
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
    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const createStruktur = createAsyncThunk('tabel/createStruktur', async (dataform, thunkAPI) => {
  try {
    let url = `/api/strukturTabel`
    const session = await getSession()

    let config = {
      headers: {
        'balis-token': session.user.accessToken
      }
    }
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

export const editStruktur = createAsyncThunk('tabel/editStruktur', async ({ id, dataform }, thunkAPI) => {
  try {
    let url = `/api/strukturTabel/${id}`
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

export const deleteStruktur = createAsyncThunk('tabel/deleteStruktur', async (data, thunkAPI) => {
  try {
    const session = await getSession()

    const resp = await customFetch.delete(`/api/strukturTabel/${data.id}`, {
      headers: {
        'balis-token': session.user.accessToken
      },
      params: {
        tabel: `${data.tabel}`
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

export const getTabelHeader = createAsyncThunk('tabel/getTabelHeader', async (tabel_id, thunkAPI) => {
  let url = `/api/getTabelHeader/${tabel_id}`
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
    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

export const getTipeKolom = createAsyncThunk('tabel/getTipeKolom', async (_, thunkAPI) => {
  let url = `/api/getTipeKolom`
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
    if (error.response.status === 401) {
      thunkAPI.dispatch(handleLogout())

      return thunkAPI.rejectWithValue(401)
    } else {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
})

const tabelSlice = createSlice({
  name: 'tabel',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
    clearValues: () => {
      return {
        ...initialState
      }
    },
    setCreate: (state, { payload }) => {
      state.isEditing = true
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTabelHeader.pending, state => {
        state.isLoading = true
      })
      .addCase(getTabelHeader.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tabelHeader = payload
      })
      .addCase(getTabelHeader.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getTipeKolom.pending, state => {
        state.isLoading = true
      })
      .addCase(getTipeKolom.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tipeKolom = payload
      })
      .addCase(getTipeKolom.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getStruktur.pending, state => {
        state.isLoading = true
      })
      .addCase(getStruktur.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.strukturTabel = payload
      })
      .addCase(getStruktur.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getTabelKel.pending, state => {
        state.isLoading = true
      })
      .addCase(getTabelKel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tabelKel = payload
      })
      .addCase(getTabelKel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isEditing = false
        state.tab = payload
        toast.success('temuan ditambahkan...')
      })
      .addCase(createTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(getJenisTabel.pending, state => {
        state.isLoading = true
      })
      .addCase(getJenisTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jenisTabel = payload.data
      })
      .addCase(getJenisTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createInkfTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tabel ditambahkan...')
      })
      .addCase(createInkfTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(editInkfTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tabel diupdate...')
      })
      .addCase(editInkfTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteInkfTabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tabel dihapus...')
      })
      .addCase(deleteInkfTabel.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createLfkLib.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tabel ditambahkan...')
      })
      .addCase(createLfkLib.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(editLfkLib.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tabel diupdate...')
      })
      .addCase(editLfkLib.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteLfkLib.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tabel dihapus...')
      })
      .addCase(deleteLfkLib.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(createStruktur.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isEditing = false
        state.tab = payload
        toast.success('temuan ditambahkan...')
      })
      .addCase(createStruktur.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(editStruktur.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tabel diupdate...')
      })
      .addCase(editStruktur.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
      .addCase(deleteStruktur.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Tabel dihapus...')
      })
      .addCase(deleteStruktur.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
  }
})

export const { clearValues, setCreate } = tabelSlice.actions

export default tabelSlice.reducer
