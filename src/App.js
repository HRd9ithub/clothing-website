import React, { useEffect, useState } from 'react'
import Header from './components/Common/Header';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import Home from './components/Home';
import Contact from "./components/Common/Contact"
import Login from "./components/Authentication/Login"
import Register from "./components/Authentication/Register"
import Product from "./components/Product/Product"
import ProductDetail from "./components/Product/ProductDetail"
import Footer from "./components/Common/Footer"
import GoToTop from './components/Common/GoToTop';
import Loader from './components/Common/Loader';
import Cart from './components/Add_cart/Cart';
import CheckOut from './components/Add_cart/CheckOut';
import Order from './components/Add_cart/Order';
import Thanks from './components/Common/Thanks';
import TabPanel from './components/MyAccount/TabPanel';
import OrderView from './components/MyAccount/OrderView';
import { AppProvider } from './components/Add_cart/Context';

const App = () => {
  //use state in used of loader component of toggle
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
     setLoading(false)
    }, 1500)
  }, [])
  return (
    <>
    <AppProvider>
      {/* toggle component */}
      {loading ? <Loader /> : <>
        <Header />
        <Routes>
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/card" element={<Cart/>} />
          <Route path="/checkout" element={<CheckOut/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/thanks" element={<Thanks/>} />
          <Route path="/tabpanel" element={<TabPanel/>} />
          <Route path="/orderview/:id" element={<OrderView/>} />
        </Routes>
        <Footer />
        <GoToTop />
      </>}
      </AppProvider>
    </>
  )
}

export default App