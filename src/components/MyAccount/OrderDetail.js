import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { auth, db } from '../../firebase'
import Loader from '../Common/Loader'

const OrderDetail = () => {
    //login id set in state
    const [id, setId] = useState();
    //store in database data in array
    const [card, setCard] = useState([]);
    //database collection
    const userCollection = collection(db, "orders");
    //loader in toggle of help state
    const [loader, setLoader] = useState(false);

    //get login id
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setId(user.uid);
            }
        })
        const getUser = async () => {
            setLoader(true)
            const q = query(userCollection, where("userId", "==", id));
            //database data get funtionality
            const data = await getDocs(q);
            setLoader(false)
            setCard(data.docs.map((user) => ({
                ...user.data(),
                id: user.id
            })))
        }
        getUser();
    }, [id]);

    // //database data delete funtionlity
    // const orderDelete = async (item) => {
    //     const userDoc = doc(db, "order-detail", item.id);
    //     await deleteDoc(userDoc)
    // }



    return (
        <>
            {loader ? <Loader /> : <>
                <div className='container'>
                    <div className='col-md-12 mx-auto text-center orderdetail-label'>
                        <label className='l'>order Detail</label>
                    </div>
                    <div className='order-detail'>
                        <div className='col-12'>
                            <table className='table order-detail-table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>city</th>
                                        <th>phone</th>
                                        <th>SubTotal</th>
                                        <th>Shipping Free</th>
                                        <th>Discount</th>
                                        <th>GrandTotal</th>
                                        <th>Date</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {card.map((item) => {
                                        return (
                                            <>
                                                <tr key={item.id}>
                                                    <td>{item.Name}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.phone}</td>
                                                    <td>${item.subTotal}</td>
                                                    <td>{item.Shipping}</td>
                                                    <td>{item.Discount}</td>
                                                    <td>${item.GrandTotal}</td>
                                                    <td>{item.Date.toDate().toLocaleString()}</td>
                                                    <td>
                                                        <div className='action'>
                                                            <NavLink to={`/orderview/${item.id}`}>
                                                                <button className="action-view">view</button>
                                                            </NavLink>
                                                            {/* <button className="action-delete" onClick={() => orderDelete(item)}><i className="fa-solid fa-trash"></i></button> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default OrderDetail