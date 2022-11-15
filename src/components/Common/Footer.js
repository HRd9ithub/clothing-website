import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from ".././logo1.png";

const Footer = () => {

    const scrollTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
    return (
        <>
            <div className='footer-part'>
                {/* first footer */}
                <div className='footer-top'>
                    <div className='container py-5 '>
                        <div className='row'>
                            <div className='col-4 '>
                                {/* logo and social media icon display part */}
                                <div className='footer-about'>
                                    <div className='logo'>
                                        <img src={logo} alt="logo" width="200px" height="100px" />
                                    </div>
                                    <ul className='footer-icon'>
                                        <li className='footer-icon-group'>
                                            <a href='https://www.youtube.com/' target="_blank">
                                                <i className="fa-brands fa-youtube"></i>
                                            </a>
                                        </li>
                                        <li className='footer-icon-group'>
                                            <a href='https://www.instagram.com/' target="_blank">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li className='footer-icon-group'>
                                            <a href='https://www.linkedin.com/' target="_blank">
                                                <i className="fa-brands fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li className='footer-icon-group'>
                                            <a href='https://www.facebook.com/' target="_blank">
                                                <i className="fa-brands fa-facebook"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-3 '>
                                {/* page link display */}
                                <div className='footer-link'>
                                    <div className='title'>
                                        <h4>Menu</h4>
                                    </div>
                                    <ul className='footer-link-info'>
                                        <li>
                                            <NavLink to="/" onClick={scrollTop}>Home</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/product" onClick={scrollTop}>Product</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/contact" onClick={scrollTop}>Contact</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-4'>
                                {/* address part in display page */}
                                <div className='footer-address'>
                                    <div className='title'>
                                        <h4>Contact</h4>
                                    </div>
                                    <ul className='footer-link-info'>
                                        <li className='address-info'>
                                            <div className='icon'>
                                                <i className="fa-solid fa-location-dot"></i>
                                            </div>
                                            <div className='contact-info'>
                                                <p>Jhansi Ki Rani, Nehru Nagar, Ahmedabad, Gujarat 380015</p>
                                            </div>
                                        </li>
                                        <li className='address-info'>
                                            <div className='icon'>
                                                <i className="fa-solid fa-mobile"></i>
                                            </div>
                                            <div className='contact-info'>
                                                <p>+91 1236547890</p>
                                            </div>
                                        </li>
                                        <li className='address-info'>
                                            <div className='icon'>
                                                <i className="fa-regular fa-envelope"></i>
                                            </div>
                                            <div className='contact-info'>
                                                <p>hardik@gmail.com</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* last footer */}
                <div className='copyright'>
                    <p>&copy; Copyrights 2022 All rights reserved.</p>
                </div>
            </div>
        </>
    )
}

export default Footer