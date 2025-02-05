import React from 'react'
import Home from './Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ProductDisplay from './components/ProductDisplay'


import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className='overflow-hidden'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/product/:id' element={<ProductDisplay />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App