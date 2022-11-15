import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Data } from ".././Data";
import { AddItem } from '../Redux/action';
import Pagination from './Pagination';

const Product = () => {
    const Dispatch = useDispatch();
    //how to store in one page display card nubmer
    const [showCard, setShowCard] = useState(3);
    //state create object
    const [paginationCard, setPaginationCard] = useState({
        start: 0,
        end: showCard,
    })
    //get props in pagination file
    const onPagination = (start, end) => {
        //set start and end number 
        setPaginationCard({ start, end })
    }
    const GotoTop = () => {
        return (
            //window position define
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        )
    }
    return (
        <>
            <div className='product-part'>
                <div className='container  py-5'>
                    <div className='row '>
                        <div className='col-md-12'>
                            <div className='row g-5'>
                                {/* how to display in  one page  */}
                                {Data.slice(paginationCard.start, paginationCard.end).map((item) => {
                                    return (
                                        <div className='col-md-4 col-10 mx-auto' key={item.id}>
                                            {/* display product */}
                                            <div className="card" >
                                                <div className='cardimage'>
                                                    <img src={item.img} className="card-img-top" alt={item.title} width="100px" height="300px" />
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text">Price : <span>${item.price}</span></p>
                                                    <div className='d-flex '>
                                                        <NavLink to={`/productdetail/${item.id}`} onClick={GotoTop}
                                                            className="btn cardbtn">
                                                            View Detail
                                                            <i className="fa-solid fa-right-long"></i>
                                                        </NavLink>
                                                        <NavLink to="/card" onClick={GotoTop}>
                                                            <button type="button" className="btn Addcard" onClick={() => Dispatch(AddItem(item))} >
                                                                <i className="fa-solid fa-cart-plus"></i>
                                                            </button>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* props pass in page  */}
            <Pagination
                showCard={showCard}
                onPagination={onPagination}
                total={Data.length}
            />
        </>
    )
}

export default Product