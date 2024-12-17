import React from 'react'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Explore from './components/Explore'
import Home from './components/Home'
import FeaturedProducts from './components/FeaturedProducts'

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Carousel />
        <Explore />
        <Home />
        <FeaturedProducts />

      </div>
    </>
  )
}

export default App