import React from 'react'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Explore from './components/Explore'
import Heading from './components/Heading'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'
import ProductDisplay from './components/ProductDisplay'

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Carousel />
        <Heading heading={"Explore"} subHeading={"Explore our wide range of products"} />
        <Explore />
        <Heading heading={"Featured Products"} subHeading={"Check out our Featured Products"} />
        <FeaturedProducts />
        <ProductDisplay/>
        <Footer/>

      </div>
    </>
  )
}

export default App