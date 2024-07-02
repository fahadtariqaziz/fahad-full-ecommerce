import React, { Fragment , useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import "./myOrders.css";
import { useSelector , useDispatch} from "react-redux";
import {clearErrors , myOrders} from "../../actions/orderAction";
import Loader from '../layout/Loader/Loader';
import {Link} from "react-router-dom";
import { useAlert } from 'react-alert';
import Typography from "@material-ui/core/Typography";
import MetaData from '../layout/MetaData';
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {


    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading ,error , orders} = useSelector( (state) => state.myOrders);
    const {user} = useSelector( (state) => state.user);

    

    const columns = [         //mongodb men hamen model bnana parta ke pehle object kia hoga dusra kia hoa lets say 1st men id 2nd men name 3rd men class
        {
            field : "id" ,
            headerName : "Order ID",
            minWidth : 300,
            flex : 1,
        } , 
        {
            field : "status" ,
            headerName : "Status",
            minWidth : 150,
            flex : 0.5,
            //cellClassName:"redColor",
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";    //ab status ki value mil jaye gi

            }
        } , 
        {
            field : "itemsQty" ,
            headerName : "Items Qty",
            type: "number",
            minWidth : 150,
            flex : 0.3,
        } ,
        {
            field : "amount" ,
            headerName : "Amount",
            type: "number",
            minWidth : 150,
            flex : 0.5,
        } ,
        {
            field :"actions",
            flex : 0.3,
            headerName : "Actions",
            minWidth: 150,
            type: "number",   //number right side pe align hoke arhe table men
            sortable: false,
            renderCell: (params) => {       //ye bhi ek property jese oper wali ye isme html element use kar skte ek specific order ko kholne ke liye hai ye details nazar aye gi
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon/>
                    </Link>
                );
            }
        }
    ];
    const rows = [           //row men column ki values aye ge

    ];   


    orders && 
    orders.forEach( (item , index) => {
        rows.push({
            id: item._id, // Assuming your order object has an _id property
            status: item.orderStatus,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
        });
    });




    useEffect( () => {      //error ke liye useEffect

        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());      //ye function bhi dispatch karna actions se aya tha

    },[dispatch , alert , error]);


  return (
    <Fragment>
        <MetaData title={`${user.name} - Orders`} />

        {loading ? (
            <Loader/>
        ): (
            <div className='myOrdersPage'>  
                <DataGrid          //isme rows or columns dene hote hen 
                    rows = {rows}
                    columns = {columns}
                    pageSize={10}
                    disableSelectionOnClick     //other wise koi bhi select kar skta kisi bhi table ke cell ko choose karke 
                    className = "myOrdersTable"
                    autoHeight          //taake khudi table height select karle

                />

                <Typography id="myOrdersHeading"> {user.name}'s Orders </Typography>


            </div>
        )
        
        }
    </Fragment>
  )
}

export default MyOrders