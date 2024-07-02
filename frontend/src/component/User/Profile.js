import React, { Fragment ,useEffect} from 'react';        //user.createdAt abhi backend men set kare ge Date.now() karke
//loading ke time pe user ka sara data load kara liya tha state men
//ERROR user metdata link is not defined        user useSelector se pull kare ge redux se  , MetaData bhi import ,  Link tag bhi import
//isAutenticated ke liye useEffect import
//login karke refresh karne se ERROR cannot read property url of undefined   <img src={user.avatar.url} alt ={user.name}>   kyu ke ye component pehle load image load hone se pehle   tou app.js men condition laga den ge jese pehle lagayi hui isAuthenticated hai && phir load ho UserOptions  tou ye kitni dafa lagaye ge account route men ek protected route bna lete phir har route men isAuthenticated karke ni lagana pare ga tou wo banate
import { UseSelector, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const {user , loading , isAuthenticated} = useSelector( (state) => state.user );


    useEffect(() => {
           if(isAuthenticated === false){
                navigate("/login")
           } 
    
    }, [isAuthenticated,navigate])
    


  return (
    <Fragment>
        {loading ? <Loader/> : <Fragment>
        <MetaData title={`${user.name}'s Profile`} />      

        <div className='profileContainer'>
            <div>
                <h1> My Profile </h1>
                <img src={user.avatar.url} alt={user.name}/>
                <Link to="/me/update"> Edit Profile </Link>
            </div>

            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p> {String(user.createdAt).substr(0, 10) }</p>
                </div>
                <div>
                    <Link to="/orders"> My Orders </Link>
                    <Link to="/password/update"> Change Password </Link>
                </div>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Profile