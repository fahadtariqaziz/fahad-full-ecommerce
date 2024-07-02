import axios from "axios";

import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,CLEAR_ERRORS , PRODUCT_DETAILS_REQUEST , PRODUCT_DETAILS_SUCCESS ,PRODUCT_DETAILS_FAIL} from "../constants/productConstants";


export const getProduct = (keyword = "" , currentPage = 1 , price=[0,250000] , category , ratings = 0) => //price ki bydefault value  //jiski by default value 1 he hai agar ni bheja koi 
    async (dispatch) =>{        //async function banaye ge

    try{

        dispatch({type : ALL_PRODUCT_REQUEST});         //try men bhi sab se pehle dispatch kare ge dispatch like useDispatch state ko change kar skte
    
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`; //[1] ka matlb 25000
        
        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        
        const {data} = await axios.get(link);   //ye request is tarah kaam kare gi ke backend ka server chalaye ge node server.js  ye 3000 port pe front end 4000 port pe  uske liye package.json men proxy add karden ge then isko test karo ga tou kuch ni pta lage ga bcz action bna liya reducer bna liya or isko trigger karna wo nae bataya wo Home wali file import getProdcut //ye chota postman hai   productRoutes.js men  getAllProducts ka tha /products
        

        dispatch({     //tou jab oper se data mil jaye ga tou kare ge all product success  or  payload men pora data he bhejna hai kyu ke productReducer men khudi access karhre payload  action.payload.products  karke  or productsCount karke    kyu ke    productController.js backend men dekhe tou product men hum bhej rhe hain response men success true  products  or productCount ni bhej rhe wo bhi bhej dete

            type : ALL_PRODUCT_SUCCESS,
            payload : data,   //kyu ke productReducer men iski cheezen likh di
        })
    }
    catch (error)
    {
        dispatch({
            type : ALL_PRODUCT_FAIL,      //type fail men hum ne diya loading false  or error = action.payload
            payload :error.response.data.message,     //khudi samjh ajaye gi kia kar rhe payload men error bhej den ge
        })
    }
}


//clear all errors ka alag se bna dein ge

export const clearErrors = () => async (dispatch) =>{

    dispatch({type: CLEAR_ERRORS});  //isme simply dispatch karden ge type clear Errors    ye Clear error ko kuch chahey tou hai ni productReducer men jo state men hai wohi return karde ga     errors ko null kardega  is kaam aye ga

};







//oper wale function ko he copy karlia jese reducer men kiya tha
export const getProductDetails = (id) => async (dispatch) =>{        //async function banaye ge

    try{

        dispatch({type : PRODUCT_DETAILS_REQUEST});         //try men bhi sab se pehle dispatch kare ge dispatch like useDispatch state ko change kar skte
    
        const {data} = await axios.get(`/api/v1/product/${id}`)  //id aese aye gi ke oper pass kardenge parameter men   //ye request is tarah kaam kare gi ke backend ka server chalaye ge node server.js  ye 3000 port pe front end 4000 port pe  uske liye package.json men proxy add karden ge then isko test karo ga tou kuch ni pta lage ga bcz action bna liya reducer bna liya or isko trigger karna wo nae bataya wo Home wali file import getProdcut //ye chota postman hai   productRoutes.js men  getAllProducts ka tha /products
    
        dispatch({     //tou jab oper se data mil jaye ga tou kare ge all product success  or  payload men pora data he bhejna hai kyu ke productReducer men khudi access karhre payload  action.payload.products  karke  or productsCount karke    kyu ke    productController.js backend men dekhe tou product men hum bhej rhe hain response men success true  products  or productCount ni bhej rhe wo bhi bhej dete

            type : PRODUCT_DETAILS_SUCCESS,
            //payload : data,   //kyu ke productReducer men iski cheezen likh di
            payload: data, //kyu waha reducer men khali action.payload kiya tha tou .product yaha daal diya 
        })
    }
    catch (error)
    {
        dispatch({
            type : PRODUCT_DETAILS_FAIL,      //type fail men hum ne diya loading false  or error = action.payload
            payload :error.response.data.message,     //khudi samjh ajaye gi kia kar rhe payload men error bhej den ge
        })
    }
}             //ab extension men tou ajaye gi lakin kabhi call he ni kiya tou kaise kuch aye ga usme tou alag page alag component banate   usme getProductDetails call kare ge    then    useSelector use karke data ko page pe load kare ge
