import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signOut } from 'next-auth/react'

const initialState = {
  isLoading: false,
  tab: '',
  token_virtual: ''
}

export const postloginVirtual = createAsyncThunk('authUser/postloginVirtual', async ({ token }, thunkAPI) => {
  try {
    let url = `/api/cekLoginVirtual/${token}`

    let config = {
      params: {
        akses_modul: 3
      }
    }
    const resp = await customFetch.put(url, { token }, config)

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

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {
    data: [],
    accessToken: null
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    clearAccessToken: state => {
      state.accessToken = null
    }
  },
  extraReducers: builder => {
    builder

      .addCase(postloginVirtual.pending, state => {
        state.isLoading = true
      })
      .addCase(postloginVirtual.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tab = payload
        toast.success('Fihi selesai...')
      })
      .addCase(postloginVirtual.rejected, (state, { payload }) => {
        if (payload === 401) {
          toast.error('User Belum memiliki akses ! Logging Out...')
        } else {
          toast.error(payload)
        }
      })
  }
})

// Thunk untuk menangani logout
export const handleLogout = () => async dispatch => {
  await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL })
  dispatch(clearAccessToken()) // Hapus token setelah logout
}

export const { setAccessToken, clearAccessToken } = authUserSlice.actions

export default authUserSlice.reducer
