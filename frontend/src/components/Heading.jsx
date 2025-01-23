import React from 'react'

const Home = ({heading,subHeading}) => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-10">{heading}</h1>
            <p className="text-lg text-center mt-4">{subHeading}</p>
        </div>
    )
}

export default Home