import React from 'react'
import MyRoutes from './MyRoutes'
import './App.css'
import './Media-Queries.css'
import { Provider } from 'react-redux'
import store from './redux/store'
const App = () => {
  return (
    <>
    <Provider store={store}>
    <MyRoutes/>
    </Provider>
    </>
  )
}

export default App