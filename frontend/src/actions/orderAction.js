import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS } from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch , getState) => {

    try{
        dispatch({type : CREATE_ORDER_REQUEST});

        const config = {
            headers : {
                "Content-Type" : "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/new", order , config);       //order route backend men yehi route diya tha

        dispatch( {type : CREATE_ORDER_SUCCESS , payload: data});

    }

    catch(error)
    {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};




export const myOrders = () => async (dispatch , getState) => {             //()  isme kuch ni bhejna

    try{
        dispatch({type : MY_ORDER_REQUEST});

        //const config = {             kuch ni bhejna
        //    headers : {
        //        "Content-Type" : "application/json",
        //    },
        //};
        const { data } = await axios.get("/api/v1/orders/me");       //order route backend men yehi route diya tha

        dispatch( {type : MY_ORDER_SUCCESS , payload: data.orders});         //payload men data.orders bhej den ge

    }

    catch(error)
    {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({type : CLEAR_ERRORS});
};