import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { Empty } from '../Redux/action/index';

const Order = () => {
    const [formData, setFormData] = useState({
        address: "",
        phone: "",
        city: ""
    })
    //error message store in state
    const [errorMsg, setErrorMsg] = useState({});
    //submit state toggle 
    const [isSubmit, setIsSubmit] = useState(false);
    //reducer value get
    const State = useSelector((state) => state.AddProduct);
    //databse collection
    const userCollection = collection(db, "order-detail");
    const userCollection2 = collection(db, "orders");

    //set email id
    const [Email, setEmail] = useState();
    //set login name in use  state
    const [Name, setName] = useState();
    //set id
    const [id, setId] = useState();
    const [orderId , setOrderId] =useState("")
    //redux action target use
    const Dispatch = useDispatch();

    const navigate = useNavigate();

    //onchange function call
    const InputEvent = (event) => {
        let name = event.target.name;
        let values = event.target.value;

        setFormData({ ...formData, [name]: values })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //error handling
        setErrorMsg(validate(formData));
        setIsSubmit(true)
    }

    const validate = (value) => {
        let error = {}; // store error
        //check the input filed value is empty or not
        if (!value.address) {
            error.address = "Please Enter the address"
        }
        if (!value.phone) {
            error.phone = "Please Enter the Phone Number"
        }
        if (!value.city) {
            error.city = "Please Enter the city"
        }
        return error;
    }
    const onSubmit = async () => {
        const {  address, phone, city } = formData;
        const Shipping = localStorage.getItem("Shipping");
        const subTotal = localStorage.getItem("Total") - Shipping;
        const Discount = localStorage.getItem("Promotion");
        const GrandTotal = localStorage.getItem("Grand-total")
        
        const res = await addDoc(userCollection2,{
            Name,
            address,
            phone,
            Email,
            city,
            Date: serverTimestamp(),
            userId: id,
            subTotal,
            Shipping,
            Discount,
            GrandTotal
        })
        if (res) {
            setFormData({
                address: " ",
                phone: " ",
            })
        // eslint-disable-next-line no-lone-blocks
        {
            State.map(async (item) => {
                const { title, quantity, sizes, img, price } = item;
                //store data in database functionlity
                const res1 = await addDoc(userCollection, {
                    ProductName: title,
                    quantity,
                    sizes,
                    img,
                    price,
                    orderId : res.id,
                    Date: serverTimestamp(),

                })
                if (res1) {
                    Dispatch(Empty())
                    localStorage.removeItem("Shipping");
                    localStorage.removeItem("Total")
                    localStorage.removeItem("Promotion");
                    localStorage.removeItem("Grand-total")
                    localStorage.removeItem("coupon")
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                    navigate("/thanks")
                }
            })
        }
    }
}
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email)
            }
            if (user) {
                setId(user.uid)
            }
            if (user) {
                setName(user.displayName)
            }
        })
    })
    useEffect(() => {
        if (Object.keys(errorMsg).length === 0 && isSubmit) {
            onSubmit();
        }
    }, [errorMsg])
    return (
        <>
            <div className='order-info'>
                <div className='container'>
                    <div className='col-md-12 mt-3'>
                        <h3 className='page-title'>order</h3>
                    </div>
                    <div className='row g-5'>
                        {/* form  */}
                        <div className='col-md-7 col-lg-8'>
                            <form className='form' onSubmit={handleSubmit}>
                                <div className='main-form'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">FullName</label>
                                        <input type="text"
                                            id="exampleFormControlInput1"
                                            placeholder="enter the name"
                                            name="name"
                                            value={Name}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput2" className="form-label">Email</label>
                                        <input type="email"
                                            id="exampleFormControlInput2"
                                            name="email"
                                            value={Email}
                                            placeholder="name@example.com" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput3" className="form-label">Shipping Address</label>
                                        <input type="text"
                                            className={errorMsg.address && "input-error border-danger"}
                                            id="exampleFormControlInput3"
                                            placeholder="enter the address"
                                            name="address"
                                            value={formData.address}
                                            autoComplete="off"
                                            onChange={InputEvent}
                                        />
                                    </div> {/* error msg display */}
                                    <div className='errorshow'>{errorMsg.address} </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput4" className="form-label">City</label>
                                        <input type="text"
                                            className={errorMsg.city && "input-error border-danger"}
                                            id="exampleFormControlInput4"
                                            placeholder="enter the city"
                                            name="city"
                                            value={formData.city}
                                            autoComplete="off"
                                            onChange={InputEvent}
                                        />
                                    </div> {/* error msg display */}
                                    <div className='errorshow'>{errorMsg.city} </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput5" className="form-label">Mobile No</label>
                                        <input type="number"
                                            className={errorMsg.phone && "input-error border-danger"}
                                            id="exampleFormControlInput5"
                                            name="phone"
                                            value={formData.phone}
                                            autoComplete="off"
                                            onChange={InputEvent}
                                            placeholder="enter the phone number"
                                        />
                                    </div> {/* error msg display */}
                                    <div className='errorshow'>{errorMsg.phone} </div>

                                    <div className="col-12">
                                        <button className="btn btn-outline-primary" type="submit">Confirm Order</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* table */}
                        <div className='col-md-5 col-lg-4'>
                            <div className='d-flex justify-content-around mb-2'>
                                <label className='summary-label'>
                                    Your Cart
                                </label>
                                <span className="badge bg-primary">{State.length}</span>
                            </div>
                            <div className='order-summary-table'>
                                <table className='table order-summary'>
                                    <thead>
                                        <tr>
                                            <th>title</th>
                                            <th>quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {State.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.price * item.quantity}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order