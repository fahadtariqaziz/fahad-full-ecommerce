import ReactStars from 'react-rating-stars-component';
import React from 'react';
//import logoPng from '../../images/logo.png';   //profilePng rakhna tha
import profilePng from '../../images/profile.png';

const ReviewCard = ({review}) => {     //simply parameter se access karle ge review
  
    const options = {
        edit : false,   //stars select ni honge edit false se
        color: "rgba(20,20,20,0,1)",
        activeColor : "tomato",
        size : window.innerWidth < 600 ? 20 : 25,
        //value : 2.5,
        //value : product.ratings,
        value : review.rating,
        isHalf : true,
    
    };
  
    //ye image oper upload kare ge
    return (
    <div className='reviewCard'>
        <img src = {profilePng} alt='User' />
        <p> {review.name} </p>
        <ReactStars {...options} />
        <span>{review.comment}</span>     
    </div>
  );
};

export default ReviewCard