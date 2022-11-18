import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';

const OrderView = () => {
    //next page click item id in get of use 
    const param = useParams();
    console.log(param.id)
    //database collection
    const userCollection = collection(db, "order-detail");
    const [card, setCard] = useState([])

    useEffect(() => {
        const getUser = async () => {
            //database data get 
            const q = query(userCollection, where("orderId", "==", param.id));
            const data = await getDocs(q)
            setCard(data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        }
        getUser()
    },[])

    return (
        <>
            <div className='orderview-page'>
                <div className='container'>
                    <div className='row'>
                        {card.map((item) => {
                            return (
                                <>
                                    <div className='col-md-6'>
                                        <div className='d-flex justify-content-center mt-5' key={item.id}>
                                            <img className='orderview-image' src={`/${item.img}`} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='orderview-info mt-5'>
                                            <h2 className='orderview-title'>{item.ProductName}</h2>
                                            <hr />
                                            <h4 className='orderview-price'>Price   :<span> ${item.price} </span> </h4>
                                            <h5 className='orderview-size'>Sizes   :<span> {item.sizes} </span></h5>
                                            <h5 className='orderview-quantity'>Quantity   :<span> {item.quantity}</span> </h5>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderView