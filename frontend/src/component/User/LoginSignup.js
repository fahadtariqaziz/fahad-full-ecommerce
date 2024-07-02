import React, { Fragment ,useState , useRef  , useEffect } from 'react'      //switcherTab or ref   react men seeedha DOM ke element ko use ni kar skte uske liye useRef use karte   iski jaga  document.querySelector(".loginForm") tou aese us element ko access ni kar skte tou loginForm jab bhi access karo ga tou usse pta chal jaye ga iska ref hai
import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader";
import { Link, redirect } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import  LockOpenIcon  from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';

import {useDispatch,useSelector } from 'react-redux';
import {clearErrors , login, register} from "../../actions/userAction"
import { useAlert } from "react-alert";  //ye error ke liye jese galat email password diya tou wo

import { useNavigate } from 'react-router-dom';

const LoginSignup = (location) => {

    const dispatch = useDispatch();    //ab socho useEffect tou import ni kiya useDispatch kaha callkare ge . Basically ye hame useEffect ni karna ye tab karna jab form submit ho  jaha console.log kiya waha dispatch karna
    const alert = useAlert();
    const navigate = useNavigate();

    const {error , loading , isAuthenticated} = useSelector(state => state.user);    //useSelector ka use Karke error ko pull karna hai lana hai

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);


    const [loginEmail , setLoginEmail] = useState("");
    const [loginPassword , setLoginPassword] = useState(""); 

    const [user, setUser] = useState({     //user ek object hai jisme ye teno chezen hen   or in teno ko alag se fetch karlen ge
        name: "",
        email : "",
        password : "",
    })

    const {name , email , password} = user;

    const [avatar , setAvatar] = useState();
    const [avatarPreview , setAvatarPreview] = useState("/Profile.png");      //public folder men pehle se he exist karti ye

    const loginSubmit = (e) => {               //form submit karne pe onSubmit
        //console.log("Login Form Submitted");
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();              //event.preventDefault sab se pehle

        const myForm = new FormData();  //form ka data bna ke bheje ge pora

        myForm.set("name" , name);    //ye sab cheezen oper useState ka use karke banaye ge   or aage dispatch kare ge
        myForm.set("email" , email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        //console.log("Sign Up Form Submitted");   
        dispatch(register(myForm));      
    }


    const registerDataChange = (e) => {            //ye jo neeche sab men onChange men diya hai
        if(e.target.name === 'avatar'){  //avatar wale ke liye bas alag tareke se handle karna baki sab ka ek tarah

            const reader = new FileReader(); //because file read karni hai
            reader.onload = () => {    //load hote readyState iski 3 state hoti hai  012 0=initial 1=processing 2=done done hojaye toy ye
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);  //photo set hote avatar preview men set ho jani chaheye takke dikhti rhe
                }
            };
            reader.readAsDataURL(e.target.files[0]);  //pehle ye file add hogi phir oper wala laod kare ga   //0 index or save
        }
        else{
            setUser( { ...user , [e.target.name] : e.target.value });   //user to hai he usme kia add krdo warna replace krdo  name or uska nam abisek rkh dega or email dhondhe ga phir uski value rakh dega
        }
    }



    //const redirect = location.search ? location.search.split("=")[1] :  "/account" // ab ye cart.js men checkout men dekhe ga = se pehle login baad men shipping hai [1] index pe /shipping call hoga [0] pe login 

    useEffect( () => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            navigate("/account")         //useEffect men he navigate karde ge jab redux men true ho jaye gi is Authenticated 
            //navigate(redirect);
            //if (isAuthenticated) {
            //    navigate("/shipping");
            //  } else {
            //    navigate("/login?redirect=shipping");
            //  }
        }

    }, [dispatch,error,alert,isAuthenticated,navigate ])



    const switchTabs = (e , tab) => {       //tab ke through  login or register ko access kar liya

        if( tab === "login"){    //agar tab ye hai tou ye wali cheeze render honi chaheye
            switcherTab.current.classList.add("shiftToNeutral");    //switcher tab ek button hai   jese koi login press kare ga iski position neutral karde ge or styling kar ge or shift to right wali class remover karde ge
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");        //remove karde ge shif to neutral form
            loginTab.current.classList.remove("shiftToLeft");
        }

        if( tab === "register"){    //agar tab ye hai tou ye wali cheeze render honi chaheye
            switcherTab.current.classList.add("shiftToRight");   // isme shift to right add kiya remove neutral basically left to right swap karne ke liye 
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");        //remove karde ge shif to neutral form
            loginTab.current.classList.add("shiftToLeft");
        }
    }


  return (
    <Fragment>
        {loading ? <Loader /> : <Fragment>
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                
                
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick = {(e) => switchTabs(e, "login")}> LOGIN </p>  
                        <p onClick= {(e) => switchTabs(e, "register")}> REGISTER</p>

                    </div>

                    <button ref={switcherTab}> </button>
                </div>



                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit} >
                    
                    <div className='loginEmail'>
                        <MailOutlineIcon />
                        <input 
                            type='email'
                            placeholder='Email'
                            value={loginEmail}
                            onChange = { (e) => setLoginEmail(e.target.value)}
                        />
                    </div>

                    <div className='loginPassword'>
                        <LockOpenIcon />
                            <input 
                                type='password'
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={ (e) => setLoginPassword(e.target.value)}
                            />
                    </div>

                    <Link to="/password/forgot"> Forgot Password ?</Link>
                    <input type='submit' value="Login" className='loginBtn' />

                </form>


                <form 
                    className='signUpForm'
                    ref={registerTab}
                    encType='multipart/form-data'   //kyu ke iss form hum sirf text data ni bheje image bhi send kare ge user ki ye mandatoy
                    onSubmit={registerSubmit}
                >

                    <div className='signUpName'>
                        <FaceIcon />
                        <input
                            type='text'
                            placeholder='Name'
                            required
                            name='name'
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>

                    <div className='signUpEmail'>
                        <MailOutlineIcon/>
                        <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={registerDataChange}
                        />
                    </div>

                    <div className='signUpPassword'>
                        <MailOutlineIcon/>
                        <input
                            type='password'
                            placeholder='Password'
                            required
                            name='password'
                            value={password}
                            onChange={registerDataChange}
                        />
                    </div>

                    <div id='updateProfileImage'>
                        <img src={avatarPreview} alt='Avatar Preview'/>
                        <input 
                            type='file'
                            name='avatar'
                            accept='image/*'       //koi bhu type ki image accept
                            onChange={registerDataChange}        //ye sab men ek he hai
                        />
                    </div>
                    
                    <input 
                        type='submit'
                        value="Register"
                        className='signUpBtn'
                    />

                </form>




            </div>

        </div>
    </Fragment>}
    </Fragment>
  );
}

export default LoginSignup