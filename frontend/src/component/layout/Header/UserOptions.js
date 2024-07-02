import React, { Fragment, useState } from 'react'
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"   //speedialIcon se jab picture oper ajaye gi user then uspe hover karne se action se icons display honge jitne den ge speed dial icon men or usme onClick bhi deden ge or ye array men karlete array banaye options ki usme sare icons   or agar user ka role admin hoga tou uss array men dashboard add karden ge warna ni or function bnane ke bad jo neeche return speedDialAction kiya tha uski jaga map funcion {} 
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from  "@material-ui/icons/ShoppingCart";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';      //use Alert se ata logout successfully neeche 
import {logout} from "../../../actions/userAction";
import PropTypes from 'prop-types';
import zIndex from '@material-ui/core/styles/zIndex';

const UserOptions = ({ user }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [open , setOpen] = useState(false);

    const {cartItems } = useSelector( (state) => state.cart);

    const options = [
      {icon : <ListAltIcon/> , name : "Orders", func : orders},  //abhi tak ye function ni banaya tou ignore it
      {icon : <PersonIcon/> , name : "Profile", func : account},
      {icon : <ShoppingCartIcon style={ {color : cartItems.length > 0 ? "tomato" : "unset"} } /> , name : `Cart(${cartItems.length})`, func : cart},
      {icon : <ExitToAppIcon/> , name : "Logout", func : logoutUser},
    ];
    
    if(user.role === "admin"){
      options.unshift( {icon: <DashboardIcon/>, name:"Dashboard", func: dashboard} )     //options wali array men agar shift use kare tou wo karta remove first element from an array but humne unshift karna ye starting men add kardeta
    }
 //   if (user && user.role === "admin") {
 //     options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
  //}

    //order, acccount , logoutUser , dashboard is not defined

    function dashboard(){
      navigate("/dashboard");
    }

    function orders(){
      navigate("/orders");
    }

    function account(){
      navigate("/account");
    }

    function cart(){
      navigate("/cart");
    }

    function logoutUser(){
      dispatch(logout());        //error: logout is not defined  import karen ge oper
      alert.success("Logout Successfully");
    }

  return (
    <Fragment>
      <Backdrop open={open} style={ {zIndex : '10'} } />
        <SpeedDial
            ariaLabel = "SpeedDial tootip example"
            onClose = { () => setOpen(false)}
            onOpen = { () => setOpen(true)}
            open = {open}
            style={ { zIndex: '11' } }
            direction='down'
            icon = { <img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/images/profile.png"} alt='profile' />}     //user.avatar iss liye kiya kyu user access kar rkha hai useSelector se redux ke tab state se isAuthenticated ke sath
           //icon={<img className='speedDialIcon' src={user && user.avatar ? user.avatar.url : "/images/profile.png"} alt='profile' />}
           //</Fragment> icon={user && user.avatar && user.avatar.url && (
           //   <img className='speedDialIcon' src={user.avatar.url} alt='Profile' />
          //)}
            className='speedDial'
          >

          {options.map( (item) => (
            <SpeedDialAction
              key = {item.name} //error each must have a unique key
              icon={ item.icon } 
              tooltipTitle={item.name} 
              onClick={item.func}
              tooltipOpen = {window.innerWidth < 600? true : false } 
            />
          ) )}

        </SpeedDial>

    </Fragment>
  )
}


UserOptions.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserOptions