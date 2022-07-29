import React from 'react'
import { useParams } from 'react-router-dom'
import Purchase from '../assets-icons/puchase.png'
import {Link as LinkRouter} from 'react-router-dom'

const TyForBuy = () => {
    const { id } = useParams()
    return (
        <div className='containerTyForBuy'>
            <div className='containerTitlesTyForBuy'>
                <h2>Thanks for your purchase!</h2>
                <p style={{marginTop: '1rem'}}>Your order confirmation is:  <b style={{letterSpacing: '.8px'}}>{id}</b></p>
            </div>
            <div className='containerTitlesTyForBuy'>
                <p>Will be send you an email with the details of your purchase. If you don`t receive it check your spam.</p>
            </div>
            <div>
                <img className='imgTyForBuy' src={Purchase} alt="ds" />
            </div>
            <LinkRouter className='ctaShop' to={'/products'}>
                <p>Continue shopping</p>
            </LinkRouter>
        </div>
    )
}

export default TyForBuy