import React, { Fragment } from 'react'
import "./cart.css";
import CartItemCard from './CartItemCardd.js';      //ERROR start with capital letter component name otherwise defined but not used in < />
import {  useDispatch, useSelector } from 'react-redux';
import { addItemsToCart ,removeItemsFromCart } from '../../actions/cartAction.js';
//import  RemoveShoppingCartIcon  from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';
import {Link, useNavigate} from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();    //bec yaha add item se item ko call bhi karne wale hen  or cart men sra data pehle se save hai
    const { cartItems } = useSelector( (state) => state.cart);
    const {isAuthenticated} = useSelector(state => state.user);

    const increaseQuantity = (id , quantity , stock) => {      //cart wale page men sab items honge uski item increase karne se price bhi increase hogi
        const newQty = quantity + 1;
        if(stock <= quantity){
            return ;
        }
        dispatch(addItemsToCart(id,newQty));
    };


    const decreaseQuantity = (id , quantity) => {      //cart wale page men sab items honge uski item increase karne se price bhi increase hogi
        const newQty = quantity - 1;
        if(1 >= quantity){
            return ;
        }
        dispatch(addItemsToCart(id,newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }

    const checkoutHandler = () => {
        if(isAuthenticated){
            navigate("/shipping");
        }
        else{
            navigate("/login");
        }
     
    }


    return (
    <Fragment>
        {cartItems.length === 0 ? (
            <div className='emptyCart'>
                

                <Typography> No Product in Your Cart </Typography>
                <Link to = "/products"> View Products </Link>
            </div>
        ) : <Fragment>
        <div className='cartPage'>

            <div className='cartHeader'>   
                <p>Product</p>  
                <p>Quantity</p>
                <p>SubTotal</p>
            </div>

           
            {cartItems && cartItems.map((item) => (
                 <div key={item.product} className='cartContainer'>
                 <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                 
                 <div className='cartInput'>
                     <button onClick={ () => decreaseQuantity(item.product,item.quantity)}> - </button>
                     <input type='number' value={item.quantity} readOnly/>
                     <button onClick={ () => increaseQuantity(item.product,item.quantity,item.stock)}> + </button>
                 </div>
 
                 <p className='cartSubtotal'> {`Rs ${item.price * item.quantity}`} </p>
             </div>
 
           ))}


            <div className='cartGrossTotal'>
                
                <div></div>

                <div className='cartGrossTotalBox'>
                    <p>Gross Total</p>
                    <p> {`Rs ${cartItems.reduce (
                        (acc , item) => acc + item.quantity * item.price, 0
                    )} `} </p>       
                </div>

                <div></div>

                <div className='checkOutBtn'>
                    <button onClick={checkoutHandler}>Check Out</button>
                </div>
            
            </div>

        </div>
    </Fragment>}
    </Fragment>
  );
};

export default Cart;