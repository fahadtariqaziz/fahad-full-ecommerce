import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'; //hamesha ki tarah kuch chezen import karni
import {clearErrors, getProduct} from "../../actions/productAction.js";  //ye bhi import karni ye method banaya hua pehle ka productActions men Jo Home me product la raha wohi yaha bhi use kare ge
import Loader from "../layout/Loader/Loader.js";
import Product from "../Home/ProductCard.js";   //ERROR : The tag <productCard> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.  //ye bhi wohi wala use kare ge jo same home wale folder men use kar rhe
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
//import { current } from '@reduxjs/toolkit';
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography';

//import { category } from '@material-ui/icons';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData.js';


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

//const Product = ({ match }) => {
  const Products = () => {
  
  const dispatch = useDispatch();

  const alert = useAlert();  //or useEffect men he if error    or depenedency men bhi add karna hai
    
  const [currentPage , setCurrentPage] = useState(1); //isko pass karde ge dispatch(getProduct) men keyword ke sath //initially state rhe gi 1 bydefault   setCurrentPage define karna currentPage tou neeche banaaya pagination men
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const{products,loading , error, productsCount , resultPerPage} = useSelector(state => state.products);


  //const keyword = match.params.keyword;
  const {keyword} = useParams();

  const setCurrentPageNo = (e) => { setCurrentPage(e) }         //is line dono bna diye oper wala setCurrentPage bhi or pagination wala setCurrentPageNo 

  //const setCurrentPageNo = (pageNumber) => {
  //  setCurrentPage(pageNumber);
  //};


  const priceHandler = (event, newPrice) => {                 //jisme pass kar rhe hai event
    setPrice(newPrice);
  }

  useEffect( () => {

    if(error){
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct(keyword , currentPage, price , category ,ratings)) //abhi tak ratings sirf ui pe agyi lakin kaam ab kare gi or sath action men bhi dalna default+url iski functionality sari backend men hai  //or currentPage recieve bi kare ge productAction men getProduct men or neeche dependency men add karna bhoolna mat

  },[dispatch, keyword, currentPage ,price ,category , ratings , alert ,error ])

  //key men id pass kare ge product men product pass kare ge
  return (
    <Fragment>
      {loading ? <Loader/> :
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className='productsHeading'>Products</h2>

          <div className='products'>
              {products && products.map( (product) => (<Product key={product._id} product = {product} />   )  )}   

          </div>



        <div className='filterBox'>
            <Typography>Price [0-2500k]</Typography>       
            <Slider
              value={price}   // {} wale oper banate hen abhi  pehle useState banaye ge  phir ek const men ek variable leke set men rakh den ge
              onChange={priceHandler}
              valueLableDisplay = "auto"
              aria-labelledby="range-slider"
              min = {0}
              max = {25000}
              valueLabelDisplay="auto"
            />
            <Typography>Categories</Typography>
            <ul className='categoryBox'>
                {categories.map((category) => (
                  <li 
                    className='category-link'
                    key={category}    //category unique hogi tou wohi key dedi
                    onClick={ () => setCategory(category)}    //category like apple or neeche show bi kara den ge oper array bna lete categories ki
                    >
                      {category}
                  </li>
                ))}
            </ul>

            <fieldset>
              <Typography component="legend">
                  Ratings Above
              </Typography>
              <Slider 
                value={ratings}     //rating or set rating oper bnante phir ek or const men variable leke set men usko dete hen
                onChange={ (e, newRating) => { setRatings(newRating); }}
                aria-label="continuous-slider"    //oper wala range-slider tha
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>


        </div>
        
        
        <div className='paginationBox'>
          <Pagination
            activePage={currentPage} //abhi ye banaye ge current page   ye jo {} isme hai ye sab banane
            itemsCountPerPage={resultPerPage} //ye dene he hote hen    backend men productController men resultPerPage = 8 set kiya hai  usko response men ni bheja wo bhi bhej den ge    phir reducer men bi dena SUCCESS men    or oper {} acess bhi karle ge jese productsCount kiya tha  ye ho gya ab current perPage or setCurerrentPerPage batate
            totalItemsCount={productsCount} //ye oper keh rha tha use ni kiya kar liya home.js men se hta dete bcz pagination yahakar rhe
            onChange={setCurrentPageNo} //ye bhi abhi banaye ge
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass='page-item'
            linkClass='page-link'
            activeClass='pageItemActive'
            activeLinkClass='pageLinkActive'
          />
        </div>


        </Fragment>
      }
    </Fragment>
  )
}

export default Products;