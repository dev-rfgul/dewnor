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
  const user = JSON.parse(localStorage.getItem("user"))
  // console.log(user.user.role)


  const role = user.user.role
  console.log(role)
  // Check if the user is logged in and has a role
  const isUserLoggedIn = user && role;

  return (
    <>
      <div className='overflow-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<ProductDisplay />} />
          <Route path='/profile' element={<Profile />} />

          {/* Protected routes for users who are logged in */}
          {isUserLoggedIn ? (
            <>
              {role === 'admin' && (
                <>
                  <Route path='/admin' element={<Admin />} />
                  <Route path='/add-product' element={<AddProduct />} />
                  <Route path='/add-users' element={<User />} />
                  <Route path='/edit-product/:id' element={<EditProduct />} />
                </>
              )}

            </>
          ) : (
            // Redirect to login if not logged in
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </>
  )
}

export default App
