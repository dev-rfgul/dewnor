import React,{useState,useEffect} from 'react'
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
import AllProducts from './components/AllProducts'
import { SuccessPayment, CancelPayment } from './components/Success';
import AlertMessage from './components/Alert'

// changed the url to the deployed url of the backend
const App = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Ensure user is valid before accessing role
  const role = user?.user?.role || null;
  const isUserLoggedIn = !!user && !!role;
  // alert(isUserLoggedIn)


  const [alert, setAlert] = useState({ message: "", type: "" });

  const showSuccess = () => setAlert({ message: "Success! Operation completed.", type: "success" });
  const showError = () => setAlert({ message: "Error! Something went wrong.", type: "error" });

  return (
    <>
      <div className='overflow-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<ProductDisplay />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/all-products' element={<AllProducts />} />
          <Route path="/payment/success" element={<SuccessPayment />} />
          <Route path="/payment/cancel" element={<CancelPayment />} />

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
