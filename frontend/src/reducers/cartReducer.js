import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";


export const cartReducer = (state = { cartItems : [] , shippingInfo:{} },  action) => {
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;    //jo bhi action.payload se aye ga wo item men aye ga

            const isItemExist = state.cartItems.find(    //pehle se cart men exist karti item
                (i) => i.product === item.product           //item.product product use kar rhe id ke reference men   i.product jo array men item wo jo oper abhi aya 

                
            );

            if (isItemExist){
                return {
                    ...state,
                    cartItems : state.cartItems.map((i) =>                  //pehle tou state phir cartItems pe map function  i.product equal hai isItemExist ke  then item otherwise i
                        i.product === isItemExist.product ? item : i
                    ),
                };

            } else {
                return{
                ...state,
                cartItems : [...state.cartItems, item],    //agar pehle cart men item ni hai tou  tou pehle tou state return karde ge jo bhi state men hai   phir cartItmes ki array men wo element add karde ge   , laga ke jo bhi array men add karna
                }
            }


            case REMOVE_CART_ITEM :
                return {
                    ...state,
                    cartItems : state.cartItems.filter( (i) => i.product !== action.payload ),
                
                };

            
            case SAVE_SHIPPING_INFO :
                return {
                    ...state,
                    shippingInfo : action.payload,
                }


        default:
           return state;       //return ni lagaya tha tou ERROR expected an assignment or function call and istead saw an expression
    }
} 