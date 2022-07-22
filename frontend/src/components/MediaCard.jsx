import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import productActions from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import "../styles/Card.css"
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import { useState } from 'react';

const style = { // estilo para la apertura de la imagen del producto desde la card
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "43vw",
  height: "55vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MediaCard({ product }) {

  const [open, setOpen] = React.useState(false); // variables para el modal
  const [productModel, setProductmodel] = React.useState([1])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const stock = [...Array(product.stock).keys()]

  const user=useSelector(store=>store.usersReducer.user) //defino user desde los reducers

  function selected(event) {
    //   console.log(event.target.value);
    setProductmodel(event.target.value);
  }
  
  //LIKE DISLIKE
  const dispatch = useDispatch()
  const [reload, setReload]=useState(false)
  
  async function likeOrDislike(idProduct){
      console.log(idProduct)
      const res=await dispatch(productActions.likeAndDislike(idProduct))
      // console.log(res.data.response)
      setReload(!reload)
  }
  console.log(product)
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="320"
          image={product.img}
          alt="product image"
        />
        <Typography component="div" sx={{width:"100%"}}>
          <CardActions className='buttonsCards' sx={{justifyContent:"center"}} >

            {/* BOTONES */}
            <Button sx={{size:"small",color:'#000000'}} className='buttonModal' onClick={handleOpen}>Quickshop</Button>
           {/* MODAL */}
            <Modal
              open={open}
              onClose={handleClose}
              >
              <Box sx={style} >
                <img className='imageModal' src={product.img} alt={product.name} />
                <Box sx={{ margin: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                  <Typography sx={{ fontSize: "2rem" }} gutterBottom variant="h4" component="div">
                    {product.name} {/*  name producto */}
                  </Typography>
                  <Typography className='modalPrice' gutterBottom variant="p">
                    ${product.price}
                  </Typography>
                  <Typography className='modalPrice' gutterBottom variant="p">
                    Size: {product.size}
                  </Typography>
                  <Typography className='modalPrice' gutterBottom variant="p">
                    {product.detail}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection:"row" }}>

                    <select className='selectModal' onChange={selected}>

                      {stock.map((stock, index) => (
                        <option key={index}>{stock + 1}</option>
                        ))}
                    </select>

                    <button className='buttonCarrito'>Go To Carrito</button>
                    <button className='buttonCarrito'>Add To Favorite</button>
                  </Box>
                  <button className='buttonCarrito'>Go To Details</button>
                </Box>
              </Box>
            </Modal>
            {/* Cierra el modal */}
                        
            <Button sx={{size:"small",color:'#000000'}}> 
            {/*boton */}
            {user ?
                       <> 
                         <Button  className="button-like" onClick={()=>likeOrDislike(product._id)} sx={{size:"small",color:'#000000'}}>
                              {product.likes?.includes(user.id) ? 
                              (<div style={{color:"red"}}>
                                  <FavoriteTwoToneIcon  id={product._id}/>
                              </div>) :
                              (<div  style={{color:"red"}}>
                                  <FavoriteTwoToneIcon id={product._id}/>
                              </div>)}
                              {product?.likes.length}
                         </Button>  
                         </>
                         : (
                          <Button className="buttonLike" sx={{size:"small",color:'#000000'}}>
                              <FavoriteTwoToneIcon id={product._id} sx={{cursor:'pointer'}}/>
                          </Button>
                         )   
                     }
            </Button>
            <Button sx={{size:"small",color:'#000000'}}> <LocalGroceryStoreTwoToneIcon /></Button>
            {/* cierra botones */}
          </CardActions>
          <CardContent className='ctnContent' sx={{display:"flex",flexDirection:"column",fontSize:"0.9rem"}}>
              <Typography sx={{fontSize:"1.250rem",display:"flex"}} gutterBottom variant="h4" component="div">
                {product.name} {/*  name producto */}
              </Typography>
              <Typography sx={{fontSize:"1.450rem",display:"flex"}} gutterBottom variant="p">
                    ${product.price}
                  </Typography>
            </CardContent>
        </Typography>
      </Card>
    </>
  );
}


