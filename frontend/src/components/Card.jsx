// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { useEffect } from 'react';


// const style = { // estilo para la apertura de la imagen del producto desde la card
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 450,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

// export default function MediaCard() {

//     const [open, setOpen] = React.useState(false); // variables para el modal
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);


//     const dispatch = useDispatch()

//     useEffect(()=>{
//       dispatch(productActions.getProducts()) 
//       // eslint-disable-next-line 
//     },[])

//      const oneProduct = useSelector(store => store.productReducers.products)
//      console.log(oneProduct);


//   return (
//     <div className='ctnCard'>  
//     <Card sx={{ maxWidth: 345}}>
//       <CardMedia sx={{ zIndex: 'modal' }}
//         component="img"
//         height="220"
//         image="https://i.imgur.com/Wqevhdk.jpg"
//         alt="product image"
//       />
//       <CardContent className='ctnContent'>
//         <Typography gutterBottom variant="h4" component="div"> 
//           Lamp {/*  name producto */}     
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button onClick={handleOpen}>View</Button>
//         <Modal
//         open={open}
//         onClose={handleClose}
//        >
//         <Box sx={style} >
//         <img sx={{maxWidth: 200}} src="https://i.imgur.com/Wqevhdk.jpg" alt="product imagee" />
//         </Box>
//       </Modal>
//         <Button size="small"> <FavoriteIcon/></Button>
//         <Button size="small"> <ShoppingCartIcon/></Button>
//       </CardActions>
//     </Card>
//   </div>
//   );
// }
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

export default function Card({ product }) {

  const [open, setOpen] = React.useState(false); // variables para el modal
  const [productModel, setProductmodel] = React.useState([1])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const stock = [...Array(product.stock).keys()]


  function selected(event) {
    //   console.log(event.target.value);
    setProductmodel(event.target.value);
}

  console.log(product)
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ zIndex: 'modal' }}
          component="img"
          height="220"
          image={product.img}
          alt="product image"
        />
        <CardContent className='ctnContent'>
          <Typography gutterBottom variant="h4" component="div">
            {product.name} {/*  name producto */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen}>Quickshop</Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style} >
              <img className='imageModal' src={product.img} alt="product imagee" />
              <Box sx={{ margin: "1rem" }}>
                <Typography sx={{ fontSize: "2rem" }} gutterBottom variant="h4" component="div">
                  {product.name} {/*  name producto */}
                </Typography>
                <Typography className='modalPrice' gutterBottom variant="p">
                  ${product.price}
                </Typography>
                <Typography className='modalPrice' gutterBottom variant="p">
                  Size: {product.size}
                </Typography>
                <Typography  className='modalPrice' gutterBottom variant="p">
                  {product.detail}
                </Typography>
                <Box sx={{display:"flex"}}>
                  
                  <select className='selectModal'  onChange={selected}> 

                  {stock.map((stock,index) =>(
                    <option key={index}>{stock+1}</option>
                    ))}
                  </select>

                <button className='buttonCarrito'>Go To Carrito</button>
                <button className='buttonCarrito'>Add To Favorite</button>
                </Box>
                <button className='buttonCarrito'>Go To Details</button>
              </Box>
            </Box>
          </Modal>
          <Button size="small"> <FavoriteIcon /></Button>
          <Button size="small"> <ShoppingCartIcon /></Button>
        </CardActions>
      </Card>
    </>
  );
}


