import React from 'react'
import MediaCard from '../components/MediaCard';
import { useDispatch, useSelector } from 'react-redux';
import Noresults from '../components/Noresults';
import { useState, useEffect } from 'react';
import productActions from '../redux/actions/productActions';

function Products() {

  const [producto,setProducto] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productActions.getProducts()
    ).then(res => setProducto(res.data.response.products))
  }, [])


  return (
    <>
    <div className='ctnCard'>
    {producto?.length > 0 ? producto.map(product => <MediaCard  product={product} />) : (<Noresults/>)}
    </div>
    </>
  )
}

export default Products