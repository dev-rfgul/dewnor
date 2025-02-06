
import React from 'react'
import {   Route, Routes } from 'react-router-dom'
import Home from './Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ProductDisplay from './components/ProductDisplay'
import Admin from './components/Admin'
import AddProduct from './components/AddProducts'
import User from './components/User'

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user.role)
  return (
    <>
      <div className='overflow-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path='/admin' element={<Admin />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<ProductDisplay />} />
          {user?.role === 'admin' && (
            <>
              <Route path='/admin' element={<Admin />} />
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/add-users' element={<User />} />
            </>
          )}
        </Routes>
      </div>
    </>
  )
}

export default App
