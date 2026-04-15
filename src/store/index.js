import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@features/counter/counterSlice'
import globalReducer from '@store/globalSlice'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    counter: counterReducer,
  },
})
