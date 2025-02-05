
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ProductDisplay from './components/ProductDisplay'
import Admin from './components/Admin'
import AddProduct from './components/AddProducts'

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user.isAdmin)
  return (
    <>
      <div className='overflow-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path='/admin' element={<Admin />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<ProductDisplay />} />
          {user?.isAdmin === 'admin' && (
            <>
              <Route path='/admin' element={<Admin />} />
              <Route path='/add-product' element={<AddProduct />} />
            </>
          )}
        </Routes>

      </div>
    </>
  )
}

export default App
