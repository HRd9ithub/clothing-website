import { useState } from "react";
import { createContext } from "react";
import { useSelector } from "react-redux";

const AppContext = createContext();

const AppProvider = ({children}) => {
const [subTotal , setSubTotal] = useState(0)
  const state = useSelector((state)=> state.Addproduct);
    
  const checkCoupon = ({coupon}) => {
       console.log(coupon)
  }

  return (
    <AppContext.Provider value={checkCoupon}>
        {children}
    </AppContext.Provider>
  )
}
  

export {AppContext,AppProvider};