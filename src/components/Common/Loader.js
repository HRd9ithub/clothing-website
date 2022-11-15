import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className='text-center loader' > 
        <ClipLoader
        color="#eb0000"
        loading
        size={50}
        speedMultiplier={1}
        />
        </div>
    )
}

export default Loader