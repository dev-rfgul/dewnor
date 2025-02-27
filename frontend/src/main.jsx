import React from 'react';  // ✅ Add this line
import { StrictMode } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


import './index.css';
import App from './App.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        <Footer />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
