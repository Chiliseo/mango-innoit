import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/'
import Exercise1 from './pages/Exercise1/'
import Exercise2 from './pages/Exercise2/'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Exercise1 />} />
          <Route path='exercise1' element={<Exercise1 />} />
          <Route path='exercise2' element={<Exercise2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
