import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import "../styles/products.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link as LinkRouter } from "react-router-dom"
import usersActions from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import basketActions from '../redux/actions/basketActions';





const style = { // estilo para la apertura de la imagen del producto desde la card
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30rem",
  // height: "55vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MediaCard({ product, reload, keys }) {

  const [open, setOpen] = React.useState(false); // variables para el modal
  const [productModel, setProductmodel] = React.useState(1)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem('token')
  let stock;
  if (product.stock > 0) {
    stock = [...Array(product.stock).keys()]
  }
  const dispatch = useDispatch()
  const user = useSelector(store => store.usersReducer.userData)
  const basket = useSelector(store => store.basketReducer.productsBasket)
  const favsIds = user?.favourite.map(favId => favId._id)

  useEffect(() => {
    if (user) {
      dispatch(basketActions.getUserBasket())
    }
  }, [user])

  function selected(event) {
    setProductmodel(event.target.value);
  }
  const basketIds = basket.map(prod => prod.productId._id);

  const handleFavourite = async () => {

    if (user) {
      const res = await dispatch(usersActions.handleFavourites(product._id, token))
      toast(res.data.message, {
        theme: "dark",
        position: "bottom-left",
        autoClose: 4000,
      })
    } else {
      toast.error('Please log in to save this to your favourites', {
        theme: "dark",
        position: "bottom-left",
        autoClose: 4000,
      })
    }

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token')

      const verifyToken = async () => {
        const res = await dispatch(usersActions.verifyToken(token))
      }
      verifyToken()
    }
  }

  async function addBasket() {
    const productToAdd = {
      productId: product._id,
      amount: productModel,
      img: product.img,
      price: product.price,
      name: product.name
    }
    if (user) {
      dispatch(basketActions.addToBasket(productToAdd));
      reload()
    }
    else {
      let basketLocalStorage = JSON.parse(localStorage.getItem('basket')) || []

      basketLocalStorage.push(productToAdd)
      let basketLocalStorageJSON = JSON.stringify(basketLocalStorage)
      localStorage.setItem('basket', basketLocalStorageJSON)
    }
  }
  function basketAlert() {
    // if (res) {
    toast('This product is already in the basket', {
      theme: "dark",
      position: "bottom-left",
      autoClose: 4000,
    })
    // }
  }

