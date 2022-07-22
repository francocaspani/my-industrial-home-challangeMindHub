import React from 'react'
import "../styles/BoxInfomation.css";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LockIcon from '@mui/icons-material/Lock';

export default function BoxInformation() {
    return (
        
        <div className='containerBoxInfomation'>
            <div className='containerAutorenewIcon'>
                <AutorenewIcon className='autorenewIcon'/>
                <p className='txtautorenewIcon'>RETURN POLICY</p>
            </div>
            <div className='containerlocalShippingIcon'>
                <LocalShippingIcon className='localShippingIcon'/>
                <div className='containertxtLocalShippingIcon'>
                    <p className='txtlocalShippingIcon'>FREE SHIPPING</p>
                    <p className='txtlocalShippingIcon'>STARTING AT $29,99</p>
                </div>
            </div>
            <div className='containerLockIcon'>
                <LockIcon className='lockIcon'/>
                <p className='txtlockIcon'>100% SECURE PAYMENT</p>

            </div>
        </div>
        
    )
}