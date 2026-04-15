import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount } from '@features/counter/counterSlice'
import {
  fetchGlobalConfig,
  fetchGlobalConfigSimple,
  setLoading,
  toggleTheme,
} from '@store/globalSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)
  const loading = useSelector((state) => state.global.loading)
  const theme = useSelector((state) => state.global.theme)
  const configStatus = useSelector((state) => state.global.configStatus)
  const configError = useSelector((state) => state.global.configError)

  return (
    <>
      <section id="center">
        <button className="counter" onClick={() => dispatch(toggleTheme())}>
          Theme: {theme}
        </button>
        <button className="counter" onClick={() => dispatch(setLoading(!loading))}>
          Loading: {String(loading)}
        </button>
        <button className="counter" onClick={() => dispatch(fetchGlobalConfig())}>
          AsyncThunk: {configStatus}
        </button>
        <button className="counter" onClick={() => dispatch(fetchGlobalConfigSimple())}>
          Plain Thunk
        </button>
        {configError && <button className="counter">Error: {configError}</button>}
        <button className="counter" onClick={() => dispatch(decrement())}>
          -1
        </button>
        <button className="counter" onClick={() => dispatch(increment())}>
          +1
        </button>
        <button className="counter" onClick={() => dispatch(incrementByAmount(5))}>
          +5
        </button>
        <button className="counter">Count is {count}</button>
      </section>
    </>
  )
}

export default App
