import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = () => {

    const [id, setId] = useState(null);
    const state = useSelector((state) => state.AddProduct);
    const navigate = useNavigate();
    var total = 0;
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
        }else{
            navigate("/order")
            
        }
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
                            <label>
                                Already have an account please
                                <NavLink to="/login" >Login</NavLink>
                                or Don`t have an account
                                <NavLink to="/register" >Register</NavLink>
                            </label>
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
                            <div className='col-lg-8 col-md-6'></div>
                            <div className='col-lg-4 col-md-6 mx-auto '>
                                <div className="text-center order-summary">
                                    Order Detail
                                </div>
                                <div className='order-total'>
                                    <table className="table ms-3 mt-3">
                                        <tr  >
                                            <th scope="row">Total Amount </th>
                                            <td>${total}</td>
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