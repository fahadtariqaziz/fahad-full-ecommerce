import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";



//options abhi banaye ge ye oper is liye likhe ke neeche messy ho jata
const ProductCard = ({product}) => {

  const options = {
    edit : false,   //stars select ni honge edit false se
    color: "rgba(20,20,20,0,1)",
    activeColor : "tomato",
    size : window.innerWidth < 600 ? 20 : 25,
    //value : 2.5,
    value : product.ratings,
    isHalf : true,

};



  return (
    <Link className ="productCard" to = {`product/${product._id}`}>
        <img src = {product.images[0].url} alt={product.name} />
        <p > {product.name} </p>
        <div>
            <ReactStars {...options} />  <span> ({product.numOfReviews} Reviews)</span> 
        </div>
        <span>{`Rs ${product.price}`}</span>
    </Link>

  )
}

export default ProductCard;