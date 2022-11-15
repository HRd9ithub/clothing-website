import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import { Data } from '../Data';
import { NavLink } from 'react-router-dom';
import { AddItem } from '../Redux/action';
import { useDispatch } from 'react-redux';

const ProductSlider = () => {
  //use of redux action target 
  const Dispatch = useDispatch();
  //slick slider use
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,

  };
  const GotoTop = () => {
    return (
      //window position define
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    )
  }
  return (
    <div className='product-slider' >
      <Slider {...settings}>
        {Data.map((item) => {
          return (
            <div className='card-slider' key={item.id}>
              <div className="card" style={{ width: '17rem' }}  >
                <div className='cardimage1'>
                  <img src={item.img} className="card-img-top" alt={item.title} width="100px" height="300px" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price : <span>${item.price}</span></p>
                  <div className='d-flex '>
                    <NavLink to={`/productdetail/${item.id}`} onClick={GotoTop} className="btn cardbtn">View Detail<i className="fa-solid fa-right-long"></i></NavLink>
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
      </Slider>
    </div>

  )
}

export default ProductSlider