import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DeleItem, IncQuantity } from "../Redux/action";
import { DecQuantity } from "../Redux/action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    //redux event traget krva
    const Dispatch = useDispatch();
    //how to use of get data
    const st̥ate = useSelector((state) => state.AddProduct);
    //this varibale is store the total value
    var total = 0;
    //summary table value display
    const summary = (val) => {
        total = total + val.price * val.quantity
        return (
            <>
                <tr key={val.id}>
                    <td >{val.title}</td>
                    <td>{val.quantity}</td>
                    <td>${val.price * val.quantity}</td>
                </tr>
            </>
        )
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

    const GotoTop = () => {
        return (
            //window position define
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        )
    }

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
                                        <td>{item.sizes}</td>
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
                                <table className="table summary">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" className="table-primary text-center" >Summary</th>
                                        </tr>
                                        <tr>
                                            <th scope="col" >Title</th>
                                            <th scope="col" >Quantity</th>
                                            <th scope="col" >Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {st̥ate.map(summary)}
                                        <tr>
                                            <th >Total Amount</th>
                                            <td colSpan="2" className="text-end me-5">${total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {st̥ate.length !== 0 ?
                                    <NavLink to="/checkout" onClick={GotoTop}>
                                        <button type="button" className="btn btn-outline-primary checkout" >
                                            Continue To Checkout
                                        </button>
                                    </NavLink> :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Cart