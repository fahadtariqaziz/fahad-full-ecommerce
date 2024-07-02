import './App.css';
import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router , Routes ,Route, BrowserRouter} from "react-router-dom";

import WebFont from 'webfontloader';
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
//import Loader from './component/layout/Loader/Loader.js';
import ProductDetails from './component/Product/ProductDetails.js'
import Products from "./component/Product/Products.js";

import Search from "./component/Product/Search.js"
import LoginSignup from './component/User/LoginSignup.js';

import store from './store.js';      //after login load user karne ke liye load set
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js';     //ye banaye ge logout wagera show karane ke liye
import { useSelector ,useDispatch } from 'react-redux';

import Profile from "./component/User/Profile.js"

import Protected from './component/Route/ProtectedRoute.js';

import UpdateProfile from "./component/User/UpdateProfile.js";  //userAction men small u tha updateProfile same hoga tou kaam ni kare ga
import UpdatePassword from "./component/User/UpdatePassword.js";  //userAction men small u tha updateProfile same hoga tou kaam ni kare ga
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import { useEffect , useState } from 'react';
import Payment from "./component/Cart/Payment.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";

function App() {

  //const {isAuthenticated, user} = useSelector(state => state.user);   //state ye wo wali state jo redux ka tab hai isme user men isAuthenticated true hai or user bhi hai yaha se hum isAuthenticated le le ge kyu ke isAuthenticated is not defined aa rha  tha  or user bhi le len ge wo bhi undefined arha tha  ye dono ceezen neeche bhi dedi agar isAuthenticated hai tou userOptions dikhane or usme user bhi pass kardiya   ab userOptions.js  men Hi den ge tou wo display ho jaye ga kyu ke men login hon
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [stripeApiKey , setStripeApiKey] = useState("");

  /*
  async function getStripeApikey () {
    //const {data} = await axios.get("/api/v1/stripeapikey");    //backend wale url pe he request kardi
    try {
      const response = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(response.data.stripeApiKey); // Ensure the key name matches what your backend sends
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
      // Handle error, e.g., set a default API key or show an error message
    }


    //setStripeApiKey(data.stripeapikey);    //set men is url se jo data aya matlb api key usko set kardia
  }
  */

  useEffect(() => {
    async function getStripeApiKey() {
      try {
        const response = await axios.get('/api/v1/stripeapikey');
        setStripeApiKey(response.data.stripeApiKey);                        //aese get ki hum ne backend se stripe api key
      } catch (error) {
        console.error('Error fetching Stripe API key:', error);
        // Handle error, e.g., set a default API key or show an error message
      }
    }

    getStripeApiKey();
  }, []);

  


  
  React.useEffect( () => {           //page load hone se pehle he load karle ge font useEffect se

    WebFont.load( {     
      google: { families : ["Roboto" , "Droid Sans" , "Chilanka"],
     },
    });

    store.dispatch(loadUser());

    //getStripeApikey();          //yaha call karen ge sath package install kare ge
  //}, [dispatch]);
}, []);



/*     //iski bhi zarorat ni
useEffect(() => {
    if (stripeApiKey) {
      const stripePromise = loadStripe(stripeApiKey);
      // Use stripePromise in your Elements component or wherever you need it
    }
  }, [stripeApiKey]);
*/




//exact hata den ge route jo search se search karna

//login karke refresh karne se ERROR cannot read property url of undefined   <img src={user.avatar.url} alt ={user.name}>   kyu ke ye component pehle load image load hone se pehle   tou app.js men condition laga den ge jese pehle lagayi hui isAuthenticated hai && phir load ho UserOptions  tou ye kitni dafa lagaye ge account route men ek protected route bna lete phir har route men isAuthenticated karke ni lagana pare ga tou wo banate   component men ek or folder bnate
//<Route exact path='/account' element={<Profile/>} />  
  return  <Router>
  <Header />
  {isAuthenticated && <UserOptions user={user} />}             
  <Routes>
    <Route exact path='/' element={<Home />} />
    <Route exact path='/product/:id' element={<ProductDetails />} />
    <Route exact path='/products' element={<Products/>} />
    <Route exact path='/products/product/:id' element={<ProductDetails />} />
    
    <Route path='/products/:keyword' element={<Products/>} />  
    <Route exact path='/search' element={<Search/>} />

    <Route exact path='/login' element={<LoginSignup/>} />

    <Route exact path='/account' element = { <Protected isAuth={isAuthenticated}><Profile/></Protected>} />
    <Route exact path='/me/update' element = { <Protected isAuth={isAuthenticated}><UpdateProfile/></Protected>} />    
    <Route 
      exact
      path='/password/update'
      element = { <Protected isAuth={isAuthenticated} > <UpdatePassword/> </Protected>}
    
    />
    <Route exact path="/password/forgot" element={  <ForgotPassword/>} />
    
    <Route exact path="/password/reset/:token" element={<ResetPassword />} />

    <Route exact path="/cart" element={  <Cart/>} />

    <Route exact path='/shipping' element = { <Protected isAuth={isAuthenticated}><Shipping/></Protected>} />
    
    <Route exact path='/order/confirm' element = { <Protected isAuth={isAuthenticated}><ConfirmOrder/></Protected>} />

    (stripeApiKey && (<Route exact path='/process/payment' element={ <Protected isAuth={isAuthenticated}> <Elements stripe={stripeApiKey ? loadStripe(stripeApiKey) : null}>
                <Payment />
              </Elements>
            </Protected>
          }
        />))
    
    <Route exact path='/success' element = { <Protected isAuth={isAuthenticated}><OrderSuccess/></Protected>} />

    <Route exact path='/orders' element = { <Protected isAuth={isAuthenticated}><MyOrders/></Protected>} />
      
    
  </Routes>

 
  <Footer />
</Router>
   

}

export default App;