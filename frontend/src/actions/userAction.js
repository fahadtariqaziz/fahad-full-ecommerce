import { LOGIN_REQUEST , LOGIN_FAIL , LOGIN_SUCCESS , CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL} from "../constants/userConstants";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {          //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    try{
        dispatch( {type: LOGIN_REQUEST});

        const config = {headers : { "Content-Type" : "application/json" } };

        const {data} = await axios.post(`/api/v1/login`,{email,password},config);   //config kyu ke post request ye object hai jisme header set karna contentType
    
        dispatch( {type: LOGIN_SUCCESS, payload: data.user});
    }
    catch(error){
        dispatch( {type: LOGIN_FAIL , payload: error.response.data.message});
    }
};


export const register = (userData) => async (dispatch) => {    //ye userData loginSignup.js men myForm banaya usme user data bheja woi user data abhi yaha dispatch kare ge        //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    try{
        dispatch( {type: REGISTER_USER_REQUEST});

        const config = {headers : { "Content-Type" : "application/json" } };  //yehi application/json karna kyu ke image bhi include isme

        const {data} = await axios.post(`/api/v1/register`,userData,config);   //config kyu ke post request ye object hai jisme header set karna contentType
    
        dispatch( {type: REGISTER_USER_SUCCESS, payload: data.user});
    }
    catch(error){
        dispatch( {type: REGISTER_USER_FAIL , payload: error.response.data.message});
    }
};  //ab login ke sath he import karde ge loginSignup me or myForm men console ki jaga dispatch(register(myform)) dispatch register karde ge or user data hai myform     phir bhi register kare ge kuch ni hoga bec cloudinary ni add hui baackend men wo karte open server.js  install npm i express.fileupload cloudinary   tou req.file karke hum access kar skte usme help  karta  then connectDatabase ke baad likhna cloudinary.config men object banaye ge then signup for free unki main website se then dashboad men 3no object wali chezen ajaye gi name key secret wo san env men save karke config men process.env karke server men destructure import karke then bodyParser import fileUpload import then use in app.use then run server then userController men image upload karni usse pehle cloudinary import  then const mycloud usme avatae and options dene ke kidhr save karni then neeche avatar id men mycloud.public_id or url bhi isi tarah or cloudinary men folder bhi bnaya ho 



export const loadUser = () => async (dispatch) => {          //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    try{
        dispatch( {type: LOAD_USER_REQUEST});

        //const config = {headers : { "Content-Type" : "application/json" } };   // config ki isme zarorat ni  hai

        const {data} = await axios.get(`/api/v1/me`);   //me wohi get User Profile   backend men user route men bi yehi hai /me   //config kyu ke post request ye object hai jisme header set karna contentType
    
        dispatch( {type: LOAD_USER_SUCCESS, payload: data.user}); 
        }
    catch(error){
        dispatch( {type: LOAD_USER_FAIL , payload: error.response.data.message});
    }
};



export const logout = () => async (dispatch) => {          //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    try{
        //dispatch( {type: LOAD_USER_REQUEST});

        //const config = {headers : { "Content-Type" : "application/json" } };   // config ki isme zarorat ni  hai

        //const {data} = await axios.get(`/api/v1/me`);   //me wohi get User Profile   backend men user route men bi yehi hai /me   //config kyu ke post request ye object hai jisme header set karna contentType
    
        await axios.get(`/api/v1/logout`);

        dispatch( {type: LOGOUT_SUCCESS  });
    }
    catch(error){
        dispatch( {type: LOGOUT_FAIL ,payload: error.response.data.message });
    }
};



//edit profile ke liye register wale ko copy karlete iske he similar hoga


