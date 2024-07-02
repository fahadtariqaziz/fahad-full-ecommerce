import React, { Fragment , useEffect , useRef } from 'react'
import CheckoutSteps from "../Cart/CheckoutSteps";
import {useSelector , useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
    CardNumberElement,       //input ki tarah he hai lakin check karle ga card no pora hai ya ni
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css"
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {createOrder, clearErrors} from "../../actions/orderAction";

const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));    //ab pat hona chaye ye hai kia    // wapis string se parse kar rhe json men

    const payBtn = useRef(null);

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();


    const {shippingInfo , cartItems } = useSelector( (state) => state.cart);
    const {user} = useSelector( (state) => state.user );
    const {error} = useSelector ( (state) => state.newOrder );


    const paymentData = {      //ye object hoga or isme bheje ge

        amount : Math.round(orderInfo.totalPrice * 100),     //taake amount roundoff ho jaye   // *100 taake paise men ho jaye stripe paiso men lega payment 200 ruppee tou stripe lega 20,000 paise

    }

    const order = {          //backend men orderController se dekha kia kia chahye
        shippingInfo,
        orderItems : cartItems,          //orderItems jo hai backend men wo yaha cartItems men hai
        itemsPrice : orderInfo.subTotal,
        taxPrice : orderInfo.tax,
        shippingPrice : orderInfo.shippingCharges,
        totalPrice : orderInfo.totalPrice,
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true      //jese he click ho button disable ho jaye

        try{
            const config = {    //sab se pehle config file
                headers: {
                    "Content-Type" : "application/json",
                },
            };
            const {data} = await axios.post(         //axios isssi liye import kiya tha
                "/api/v1/payment/process",
                paymentData,    //isme bhej diya payment data jo abhi tak ni hai    ye object isko bananye ge
                config,   //3rd cheeze configuration yehi
            );

            const client_secret = data.client_secret;     //client secret mile ga wo le len ge data se

            if(!stripe || !elements) return;      //agar ni hai ye dono tou return kardo  ye oper useStripe karke liye howe  ye iss liye hai ke ye ni hai tou aage error ajaye ga iss liye abhi return kardo

            const result = await stripe.confirmCardPayment(client_secret , {     //result men sabse pehle tou client secret jo aya hai or ek object
                payment_method : {
                    card: elements.getElement(CardNumberElement),    //ab elements isme use hua or stripe oper use hua tou pehle he condition laga di thi hone chaye phir yaha aye    cardNumberElement se data mil jaye ga pehle he
                    billing_details: {
                        name : user.name,
                        email: user.email,
                        address: {
                            line1 : shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        },
                    }
                    
                },
            }); 

            if (result.error) {                     //agar error hai tou disable ni hoga button or alert bhi kardo
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }
            else{                                  // agar payment status succeed ho gyi 
                if(result.paymentIntent.status === "succeeded"){

                    order.paymentInfo = {           // oper jo data banaya order ka wo yaha phir aage create karen ge
                        id: result.paymentIntent.id,
                        status : result.paymentIntent.status,

                    };
                    
                    dispatch(createOrder(order) );
                    navigate("/success");
                }
                else{
                    alert.error("There's some issue while Processing payment (FAHAD APP IS FULLY SECURE)");
                }
            }
        }
        catch(error){
            payBtn.current.disabled = false; //agar error ajaye tou dobara button working men
            alert.error(error.response.data.message);
        }

    };


    useEffect( () => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, error , alert])


  return (
    <Fragment>

        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        
        <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={ (e) => submitHandler(e) } >
                <Typography> Card Info </Typography>
                
                <div>
                    <CreditCardIcon/>
                    <CardNumberElement className='paymentInput' />       
                </div>

                <div>
                    <EventIcon/>
                    <CardExpiryElement className='paymentInput' />
                </div>

                <div>
                    <VpnKeyIcon/>            
                    <CardCvcElement className='paymentInput'          //abhi chalaye tou runtime error blank screen aye gi kyu ke isko use karne ke app.js men elements or loadstripe import karni parni or element ke andar rakhna pare ga jisme publish key bhi pass karen ge
                     />
                </div>

                <input 
                    type='submit' 
                    value={`Pay - Rs ${orderInfo && orderInfo.totalPrice}`}   //agar order hai tou pay ke aage uski price
                    ref={payBtn}
                    className='paymentFormBtn'
                />

            </form>
        </div>

    </Fragment>
  )
}

export default Payment

