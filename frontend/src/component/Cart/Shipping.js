import React, { Fragment, useState } from 'react'
import "./Shipping.css";
import {saveShippingInfo} from "../../actions/cartAction.js";      //if you rem isme data pass karna wo local storage men save ho jaye ga
import MetaData from '../layout/MetaData';
import PinDropIcon from '@material-ui/icons/PinDrop';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import PhoneIcon from '@material-ui/icons/Phone';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import {Country ,State} from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import CheckoutSteps from "../Cart/CheckoutSteps.js";

const Shipping = () => {

    

    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const alert = useAlert();
    const { shippingInfo } = useSelector( (state) => state.cart);    //cartReducer ke parameter men shipping info ni di wo ab di ek empty object bana diya waha

    const [address , setAddress] = useState(shippingInfo.address);
    const [city , setCity] = useState(shippingInfo.city);
    const [selectedState, setSelectedState] = useState(shippingInfo.state );
    const [country , setCountry] = useState(shippingInfo.country );
    const [pinCode , setPinCode] = useState(shippingInfo.pincode );
    const [phoneNo , setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {       //ab shipping info sari inspect men application men local storage men agyi hai
        e.preventDefault();

        if(phoneNo.length < 10 || phoneNo.length > 10){
            alert.error("Phone Number should be 10 digits long");
            return;
        }
        dispatch(
            saveShippingInfo({ address , city , selectedState , country , pinCode , phoneNo })       
        );
        naviagte("/order/confirm");
    };


  return (
    <Fragment>

        <MetaData title = "Shipping Details by Fahad"/>

        <CheckoutSteps activeStep={0} />

        <div className='shippingContainer'>
            
            <div className='shippingBox'>
                <h2 className='shippingHeading'> Shipping Details </h2>

                <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>

                    <div>
                        <HomeIcon/>
                        <input placeholder="Address" type="text" value={address} onChange={ (e) => setAddress(e.target.value) } />

                    </div>

                    <div>
                        <LocationCityIcon/>
                        <input placeholder="City" type="text" value={city} onChange={ (e) => setCity(e.target.value) } />
                        
                    </div>

                    <div>
                        <PinDropIcon/>
                        <input placeholder="Pin Code" type="number" value={pinCode} onChange={ (e) => setPinCode(e.target.value) } />
                        
                    </div>

                    <div>
                        <PhoneIcon/>
                        <input placeholder="Phone no" type="number" value={phoneNo} onChange={ (e) => setPhoneNo(e.target.value) } size = "10" />
                        
                    </div>

                    <div>
                        <PublicIcon/>
                        <select required value={country} onChange={ (e) => setCountry(e.target.value) } >
                            <option value=""> Country </option>
                            {
                                Country &&
                                    Country.getAllCountries().map( (item) => (
                                         <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                         </option>   
                                    )
                            )}
                        </select>    
                        
                    </div>

                    {
                        country && (
                            <div>
                                <TransferWithinAStationIcon />

                                <select required value={selectedState} onChange={ (e) => setSelectedState(e.target.value)}>
                                    <option value=""> State </option>
                                    {State &&
                                        State.getStatesOfCountry(country).map ( (state) => (
                                            <option key={state.isoCode} value={state.name} >
                                                {state.name}
                                            </option>
                                        )
                                    
                                    )}
                                </select>
                            </div>
                        )
                    }

                    <input type='submit' value="Continue" className='shippingBtn' disabled={selectedState ? false : true} />

                </form>
            </div>

        </div>

    </Fragment>
  )
}

export default Shipping