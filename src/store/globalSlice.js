import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  theme: 'light',
  configStatus: 'idle',
  configError: null,
}

// 写法 1：createAsyncThunk（推荐）
// 自动派发 pending / fulfilled / rejected 三种状态
export const fetchGlobalConfig = createAsyncThunk(
  'global/fetchGlobalConfig',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Fetch global config failed')
    }
  }
)

// 写法 2：普通 thunk（手动 dispatch）
// 逻辑更直观，适合入门和简单场景
export const fetchGlobalConfigSimple = () => async (dispatch) => {
  // 请求开始：打开全局 loading
  dispatch(setLoading(true))
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json()
    // 示例：根据返回 id 的奇偶切换主题
    const nextTheme = data.id % 2 === 0 ? 'dark' : 'light'
    dispatch(setTheme(nextTheme))
  } catch (error) {
    console.error('fetchGlobalConfigSimple failed:', error)
  } finally {
    dispatch(setLoading(false))
  }
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
  // createAsyncThunk 的状态处理统一写在 extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalConfig.pending, (state) => {
        state.configStatus = 'loading'
        state.configError = null
      })
      .addCase(fetchGlobalConfig.fulfilled, (state, action) => {
        state.configStatus = 'succeeded'
        // 示例：根据返回 id 的奇偶切换主题
        state.theme = action.payload.id % 2 === 0 ? 'dark' : 'light'
      })
      .addCase(fetchGlobalConfig.rejected, (state, action) => {
        state.configStatus = 'failed'
        state.configError = action.payload || action.error.message
      })
  },
})

export const { setLoading, toggleTheme, setTheme } = globalSlice.actions

export default globalSlice.reducer
