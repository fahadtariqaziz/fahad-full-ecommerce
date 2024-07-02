import React, { Fragment ,useState  , useEffect } from 'react'      //switcherTab or ref   react men seeedha DOM ke element ko use ni kar skte uske liye useRef use karte   iski jaga  document.querySelector(".loginForm") tou aese us element ko access ni kar skte tou loginForm jab bhi access karo ga tou usse pta chal jaye ga iska ref hai
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
//import { Link } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
//import  LockOpenIcon  from '@material-ui/icons/LockOpen';
//import FaceIcon from '@material-ui/icons/Face';

import {useDispatch,useSelector } from 'react-redux';
import {clearErrors , forgotPassword} from "../../actions/userAction";        //ERROR loadUser is not defined   loaduser bhi ek api hai for /me  taake fresh data load ho
import { useAlert } from "react-alert";  //ye error ke liye jese galat email password diya tou wo

//import { useNavigate } from 'react-router-dom';
//import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';


const ForgotPassword = () => {

    const dispatch = useDispatch();    //ab socho useEffect tou import ni kiya useDispatch kaha callkare ge . Basically ye hame useEffect ni karna ye tab karna jab form submit ho  jaha console.log kiya waha dispatch karna
    const alert = useAlert();
    //const navigate = useNavigate();

    //const { user} = useSelector(state => state.user);    //useSelector ka use Karke error ko pull karna hai lana hai
    //const { error , isUpdated , loading }= useSelector( (state) => state.profile);  //state . profile se laye ge ye state    ERROR error is not defined wo yaha se agya isUpdaed bhi
    const { error , message , loading }= useSelector( (state) => state.forgotPassword);  //state . profile se laye ge ye state    ERROR error is not defined wo yaha se agya isUpdaed bhi

    const [email , setEmail] = useState("");
    

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();              //event.preventDefault sab se pehle

        const myForm = new FormData();  //form ka data bna ke bheje ge pora

        //myForm.set("name" , name);    //ye sab cheezen oper useState ka use karke banaye ge   or aage dispatch kare ge
        myForm.set("email" , email);
        //myForm.set("password", password);
        //myForm.set("avatar", avatar);
        //console.log("Sign Up Form Submitted");   
        dispatch(forgotPassword(myForm));      
    }


    useEffect( () => {

        //if(user){
        //    setName(user.name);
        //    setEmail(user.email);
        //    setAvatarPreview(user.avatar.url);
        //}

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        //if(isAuthenticated){
        if(message){ 
            alert.success(message);
           // dispatch(loadUser());   //taake fresh data load ho 
           // navigate("/account")         //useEffect men he navigate karde ge jab redux men true ho jaye gi is Authenticated 
        
           // dispatch({
           //     type: UPDATE_PROFILE_RESET,          //taake isUpdate false ho jaye  reducer men diya isUpdate false
           // });
        }

    }, [dispatch,error,alert, message])


  return (
    <Fragment>
            {loading ? <Loader/> : <Fragment>

<MetaData title="Fahad Forgot Password" />
<div className='forgotPasswordContainer'>
<div className='forgotPasswordBox'> 

<h2 className='forgotPasswordHeading'>Forgot Password</h2>
<form 
        className='forgotPasswordForm'
        
        //encType='multipart/form-data'   //kyu ke iss form hum sirf text data ni bheje image bhi send kare ge user ki ye mandatoy
        onSubmit={forgotPasswordSubmit}
    >


        <div className='forgotPasswordEmail'>
            <MailOutlineIcon/>
            <input
                type='email'
                placeholder='Email'
                required
                name='email'
                value={email}
                //onChange={forgotPasswordDataChange}
                onChange={ (e) => setEmail(e.target.value)}
            />
        </div>

        
        <input 
            type='submit'
            //value="Register"
            //value="Update "
            value="Send"
            className='forgotPasswordBtn'
        />

    </form>

</div>
</div>        
</Fragment>
}
        </Fragment>
  )
}

export default ForgotPassword;