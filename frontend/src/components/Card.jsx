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

const style = { // estilo para la apertura de la imagen del producto desde la card
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
export default function MediaCard() {

    const [open, setOpen] = React.useState(false); // variables para el modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  return (
    <div className='ctnCard'>  
    <Card sx={{ maxWidth: 345}}>
      <CardMedia sx={{ zIndex: 'modal' }}
        component="img"
        height="220"
        image="https://i.imgur.com/Wqevhdk.jpg"
        alt="product image"
      />
      <CardContent className='ctnContent'>
        <Typography gutterBottom variant="h4" component="div"> 
          Lamp {/*  name producto */}     
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleOpen}>View</Button>
        <Modal
        open={open}
        onClose={handleClose}
       >
        <Box sx={style} >
        <img sx={{maxWidth: 200}} src="https://i.imgur.com/Wqevhdk.jpg" alt="product imagee" />
        </Box>
      </Modal>
        <Button size="small"> <FavoriteIcon/></Button>
        <Button size="small"> <ShoppingCartIcon/></Button>
      </CardActions>
    </Card>
  </div>
  );
}



