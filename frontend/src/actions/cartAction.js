import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addItemsToCart = (id, quantity) => async (dispatch , getState) => {  //parameter men product ki id or quantity aani chaheye          //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    //try{
        //dispatch( {type: LOGIN_REQUEST});      //iski zarorat ni

        //const config = {headers : { "Content-Type" : "application/json" } };    iski bhi zarorat ni get request kare ge

        const {data} = await axios.get(`/api/v1/product/${id}`);    //isse hamen data mile ga                //config kyu ke post request ye object hai jisme header set karna contentType
    
        dispatch( {
            type: ADD_TO_CART, 
            payload: {
                product : data.product._id,      //data.product se product mile ga    or id se wo wala product
                name : data.product.name,
                price: data.product.price,
                image : data.product.images[0].url,
                stock : data.product.stock,
                quantity,
            },
         });      // or  data milne ke baad dispatch karde ge 
    

         //reload karne par bhi cart men item pari rhe   tou local storage men save kara dete

         localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));   //key or value deni hoti  key is cartitems value json stringify string pas karni hoti hai or oper async parameter men getState bhi use kare ge  isse hum state ko access kare ge

};


export const removeItemsFromCart = (id) => async (dispatch , getState) => {

    dispatch({
        type : REMOVE_CART_ITEM,
        payload: id,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); 
};



export const saveShippingInfo = (data) => async (dispatch ) => {

    dispatch({
        type : SAVE_SHIPPING_INFO,
        payload : data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data)); 

}