import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import logo from ".././logo1.png"

const Header = () => {
    //store login id
    const [userStste, setUserState] = useState(null);
    //page redirect katva use
    const navigate = useNavigate();
    //how use to reducer data get 
    const state = useSelector((state) => state.AddProduct);

    // log out function call
    const handleLogOut = () => {
        signOut(auth).then(() => {
            setUserState(null);
            navigate("/")
        })
    }

    useEffect(() => {
        //how to get login id 
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserState(user.uid);
            }
        })
    })
    return (
        <>
            <header>
                <div className='header-top'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='header-left'>
                                    <div className='left-icons'>
                                        {/* display in social medial icon */}
                                        <ul className='header-icon'>
                                            <li>
                                                <a href='https://www.youtube.com/' target="_blank">
                                                    <i className="fa-brands fa-youtube"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='https://www.instagram.com/' target="_blank">
                                                    <i className="fa-brands fa-instagram"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='https://www.linkedin.com/' target="_blank">
                                                    <i className="fa-brands fa-linkedin"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='https://www.facebook.com/' target="_blank">
                                                    <i className="fa-brands fa-facebook"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='header-right'>
                                    <div className='login-register'>
                                        {/* conatct ,login and register page link */}
                                        <ul className='header-link'>
                                            <li>
                                                <NavLink to="/contact">
                                                    contact us
                                                </NavLink>
                                            </li>
                                            {userStste == null ? <><li>
                                                <NavLink to="/login">
                                                    login
                                                </NavLink>
                                            </li>
                                                <li>
                                                    <NavLink to="/register">
                                                        register
                                                    </NavLink>
                                                </li></> :
                                                <li>
                                                    <NavLink to="/logout" onClick={handleLogOut}>
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid py-2">
                        {/* website logo image */}
                        <NavLink className="navbar-brand mx-auto fw-bold  " to="/">
                            <img src={`${logo}`} width="200px" height="80px" />
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* page link */}
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/product">Product</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/tabpanel">My Account</NavLink>
                                </li>

                            </ul>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* Add to cart button */}
                            <div className='addBtn navbar-nav ms-auto mx-5  mb-lg-0'>
                                <ul>
                                    <li>
                                        <NavLink to="/card" className='cart-icon'>
                                            <i className="fa-solid fa-cart-plus add-icon"></i>
                                            <span>{state.length} </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header