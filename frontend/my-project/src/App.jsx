import React from 'react'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'

const App = () => {
  return (
    <>
      <div className='mx-16 '>
        <Navbar />
     
        <Carousel/>
      </div>
    </>
  )
}

export default App