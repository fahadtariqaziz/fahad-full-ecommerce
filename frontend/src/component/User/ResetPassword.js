import React, { Fragment ,useState  , useEffect } from 'react'      //switcherTab or ref   react men seeedha DOM ke element ko use ni kar skte uske liye useRef use karte   iski jaga  document.querySelector(".loginForm") tou aese us element ko access ni kar skte tou loginForm jab bhi access karo ga tou usse pta chal jaye ga iska ref hai
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
//import { Link } from 'react-router-dom';
//import MailOutlineIcon from '@material-ui/icons/MailOutline';
import  LockOpenIcon  from '@material-ui/icons/LockOpen';
//import FaceIcon from '@material-ui/icons/Face';
import {useDispatch,useSelector } from 'react-redux';
import {clearErrors , resetPassword } from "../../actions/userAction";        //ERROR loadUser is not defined   loaduser bhi ek api hai for /me  taake fresh data load ho
import { useAlert } from "react-alert";  //ye error ke liye jese galat email password diya tou wo
import { useNavigate } from 'react-router-dom';
//import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockIcon from "@material-ui/icons/Lock";
//import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const dispatch = useDispatch();    //ab socho useEffect tou import ni kiya useDispatch kaha callkare ge . Basically ye hame useEffect ni karna ye tab karna jab form submit ho  jaha console.log kiya waha dispatch karna
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();
    
    const token = params.token;
    
    //const { user} = useSelector(state => state.user);  //yaha user ka password thori show kare ge    //useSelector ka use Karke error ko pull karna hai lana hai
    const { error , success , loading }= useSelector( (state) => state.forgotPassword); //remember hum ne forgotPassword ke time pe naya reducer bna liya tha  //state . profile se laye ge ye state    ERROR error is not defined wo yaha se agya isUpdaed bhi

    //const [name, setName] = useState("");  //initial state user.name  ya ni useEffect men kar dete agar if user exist then setNAme
    //const [email, setEmail] = useState("");
    //const [avatar , setAvatar] = useState();
    //const [avatarPreview , setAvatarPreview] = useState("/Profile.png");      //public folder men pehle se he exist karti ye
    
    
    //const [oldPassword , setOldPassword] = useState("");   //ye useState hum value men dete input ki neeche 
    const [password , setPassword] = useState("");   //or set wala jo hai wo OnChange men input ke andar he
    const [confirmPassword , setConfirmPassword] = useState("");



    const resetPasswordSubmit = (e) => {
        e.preventDefault();              //event.preventDefault sab se pehle

        const myForm = new FormData();  //form ka data bna ke bheje ge pora
        
        //myForm.set("name" , name);    //ye sab cheezen oper useState ka use karke banaye ge   or aage dispatch kare ge
        //myForm.set("email" , email);
        
        //myForm.set("oldPassword", oldPassword);
        //myForm.set("avatar", avatar);
        //console.log("Sign Up Form Submitted");
        myForm.set("password", password);        //backend men userController men tou ye 3no chaheye updatePAssword men
        myForm.set("confirmPassword", confirmPassword);   
        dispatch(resetPassword(token , myForm));      
    }

    //const resetPasswordDataChange = (e) => {            //ye jo neeche sab men onChange men diya hai
        //if(e.target.name === 'avatar'){  //avatar wale ke liye bas alag tareke se handle karna baki sab ka ek tarah

      //      const reader = new FileReader(); //because file read karni hai
      //      reader.onload = () => {    //load hote readyState iski 3 state hoti hai  012 0=initial 1=processing 2=done done hojaye toy ye
      //          if (reader.readyState === 2) {
      //              setAvatarPreview(reader.result);
      //              setAvatar(reader.result);  //photo set hote avatar preview men set ho jani chaheye takke dikhti rhe
      //          }
      //      };
      //      reader.readAsDataURL(e.target.files[0]);  //pehle ye file add hogi phir oper wala laod kare ga   //0 index or save
      //  }
        //else{     //else ki yaha zarorat ni setUser liya he ni
        //    setUser( { ...user , [e.target.name] : e.target.value });   //user to hai he usme kia add krdo warna replace krdo  name or uska nam abisek rkh dega or email dhondhe ga phir uski value rakh dega
        //}
    



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
        if(success){ 
            alert.success("Password Updated Successfully");
            //dispatch(loadUser());   //taake fresh data load ho 
            navigate("/login")         //useEffect men he navigate karde ge jab redux men true ho jaye gi is Authenticated 
        
            //dispatch({
            //    type: UPDATE_PASSWORD_RESET,          //taake isUpdate false ho jaye  reducer men diya isUpdate false
            //});
        }

    }, [dispatch,error,alert,navigate , success])




  return (
    <Fragment>
            {loading ? <Loader/> : <Fragment>

<MetaData title="Fahad Change Password" />
<div className='resetPasswordContainer'>
<div className='resetPasswordBox'> 

<h2 className='resetPasswordHeading'>Update Profile</h2>
<form 
        className='resetPasswordForm'
        
        //encType='multipart/form-data'   //kyu ke iss form hum sirf text data ni bheje image bhi send kare ge user ki ye mandatoy
        onSubmit={resetPasswordSubmit}
    >

        
                

                    <div>
                        <LockOpenIcon />
                            <input 
                                type='password'
                                placeholder='New Password'
                                required
                                value={password}
                                onChange={ (e) => setPassword(e.target.value)}
                            />
                    </div>


                    <div className='loginPassword'>
                        <LockIcon />
                            <input 
                                type='password'
                                placeholder='Confirm Password'
                                required
                                value={confirmPassword}
                                onChange={ (e) => setConfirmPassword(e.target.value)}
                            />
                    </div>


        
        <input 
            type='submit'
            //value="Register"
            value="Update "
            //value="Change"
            className='resetPasswordBtn'
        />

    </form>

</div>
</div>        
</Fragment>
}
        </Fragment> 
  )
}

export default ResetPassword


