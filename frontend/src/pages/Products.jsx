import React from 'react'
import MediaCard from '../components/MediaCard';
import { useDispatch, useSelector } from 'react-redux';
import Noresults from '../components/Noresults';
import { useState, useEffect } from 'react';
import productActions from '../redux/actions/productActions';
import basketActions from '../redux/actions/basketActions';


function Products() {
  const [basket, setBasket] = useState(false)
  const [producto,setProducto] = useState()
  const dispatch = useDispatch()
  const user = useSelector(store => store.usersReducer.userData)
  useEffect(() => {
    dispatch(productActions.getProducts()
    ).then(res => setProducto(res.data.response.products))
  }, [])

  useEffect(() => {
    if (user) {
        dispatch(basketActions.getUserBasket())
    }
}, [basket])

const reload = () => {setBasket(!basket)}
  
  return (
    <>
    <div className='ctnCard'>
    {producto?.length > 0 ? producto.map(product => <MediaCard  product={product} reload ={reload}/>) : (<Noresults/>)}
    </div>
    </>
  )
}

export default Products