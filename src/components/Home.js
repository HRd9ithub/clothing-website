import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ProductSlider from './Product/ProductSlider';


const Home = () => {

  return (
    <>
  {/* use react bootstrap image slider */}
     <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='./images/slider/1.png'
          alt="First slide"
          height="600px"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/slider/2.jpg"
          alt="Second slide"
          height="600px"
        />

        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/slider/3.jpg"
          alt="Third slide"
          height="600px"
        />
      </Carousel.Item>
    </Carousel>
    <div className='product'>
      <div className='container'>
        <h2>Product</h2>
      </div>
    </div>
    <ProductSlider/>
    </>
  )
}

export default Home