export const updateProfile = (userData) => async (dispatch) => {    //ye userData loginSignup.js men myForm banaya usme user data bheja woi user data abhi yaha dispatch kare ge        //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    try{
        dispatch( {type: UPDATE_PROFILE_REQUEST});

        const config = {headers : { "Content-Type" : "application/json" } };  //yehi application/json karna kyu ke image bhi include isme

        const {data} = await axios.put(`/api/v1/me/update`,userData,config); //backend se dekha put request   //config kyu ke post request ye object hai jisme header set karna contentType
    
        //dispatch( {type: UPDATE_PROFILE_SUCCESS, payload: data.user});     //ERROR loading men success wali cheezen he ni arahi isUpdated 
        dispatch( {type: UPDATE_PROFILE_SUCCESS, payload: data.success});   //success bec backend men userController men findByIdAndUpdate men return men success:true bhej rhe sath user ni bhej rhe only success:true
    
    }
    catch(error){
        dispatch( {type: UPDATE_PROFILE_FAIL , payload: error.response.data.message});
    }
};  //ab login ke sath he import karde ge loginSignup me or myForm men console ki jaga dispatch(register(myform)) dispatch register karde ge or user data hai myform     phir bhi register kare ge kuch ni hoga bec cloudinary ni add hui baackend men wo karte open server.js  install npm i express.fileupload cloudinary   tou req.file karke hum access kar skte usme help  karta  then connectDatabase ke baad likhna cloudinary.config men object banaye ge then signup for free unki main website se then dashboad men 3no object wali chezen ajaye gi name key secret wo san env men save karke config men process.env karke server men destructure import karke then bodyParser import fileUpload import then use in app.use then run server then userController men image upload karni usse pehle cloudinary import  then const mycloud usme avatae and options dene ke kidhr save karni then neeche avatar id men mycloud.public_id or url bhi isi tarah or cloudinary men folder bhi bnaya ho 




export const updatePassword = (passwords) => async (dispatch) => {    //ye userData loginSignup.js men myForm banaya usme user data bheja woi user data abhi yaha dispatch kare ge        //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    try{
        dispatch( {type: UPDATE_PASSWORD_REQUEST});

        const config = {headers : { "Content-Type" : "application/json" } };  //yehi application/json karna kyu ke image bhi include isme

        const {data} = await axios.put(`/api/v1/password/update`,passwords,config); //backend se dekha put request   //config kyu ke post request ye object hai jisme header set karna contentType
    
        //dispatch( {type: UPDATE_PROFILE_SUCCESS, payload: data.user});     //ERROR loading men success wali cheezen he ni arahi isUpdated 
        dispatch( {type: UPDATE_PASSWORD_SUCCESS, payload: data.success});   //success bec backend men userController men findByIdAndUpdate men return men success:true bhej rhe sath user ni bhej rhe only success:true
    
    }
    catch(error){
        dispatch( {type: UPDATE_PASSWORD_FAIL , payload: error.response.data.message});
    }
};  //ab login ke sath he import karde ge loginSignup me or myForm men console ki jaga dispatch(register(myform)) dispatch register karde ge or user data hai myform     phir bhi register kare ge kuch ni hoga bec cloudinary ni add hui baackend men wo karte open server.js  install npm i express.fileupload cloudinary   tou req.file karke hum access kar skte usme help  karta  then connectDatabase ke baad likhna cloudinary.config men object banaye ge then signup for free unki main website se then dashboad men 3no object wali chezen ajaye gi name key secret wo san env men save karke config men process.env karke server men destructure import karke then bodyParser import fileUpload import then use in app.use then run server then userController men image upload karni usse pehle cloudinary import  then const mycloud usme avatae and options dene ke kidhr save karni then neeche avatar id men mycloud.public_id or url bhi isi tarah or cloudinary men folder bhi bnaya ho 




export const forgotPassword = (email) => async (dispatch) => {          //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    try{
        dispatch( {type: FORGOT_PASSWORD_REQUEST});

        const config = {headers : { "Content-Type" : "application/json" } };

        const {data} = await axios.post(`/api/v1/password/forgot`,email,config);   //config kyu ke post request ye object hai jisme header set karna contentType
    
        dispatch( {type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
    }
    catch(error){
        dispatch( {type: FORGOT_PASSWORD_FAIL , payload: error.response.data.message});
    }
};




export const resetPassword = (token , password) => async (dispatch) => {          //ye bna ke kuch dikhe ga ni user men redux ke kyu ke abhi call ni kiya call kare ge LoginSignup.js men dispatch karke
    try{
        dispatch( {type: RESET_PASSWORD_REQUEST});

        const config = {headers : { "Content-Type" : "application/json" } };

        const {data} = await axios.put(`/api/v1/password/reset/${token}`,password,config);   //config kyu ke post request ye object hai jisme header set karna contentType
    
        dispatch( {type: RESET_PASSWORD_SUCCESS, payload: data.success});
    }
    catch(error){
        dispatch( {type: RESET_PASSWORD_FAIL , payload: error.response.data.message});
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS});
}
