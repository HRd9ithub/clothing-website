import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { Empty } from '../Redux/action/index';

const Order = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: ""
    })
    //error message store in state
    const [errorMsg, setErrorMsg] = useState({});
    //submit state toggle 
    const [isSubmit, setIsSubmit] = useState(false);
    //reducer value get
    const State = useSelector((state) => state.AddProduct);
    //databse collection
    const userCollection = collection(db, "OrderRecord");
    //set email id
    const [Email, setEmail] = useState();
    //set id
    const [id, setId] = useState();
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
        if (!value.name) {
            error.name = "Please Enter the name"
        }
        if (!value.address) {
            error.address = "Please Enter the address"
        }
        if (!value.phone) {
            error.phone = "Please Enter the Phone Number"
        }

        return error;
    }
    const onSubmit = () => {
        {
            State.map(async (item) => {
                const { name, address, phone } = formData;
                const { title, quantity, sizes, img, price } = item;
                //store data in database functionlity
                const res = await addDoc(userCollection, {
                    name,
                    address,
                    phone,
                    userId: id,
                    Email,
                    title,
                    quantity,
                    sizes,
                    img,
                    price,
                    orderId: Math.random().toString().slice(2, 8),
                    Date: serverTimestamp()
                })
                if (res) {
                    Dispatch(Empty())
                    setFormData({
                        name: " ",
                        address: " ",
                        phone: " ",
                    })
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                    navigate("/thanks")
                }
            })
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
                                            className={errorMsg.name && "input-error border-danger"}
                                            id="exampleFormControlInput1"
                                            placeholder="enter the name"
                                            name="name"
                                            value={formData.name}
                                            autoComplete="off"
                                            onChange={InputEvent}
                                        />
                                    </div>
                                    {/* error msg display */}
                                    <div className='errorshow'>{errorMsg.name} </div>

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
                                        <label htmlFor="exampleFormControlInput4" className="form-label">Mobile No</label>
                                        <input type="number"
                                            className={errorMsg.phone && "input-error border-danger"}
                                            id="exampleFormControlInput4"
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