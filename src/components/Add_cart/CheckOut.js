/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = () => {
    //store the login id
    const [id, setId] = useState(null);
    //reducer value get
    const state = useSelector((state) => state.AddProduct);
    //page redirect karva
    const navigate = useNavigate();
    var total = 0;
    //orderdetail table display
    const item = (val) => {
        total = total + val.price * val.quantity
        return (
            <>
                <tr key={val.id} >
                    <th scope="row"><img src={val.img} size="medium"
                        style={{
                            width: "70px",
                            height: "70px"
                        }} />
                    </th>
                    <td>{val.title}</td>
                    <td className='order-size'>{val.sizes}</td>
                    <td className="price">${val.price * val.quantity}</td>
                </tr>
            </>
        )
    }
    //button click in call function check codition
    const orderButton = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        if (id === null) {
            toast.error('Please Login or Sign Up For Purchase A Product', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            navigate("/order");
        }
    }

    const GotoTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setId(user.id);
            }
        })
    })

    return (
        <>
            <div className='checkout'>
                <div className='container'>
                    <h3>CheckOut</h3>
                    <div className='row'>
                        <div className='col-md-12 mb-2 mt-2 text-start'>
                            {id === null ?
                                <label>
                                    Already have an account please
                                    <NavLink to="/login" >Login</NavLink>
                                    or Don`t have an account
                                    <NavLink to="/register" >Register</NavLink>
                                </label> :
                                null
                            }

                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="text-center order-title">
                        Order Detail
                    </div>
                    {/* card table */}
                    <div className='order'>
                        <table className="table">
                            {/* card value is display */}
                            {state.map(item)}
                        </table>
                    </div>
                </div>
                <div className='order-right-table'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-8 col-md-6 mt-5'>
                                <NavLink to="/card" onClick={GotoTop}>
                                    <button type="button" className="btn btn-outline-primary edit" >
                                        <i className="fa-solid fa-left-long"></i>Edit Shopping
                                    </button>
                                </NavLink>
                            </div>
                            <div className='col-lg-4 col-md-6 mx-auto '>
                                <div className="text-center order-summary">
                                    Order Detail
                                </div>
                                <div className='order-total'>
                                    <table className="table ms-3 mt-3">
                                        <tr  >
                                            <th scope="row">SubTotal </th>
                                            <td>${localStorage.getItem("Total") - localStorage.getItem("Shipping")}</td>
                                        </tr>
                                        <tr  >
                                            <th scope="row">Shipping </th>
                                            <td>${localStorage.getItem("Shipping")}</td>
                                        </tr>
                                        <tr  >
                                            <th scope="row">Total</th>
                                            <td>${localStorage.getItem("Total")}</td>
                                        </tr>
                                        <tr  >
                                            <th scope="row">Discount </th>
                                            <td>{localStorage.getItem("Promotion")}</td>
                                        </tr>
                                        <tr  >
                                            <th scope="row">GrandTotal </th>
                                            <td>${localStorage.getItem("Grand-total")}</td>
                                        </tr>
                                    </table>
                                </div>
                                <button type="button" className="btn btn-outline-primary order-button" onClick={orderButton} >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default CheckOut