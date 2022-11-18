import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ChangeSize, DeleItem, IncQuantity } from "../Redux/action";
import { DecQuantity } from "../Redux/action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { test } from "../../promocode";
import { useEffect } from "react";




const Cart = () => {
    const [grandTotal, setGrandTotal] = useState(localStorage.getItem("Grand-total"));
    //redux event traget krva
    const Dispatch = useDispatch();
    //how to use of get data
    const st̥ate = useSelector((state) => state.AddProduct);
    //store the coupon code in input filed
    const [coupon, setCoupon] = useState(localStorage.getItem("coupon"));
    //store the coupon code value 
    const [couponValue, setCouponValue] = useState(localStorage.getItem("Promotion"));
    //apply and remove button toggle in use
    const [button, setButton] = useState(false)
    const [Disable, setDisable] = useState(false)
    const [error, setError] = useState("");
    const Navigate = useNavigate();
    //this varibale is store the total value
    var total = 0;
    var subtotal = 0;
    var Shipping = 50;
    //summary table value display
    const summary = (val) => {
        subtotal = subtotal + val.price * val.quantity;
        total = subtotal + Shipping;
        return;
    }

    //Delete button click of call function
    const DeleteButton = (item) => {
        Dispatch(DeleItem(item));
        toast.success('Product Removed Successfully !!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const checkoutHandle = () => {
        if(button){
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            Navigate("/checkout")
        }
        else{
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            toast.error('Please Enter The Promo code!!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
 

    const checkCoupon = () => {
        try {
            let obj = test.find(val => val.promocode === coupon.toLowerCase())
            if (obj.promode_type === "price") {
                setError("")
                setCouponValue(`-${obj.value}`)
                var reducedPrice = (total - obj.value);
                setGrandTotal(reducedPrice)
                setButton(true)
                setDisable(true)
            }
            else {
                setError("")
                var reducedpercentage = (total * obj.value) / 100;
                setGrandTotal(Math.round(total - reducedpercentage))
                setCouponValue('-' + Math.round(reducedpercentage));
                setButton(true)
                setDisable(true)
            }
        } catch (error) {
            setError("Promocode is Not valid!");
        }
    }

    useEffect(() => {
        localStorage.setItem("Grand-total", grandTotal);
        localStorage.setItem("Total", total)
        localStorage.setItem("Shipping", Shipping)
        localStorage.setItem("Promotion", couponValue);
        localStorage.setItem("coupon", coupon);
    },)
    return (
        <>
            <div className="container-fluid">
                <div className="title text-center">
                    Cart
                </div>
                {/* card table */}
                <table className="table cart-table">
                    <thead>
                        <tr>
                            <th scope="col" className="table-primary" >Image</th>
                            <th scope="col" className="table-primary">Title</th>
                            <th scope="col" className="table-primary">Quantity</th>
                            <th scope="col" className="table-primary">Size</th>
                            <th scope="col" className="table-primary">Price</th>
                            <th scope="col" className="table-primary">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* card value is display */}
                        {st̥ate.length !== 0 ? st̥ate.map((item) => {
                            return (
                                <>
                                    <tr key={item.id} >
                                        <th scope="row"><img src={item.img} size="medium"
                                            style={{
                                                width: "70px",
                                                height: "70px"
                                            }} />
                                        </th>
                                        <td>{item.title}</td>
                                        <td className="Quantity">
                                            <i className="fa-solid fa-minus" onClick={() => Dispatch(DecQuantity(item))}></i>
                                            <input className="quntity-input" value={item.quantity} readOnly />
                                            <i className="fa-solid fa-plus" onClick={() => Dispatch(IncQuantity(item))}></i>
                                        </td>
                                        <td>
                                            <select value={item.sizes}
                                                className='size-dropdown'
                                                onChange={(event) => {
                                                    Dispatch(ChangeSize(event.target.value, item))
                                                }} >
                                                <option>select size</option>
                                                <option>s</option>
                                                <option>m</option>
                                                <option>l</option>
                                                <option>xl</option>
                                            </select>
                                        </td>
                                        <td className="price">${item.price}</td>
                                        <td><button className="delete-button" onClick={() => DeleteButton(item)}><i className="fa-solid fa-trash-can"></i></button></td>
                                    </tr>
                                </>
                            )
                        }) :
                            //card value is empty of display
                            <tr >
                                <td colSpan="4" className="cardempty">The cart is empty</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="shoppingcard">
                <div className="container-fluid">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-4">
                                {/* continue shopping button */}
                                <NavLink to="/product">
                                    <button type="button" className="btn btn-outline-primary continue" >
                                        <i className="fa-solid fa-left-long"></i>Continue Shopping
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-md-8">
                                {/* summary table */}
                                {st̥ate.length !== 0 ? <>
                                    <table className="table summary">
                                        <thead>
                                            <tr>
                                                <th colSpan="3" className="table-primary text-center" >Summary</th>
                                            </tr>
                                            <tr>
                                                <th scope="col" >Title</th>
                                                <th scope="col" >Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {st̥ate.map(summary)}
                                            <tr>
                                                <td >SubTotal</td>
                                                <td colSpan="2" className="text-end me-5">${subtotal}</td>
                                            </tr>
                                            <tr>
                                                <td >Shipping</td>
                                                <td colSpan="2" className="text-end me-5">${Shipping}</td>
                                            </tr>
                                            <tr>
                                                <td >Total</td>
                                                <td colSpan="2" className="text-end me-5">${total}</td>
                                            </tr>
                                            {couponValue !== null?
                                                <>
                                                    <tr>
                                                        <td >Promotion Appied</td>
                                                        <td colSpan="2" className="text-end me-5">{couponValue}</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Grand Total</td>
                                                        <td colSpan="2" className="text-end me-5">{grandTotal}</td>
                                                    </tr>
                                                </> :
                                                null
                                            }

                                            <tr>
                                                <td>
                                                    <div className="d-flex coupon">
                                                        <input type="text"
                                                            className="coupon-text"
                                                            placeholder="enter the coupon"
                                                            value={coupon}
                                                            disabled={Disable}
                                                            onChange={(event) => {
                                                                setCoupon(event.target.value)
                                                            }
                                                            }
                                                        />
                                                        {!button ? <button className="coupon-button"
                                                            type="submit"
                                                            onClick={checkCoupon} >Apply</button>
                                                            :
                                                            <button className="coupon-button"
                                                                type="submit"
                                                                onClick={() => {
                                                                    setButton(false)
                                                                    setCouponValue("")
                                                                    setDisable(false)
                                                                    setCoupon("")
                                                                }}>Remove
                                                            </button>
                                                        }
                                                    </div>
                                                    {error !== " " ? <span className="error-msg" >{error}</span> : null}

                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                        <button type="button" className="btn btn-outline-primary checkout" onClick={checkoutHandle} >
                                            Continue To Checkout
                                        </button>
                                    
                                </> :
                                    null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Cart;