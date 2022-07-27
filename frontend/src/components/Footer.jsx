import React, { useState, useEffect } from 'react'
import { Input } from "@nextui-org/react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Visa from '../assets-icons/visa.png'
import Paypal from '../assets-icons/paypal.png'
import Mastercard from '../assets-icons/mastercard.png'
import '../styles/Footer.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {Link as LinkRouter} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import usersActions from '../redux/actions/userActions';

const Footer = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [reload, setReload] = useState(false);

    function sendNewsletter() {
        dispatch(usersActions.sendNewsletter(email))
        setEmail("")
    };

    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendNewsletter();
        setReload(!reload)
      }
    };

  return (
    <div className='mainContainerFooter'>
        <div className='containerInputFooter'>
            <p className='titleInputFooter'>Newsletter</p>
            <Input width='480px' size='sm' onChange={(e)=>setEmail(e.target.value)} onKeyDown={keyDownHandler} type={'email'} clearable placeholder="example@gmail.com" color='default' className='inputSearchFooter' />
        </div>
        <div className='containerInfoFooter'>
            <div className='everyContainerFooter companyContainerFooter'>
                <h5 className='everyTitleFooter'>Company</h5>
                <div className="infoFooter">
                    <LinkRouter className='infoFooter' to={'/policies'}>
                        <p href='#'>About Us</p>
                    </LinkRouter>
                </div>
            </div>
            <div className='everyContainerFooter contactContainer'>
                <h5 className='everyTitleFooter'>Contact</h5>
                <div className='infoContact'>
                    <LocationOnIcon/>
                    <p href='#'> </p>
                </div>
                <div className='infoContact'>
                    <InboxIcon/>
                    <p>myindustrialh@gmail.com</p>
                </div>
                <div className='infoContact'>
                    <LocalPhoneIcon/>
                    <p>222222222</p>
                </div>
            </div>
            <div className='everyContainerFooter'>
                <h5 className='everyTitleFooter'>Policies</h5>
                <div>
                    <LinkRouter className='infoFooter' to={'/policies'}>
                        <p>Your Rights</p>
                        <LinkRouter to='/policies' className='no-link'>
                            <p>About this Privacy policy</p>
                        </LinkRouter>
                        {/* <p>How do we use your personal data</p>
                        <p>Security and retention of your personal data</p> */}
                    </LinkRouter>
                </div>
            </div>
        </div>
        
        <div className='containerFooter'>
            <p className='rights'>©️ My Industrial Home 2022</p>
            <div className='containerPayments'>
                <img className='everyImageFooter' src={Visa} alt='visa' />
                <img className='everyImageFooter' src={Paypal} alt='paypal'/>
                <img className='everyImageFooter' src={Mastercard} alt='mastercard'/>
            </div>
            <div className='socialMediasFooter'>
                <InstagramIcon className='icon' fontSize='large' sx={{color: "white"}}/>
                <FacebookIcon className='icon' fontSize='large' sx={{color: "white"}}/>
                <WhatsAppIcon className='whatsapp icon' fontSize='large' sx={{color: "white"}}/>
            </div>
        </div>
    </div>
  )
}

export default Footer