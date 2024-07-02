import React , {Fragment , useEffect} from 'react'     //div ki jaga fragment  isko  <>  </>  ye bhi kehte same hai
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from './ProductCard.js';
import {CiShoppingCart} from "react-icons/ci";
import {FaSearch} from "react-icons/fa";
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from '../../actions/productAction.js';  //ab isko call karna redux ke sath kaam kar rhe aese he call ni kae skte useSelector useDispatch
import {useSelector , useDispatch} from "react-redux"; 
import Loader from '../layout/Loader/Loader.js';

import {useAlert} from "react-alert" 



//const product = {
//    name : "Blue Tshirt",
//    images : [ {url : "https://i.ibb.co/DRST11n/1.webp" }],
//    price : "5000",
//    _id : "fahad",

//}


const Home = () => {

    const alert = useAlert()  //ye alert set kiya index.js src men or ab useEffect men condition lga den ge
    const dispatch = useDispatch();
    const {loading,error,products} = useSelector(state => state.products)  //productCount mene likh not productsCount in both      //konsi state men se lena data store men extension men products hai or kia kia lena loading,error,products,productsCount tou agya ab webite pe display karana

    useEffect( () => {     //isme datch karden ge iss function ko jo hum ne getProduct wala liya hai  or call

    if(error){
        //return alert.error(error);
        alert.error(error);
        dispatch(clearErrors() );
    }    
        dispatch(getProduct());
    },[dispatch , error , alert])

    return (
    <Fragment>

        {loading ? <Loader/> : <Fragment>

<MetaData title = "FAHAD EC "/>

    <div className='banner'>       
    <p>Welcome to Fahad EC</p>
    <h1>Find Products below</h1>

    <a href='#container'>
        <button>
            Scroll <CgMouse/>
        </button>
    </a>
    <a href='search'>
        <button>
            Search <FaSearch/>
        </button>
    </a>
    <a href='cart'>
        <button>
            Cart <CiShoppingCart/>
        </button>
    </a>
    </div>

    <h2 className='homeHeading'> Featured Products </h2>

    <div className='container' id='container'>
       
       {products && products.map((product) => <Product product = {product} />)}
    </div>
</Fragment>
}
    </Fragment>
  )
}


export default Home;
     