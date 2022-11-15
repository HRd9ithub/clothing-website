import React from 'react'
import { NavLink } from 'react-router-dom';
import image from './thankyou.png';
const Thanks = () => {
    return (
        <>
            <div className='thanks-page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 mx-auto mt-4'>
                            <img className='thanks-image' src={image} />
                            <p className='thanks-text'>you've sucessfully placed the order.</p>
                        </div>
                        <div className='col-md-8 mx-auto mt-4 text-center'>
                            <NavLink to="/" className="btn btn-primary">Go To Home</NavLink>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Thanks