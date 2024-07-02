import React, { Fragment, useState } from 'react'
import "./Search.css";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';


//form pe submit handler laga rkha hai ke submit hone pe ye function call ho opr banaye ge abhi ye
//setKeyword kia ye ye bhi oper define kare ge usme set ki targer value jo likhi hai
//type submit wala input jo hai wo button hai
const Search = () => {     //ERROR: React Component names must start with an uppercase letter search -> Search  //ERROR : unexpected userHistory

    const [keyword, setKeyword] = useState("");     //yaha useState ka use kiya hai

    const navigate = useNavigate();  //push ki jaga react version 7 men useParams  tou oper parameter men history likhne ki bhi zarorat ni

    const searchSubmitHandler = (e) => {
        e.preventDefault();   //matlb form submit karne pe jo relaod hota hai wo nae hoga
        if (keyword.trim()) {             //trim karne ke baad sari spaces khatam ho jaye gi  aese thori space kiya or send kar diya proper information honi cahye 
            //history.push(`/products/${keyword}`);  //or agar aesa kuch exist karta hai tou push karde ge
            navigate(`/products/${keyword}`);
        } else {
            //history.push("/products");  //or agar aesa kuch ni hai tou sirf products bhej dega
            navigate("/products"); 
        }
    };

  return (
    
    <Fragment>
        <MetaData title="Search by Fahad" />
        <form className='searchBox' onSubmit={searchSubmitHandler}>

            <input 
                type='text'
                placeholder='Search a Product ...'
                onChange={ (e) => setKeyword(e.target.value)}
            />
            <input 
                type='submit'
                value="Search"
            />
        </form>
    </Fragment>
    
    )
}

export default Search;
