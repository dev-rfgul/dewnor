import React from 'react'
import Home from './Home'
import ProductDisplay from './components/ProductDisplay'

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className='overflow-hidden'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDisplay />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App