import React from 'react'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Explore from './components/Explore'
import Home from './components/Home'

const App = () => {
  return (
    <>
      <div className='mx-16 '>
        <Navbar />
        <Carousel/>
        <Explore/>
        <Home/>
      </div>
    </>
  )
}

export default App