const idFavorites = user?.favourite.map(favorite => favorite._id)
  return (
    <>
      <Card className='cardProducts' key={keys}>
        <div className='img-quick'>
          <LinkRouter style={{ textDecoration: 'none' }} to={`/products/${product._id}`}>
            <CardMedia
              component="img"
              height="320"
              image={product.img}
              alt="product image"
              className='img-c'
            />
          </LinkRouter>

          <Button sx={{ fontSize: ".8rem", color: 'white', }} className='quickShop-card' onClick={handleOpen}>Quickshop</Button>
        </div>
        <Typography component="div" sx={{ width: "100%" }}>
          <CardActions className='buttonsCards' sx={{ justifyContent: "center" }} >

            {/* BOTONES */}
            {/* MODAL */}
            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box sx={style}>
                <div className='flex-modal'>
                <img className='imageModal' src={product.img} alt={product.name} />
                <Box sx={{ margin: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                  <Typography sx={{ fontSize: "1.5rem" }} gutterBottom variant="h4" component="div">
                    {product.name} {/*  name producto */}
                  </Typography>
                  <Typography className='modalPrice' gutterBottom variant="p">
                    ${product.price} USD
                  </Typography>
                  <Typography className='modalSize' gutterBottom variant="p">
                    Size: {product.size}
                  </Typography>
                  <Typography className='modalSize' gutterBottom variant="p">
                    {product.detail}
                  </Typography>
                  <Box className='box-icons'>

                    <select className='selectModal' onChange={selected}>

                      {stock?.map((stock, index) => (
                        <option key={index}>{stock + 1}</option>
                      ))}
                    </select>
                    <div>
                    {
                      (favsIds?.includes(product._id)) ? (
                        <Button sx={{ size: "small", color: '#000000' }} ><FavoriteIcon /></Button>
                        ) : (
                          <Button sx={{ size: "small", color: '#000000' }} onClick={handleFavourite}> <FavoriteBorderIcon /></Button>
                      )
                    }
                      {(basketIds.includes(product._id)) ? (
                        <Button sx={{ size: "small", color: 'gray' }} onClick={basketAlert}> <AddShoppingCartIcon /></Button>
                      ) : (
                        <Button sx={{ size: "small", color: '#000000' }} onClick={addBasket}> <LocalGroceryStoreIcon /></Button>
                      )}
                    </div>

                    {/* {(basketIds.includes(product._id)) ? (
                      <Button sx={{ size: "small", color: 'gray' }} onClick={basketAlert}> <AddShoppingCartIcon /></Button>
                    ) : (
                      <Button sx={{ size: "small", color: '#000000' }} onClick={addBasket}> <LocalGroceryStoreTwoToneIcon /></Button>
                    )} */}
                      {/* <button className='buttonCarrito' onClick={addBasket}>Add to basket</button> */}
                      {/* <button className='buttonCarrito' onClick={handleFavourite}>Add To Favourites</button> */}
                    </Box>
                    <LinkRouter style={{ textDecoration: 'none' }} to={`/products/${product._id}`} >
                      <button className='buttonCarrito'>Go To Details</button>
                    </LinkRouter>

                  </Box>
                </div>
              </Box>
            </Modal>
            {/* Cierra el modal */}
              {/* {console.log(user)} */}

              {/* <div onClick={handleFavourite}> */}
                  {/* {idFavorites?.includes(product._id) ?
                    <Button style={{ "fontSize": 30,color:"black"}} className="material-icons corazon" onClick={handleFavourite}>
                      <FavoriteIcon/></Button>
                    :
                    <Button style={{ "fontSize": 30, color:"black"}} className="material-icons" onClick={handleFavourite}>
                      <FavoriteBorderIcon /></Button>} */}
                {/* </div> */}




            {/* <Button sx={{ size: "small", color: '#000000' }} onClick={handleFavourite}> <FavoriteTwoToneIcon /></Button> */}






            {/* <Button sx={{ size: "small", color: '#000000' }} onClick={handleFavourite}> <FavoriteTwoToneIcon /></Button>
            {(basketIds.includes(product._id)) ? (
              <Button sx={{ size: "small", color: 'gray' }} onClick={basketAlert}> <AddShoppingCartIcon /></Button>
            ) : (
              <Button sx={{ size: "small", color: '#000000' }} onClick={addBasket}> <LocalGroceryStoreTwoToneIcon /></Button>
            )} */}
            {/* cierra botones */}
          </CardActions>
          <div className='container-infoCard'>
            <CardContent className='ctnContent' sx={{ display: "flex", flexDirection: "column", fontSize: "0.9rem" }}>
              <Typography sx={{ fontSize: ".9rem", display: "flex" }} gutterBottom variant="h4" component="div">
                {product.name} {/*  name producto */}
              </Typography>
              <Typography sx={{ fontSize: ".9rem", display: "flex" }} gutterBottom variant="p">
                ${product.price} USD
              </Typography>
            </CardContent>
              {
                (favsIds?.includes(product._id)) ? (
                  <Button sx={{ size: "small", color: '#000000' }} onClick={handleFavourite}><FavoriteIcon /></Button>
                ) : (
                  <Button sx={{ size: "small", color: '#000000' }} onClick={handleFavourite}> <FavoriteBorderIcon /></Button>
                )
              }
              {(basketIds.includes(product._id)) ? (
                <Button sx={{ size: "small", color: 'gray' }} onClick={basketAlert}> <AddShoppingCartIcon /></Button>
              ) : (
                <Button sx={{ size: "small", color: '#000000' }} onClick={addBasket}> <LocalGroceryStoreIcon /></Button>
              )}
              {/* <LinkRouter style={{textDecoration: 'none'}} to={`/products/${product._id}`} >
                <button className='buttonCarrito'>Go To Details</button>
              </LinkRouter> */}
          </div>
        </Typography>
      </Card>
    </>
  );
}


