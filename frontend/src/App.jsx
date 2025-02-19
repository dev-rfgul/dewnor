import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ProductDisplay from './components/ProductDisplay'
import Admin from './components/Admin'
import AddProduct from './components/AddProducts'
import User from './components/User'
import Profile from './components/Profile'
import EditProduct from './components/EditProduct'

const App = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Ensure user is valid before accessing role
  const role = user?.user?.role || null;
  const isUserLoggedIn = !!user && !!role;
  // alert(isUserLoggedIn)

  return (
    <>
      <div className='overflow-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<ProductDisplay />} />
          <Route path='/profile' element={<Profile />} />

          {/* Admin Routes */}
          {isUserLoggedIn && role === 'admin' ? (
            <>
              <Route path='/admin' element={<Admin />} />
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/add-users' element={<User />} />
              <Route path='/edit-product/:id' element={<EditProduct />} />
              
            </>
          ) : null}

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
