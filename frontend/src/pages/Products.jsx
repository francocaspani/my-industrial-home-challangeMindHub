import React from 'react'
import MediaCard from '../components/MediaCard';
import { useDispatch, useSelector } from 'react-redux';
import Noresults from '../components/Noresults';
import { useState, useEffect } from 'react';
import productActions from '../redux/actions/productActions';

// filter
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MediCard from '../components/Noresults';


import "../styles/products.css"


function Products() {

  let check = []
  let checkBoxSelected = []
  const [productFilter,setproductFilter] = useState([])
  const dispatch = useDispatch()
  


  // useEffect(() => {
  //   dispatch(productActions.filterProductByRoom(productFilter)
  //   )
  // }, [productFilter])
  
const allProduct = useSelector(store => store.productsReducer.products)

  const producto = useSelector(store => store.productsReducer.productfilteredbyroom)

  console.log(producto)

  // let checkBoxSelected = []

const handlenRoomfilter = (event)  =>{
  console.log(event)
  if(event.target.checked){
   checkBoxSelected.push(event.target.value) 
  
  }else{
    const index = checkBoxSelected.indexOf(event.target.value) 
    checkBoxSelected.splice(index,1)
    

    // checkBoxSelected.filter(check => check !== event.target.value)
    setproductFilter(checkBoxSelected)
  }
  const res = dispatch(productActions.filterProductByRoom(checkBoxSelected))
  console.log(checkBoxSelected)
}

  return (
    <>
    <div className='containerCards'>
    <Accordion sx={{width:"70vw"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormGroup sx={{display:"flex",flexDirection:"row"}}>
            <FormControlLabel control={<Checkbox/>} label="exterior" onChange={handlenRoomfilter} value="exterior" />
            <FormControlLabel control={<Checkbox/>} label="bedroom" onChange={handlenRoomfilter} value="bedroom" />
            <FormControlLabel control={<Checkbox/>} label="kitchen" onChange={handlenRoomfilter} value="kitchen" />
            <FormControlLabel control={<Checkbox/>} label="living" onChange={handlenRoomfilter} value="living" />
            <FormControlLabel control={<Checkbox/>} label="bathroom" onChange={handlenRoomfilter} value="bathroom" />
            </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
    <div className='ctnCard'>
    {producto?.length > 0 ? producto.map(product => <MediaCard  product={product} key={product._id} />) : allProduct.map( product => <MediaCard  product={product} key={product._id}/>)}
    </div>
          </div>
    </>
  )
}

export default Products