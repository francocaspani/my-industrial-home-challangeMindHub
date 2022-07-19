import React from 'react'
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

const Footer = () => {
  return (
    <div className='mainContainer'>
        <div>
            <p className='titleInput'>Newsletter</p>
            <Input width='480px' type={'email'} clearable placeholder="example@gmail.com" color='default' />
        </div>
        <div className='containerInfo'>
            <div className='everyContainer'>
                <h5 className='everyTitle'>Company</h5>
                <div className="infoFooter">
                    <a href='#'>About Us</a>
                    <a href='#'>Join our team</a>
                </div>
            </div>
            <div className='everyContainer'>
                <h5 className='everyTitle'>Contact</h5>
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
            <div className='everyContainer'>
                <h5 className='everyTitle'>Policies</h5>
                <div className='infoFooter'>
                    <a href='#'>Your Rights</a>
                    <a href='#'>About this Privacy policy</a>
                    <a href='#'>How do we use your personal data</a>
                    <a href='#'>Security and retention of your personal data</a>
                </div>
            </div>
        </div>
        
        <div className='containerFooter'>
            <p className='rights'>©️ My Industrial Home 2022</p>
            <div className='containerPayments'>
                <img className='everyImage' src={Visa} alt='visa' />
                <img className='everyImage' src={Paypal} alt='paypal'/>
                <img className='everyImage' src={Mastercard} alt='mastercard'/>
            </div>
            <div className='socialMedias'>
                <InstagramIcon className='icon' fontSize='large' sx={{color: "white"}}/>
                <FacebookIcon className='icon' fontSize='large' sx={{color: "white"}}/>
                <WhatsAppIcon className='whatsapp icon' fontSize='large' sx={{color: "white"}}/>
            </div>
        </div>
    </div>
  )
}

export default Footer