import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { Data } from ".././Data";
import Loader from '../Common/Loader';
import { AddItem, AddSize } from '../Redux/action/index'

const ProductDetail = () => {
    //use state in used of loader component of toggle
    const [loading, setLoading] = useState(false);
    //how to get product page of id 
    const pram = useParams();
    //use of target redux action
    const Dispatch = useDispatch();
    //set size in state 
    const [size, setSize] = useState()
    //check id in data.js file 
    const item = Data.filter((val) => {
        return val.id == pram.id;
    })
    //store in array
    const itemDetail = item[0];
    const selectSize = (val) => {
        // console.log(val, "selectsize");
        // console.log(itemDetail, "itemdetail");
        itemDetail.sizes = val;
    }

    const GotoTop = () => {
        return (
            //window position define
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        )
    }
    useEffect(() => {
        //set time in loader
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    return (
        <>
            <div className='productdetail'>
                {loading ? <Loader /> : <>
                    <div className='container mb-3 py-5'>
                        <div className='row '>
                            <div className='col-md-6'>
                                <div className='d-flex justify-content-center productimage'>
                                    <img src={`/${itemDetail.img}`} alt={itemDetail.title} />
                                </div>
                            </div>
                            <div className='col-md-6 mt-5'>
                                <h2>{itemDetail.title} </h2>
                                <hr />
                                <p>{`price : $${itemDetail.price}`} </p>
                                <p>{`Descrpition : ${itemDetail.dec}`} </p>
                                <div className='from-group'>
                                    <label>Size : </label>
                                    <select className='size-dropdown' onChange={(event) => {
                                        selectSize(event.target.value)
                                    }} >
                                        <option>select size</option>
                                        <option>s</option>
                                        <option>m</option>
                                        <option>l</option>
                                        <option>xl</option>
                                    </select>

                                </div>
                                <NavLink to="/card" onClick={GotoTop}>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => Dispatch(AddItem(itemDetail))} >
                                        <i className="fa-solid fa-cart-plus"></i>Add To Card
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </>
    )
}

export default ProductDetail