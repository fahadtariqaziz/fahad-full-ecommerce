import { ALL_PRODUCT_FAIL , ALL_PRODUCT_REQUEST , ALL_PRODUCT_SUCCESS, CLEAR_ERRORS ,PRODUCT_DETAILS_REQUEST ,PRODUCT_DETAILS_SUCCESS ,PRODUCT_DETAILS_FAIL} from '../constants/productConstants';

export const productReducer = ( state = { products : []} , action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            
            return{
                loading: true,  //request ke time pe loading true honi chaheye 
                products:[]                     // products ki array hogi uske andar neeche wali sari cheezen aye gi 
            };
        
            case ALL_PRODUCT_SUCCESS:
            
            return{
                loading: false,   
                products:action.payload.products,       //ye jo pehle wala product hai ye extension men nam aye ga   or payload.products ye backend se arha jo response men diya tha getProducts ke
                productsCount : action.payload.productCount,
                resultPerPage:action.payload.resultPerPage,
                //filteredProductsCount: action.payload.filteredProductsCount,
            };

            case ALL_PRODUCT_FAIL:
            
            return{
                loading: false,   
                error :action.payload,
            };

            case CLEAR_ERRORS:
            
            return{
                ...state,   
                error: null,
            };
     
        
    
        default:
            return state;
    }

};





export const productDetailsReducer = ( state = { product : {} } , action) => {   //jisme initial stage hogi product ka empty object

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            
            return{
                loading: true,  //request ke time pe loading true honi chaheye 
                //products:[]                     // products ki array hogi uske andar neeche wali sari cheezen aye gi 
            
                ...state,
            };
        
            case PRODUCT_DETAILS_SUCCESS:
            
            return{
                loading: false,   
                //products:action.payload.products,       //ye jo pehle wala product hai ye extension men nam aye ga   or payload.products ye backend se arha jo response men diya tha getProducts ke
                //productsCount : action.payload.productCount,
                product: action.payload.product,    //action ke time pe payload ni bhejna data bhejna woi particular .product karke bhi kar skte
            };

            case PRODUCT_DETAILS_FAIL:
            
            return{
                loading: false,   
                //error:action.payload,
                product: action.payload
            };

            case CLEAR_ERRORS:
            
            return{
                ...state,   
                error: null,
            };
     
        
    
        default:
            return state;              //ab isko store men add karte hen
    }

};