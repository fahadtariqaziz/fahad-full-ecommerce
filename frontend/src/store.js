import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";

import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({       //product ka reducer banana ke product kaise fetch karni tou combine iss liye ke product ke ilawa kafi sari cheezon ka bnana hai
  products: productReducer,
  productDetails : productDetailsReducer,     //ab store men bhi daal dia ab action men chalo
  user:userReducer,
  profile:profileReducer,
  forgotPassword : forgotPasswordReducer,
  cart : cartReducer,
  newOrder : newOrderReducer,
  myOrders : myOrdersReducer,

});

let initialState = {        //initial state empty hai lakin empty ni rakhni    hum rakhe ge agar local storage men data hai tou wo wanra empty   abhi local storage men data diya cartAction men

    cart : {
      cartItems : localStorage.getItem("cartItems")      //ERROR getItems likh diya tha lakin ab theek ab inspect men application men localhost men cart ke ek object men save ho gye hain ye 2 cheezen tou refresh karne pe bhi rhe gi
        ?    //agar hai 
        JSON.parse(localStorage.getItem("cartItems"))      //pehle json . string karke string men convert ka liya tha ab wapis object men convert karlen ge
        :
        [] , //warna empty array   abhi bhi wohi ho gya initial state empty
      shippingInfo : localStorage.getItem("shippingInfo")
        ?
        JSON.parse(localStorage.getItem("shippingInfo"))
        :
        {},
    },
    myOrders: {
      loading: false, // Add the loading property for myOrders
      orders: [],
      error: null,
    },
  
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
