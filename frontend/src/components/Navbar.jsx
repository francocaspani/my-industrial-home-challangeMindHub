import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import '../styles/navbar.css'
import { Link as LinkRouter, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import productActions from '../redux/actions/productActions';
import basketActions from '../redux/actions/basketActions';
import usersActions from '../redux/actions/userActions';

export default function Navbar() {

  // const navigate = useNavigate()
  const [basketReload, setBasketReload] = useState(null)
  //const [basket, setBasket] = useState([])
  const dispatch = useDispatch();
  const user = useSelector(store => store.usersReducer.userData)
  const basket = useSelector(store => store.basketReducer.productsBasket)

  let subtotals = []
  if (basket) {
    (basket && basket?.map(product => {
      subtotals.push(product.productId.price * product.amount)
    }))
  }

  let subTotalBasket = 0;
  function addTotal() {
    for (let i = 0; i < subtotals.length; i++) {
      subTotalBasket = subtotals[i] + subTotalBasket;
    }
    return subTotalBasket;
  }
  addTotal()

  // const reload = ()=>{setBasketReload(!basketReload)}

  useEffect(() => {
    if (user) {
      dispatch(basketActions.getUserBasket())
    }
  }, [basketReload, user])

  async function deleteBasket(id) {
    const productId = id;
    await dispatch(basketActions.deleteBasketProduct(productId));
    setBasketReload(!basketReload)
  }

  const [search, setSearch] = React.useState(null);

  React.useEffect(() => {
    dispatch(productActions.filterProductsByName(search))
    setSearch(search)
  }, [search])

  const productsFiltered = useSelector(store => store.productsReducer.productsFiltered)
  const products = useSelector(store => store.productsReducer.products)

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const searcher = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="search-container">
        <input placeholder='Search by name' type="text" id="loginName" className="search-input" onKeyUp={(event) => { setSearch(event.target.value) }} />
      </div>
      <div className='drawer'>
        {
          (productsFiltered?.length < products.length) ? productsFiltered?.map(product => (
            <LinkRouter to={`/products/${product._id}`} className='linkRouter'>
              <div className='search-product' onClick={toggleDrawer(anchor, false)}>
                <img alt='img-search' className='img-search' src={product.img} />
                <p className='name-search'>{product.name}</p>
                <p className='price-search'>$ {product.price}</p>
              </div>
            </LinkRouter>
          )) : <p></p>
        }
      </div>
    </Box>
  )

  const basketDrawer = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='drawer-basket'>
        {
          (basket && basket.length !== 0) ? basket.map(product => (
            <div className='drawer-product'>
              <img alt='img-drawer' className='img-drawer' src={product.productId.img} />
              <div>
                <p className='name-drawer'>{product.productId.name}</p>
                <p className='price-drawer'>$ {product.productId.price} x {product.amount}</p>
              </div>
              <DeleteIcon onClick={() => deleteBasket(product._id)} />
            </div>
          ))

            : <p></p>
        }
        {
          (basket.length !== 0) ?
            (<div className='container-total-drawer'>
              <p>Total:</p>
              <p>${subTotalBasket}</p>
            </div>
            ) : <p className='empty'>Empty basket</p>
        }
        {
          (basket.length !== 0) ?
            (<div className='container-buttons'>
              <LinkRouter to='/basket' className='linkRouter' onClick={toggleDrawer(anchor, false)}>
                <div className='button-finish-drawer'>Proceed to checkout</div>
              </LinkRouter>
              <LinkRouter to='/products' className='linkRouter' onClick={toggleDrawer(anchor, false)}>
                <div className='button-finish-drawer'>Continue shopping</div>
              </LinkRouter>
            </div>
            ) : <p className='empty'></p>
        }

      </div>
    </Box>
  )

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{ to: '/', name: 'Home' }, { to: '/spaces', name: 'Spaces' }, { to: '/products', name: 'Products' }, { to: '/basket', name: 'Basket' }, { to: '/Favorites', name: 'Favs' }].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <LinkRouter className='links' to={text.to}>
                <ListItemText primary={text.name} />
              </LinkRouter>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>

        {!user ?
          
            <div>
              {[{ to: '/signin', name: 'Log-in' }, { to: '/signup', name: 'Sign-up' }].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <LinkRouter className='links' to={text.to}>
                      <ListItemText primary={text.name} />
                    </LinkRouter>
                  </ListItemButton>
                </ListItem>))}
            </div>
          
          :
          <>
            <div>
              <ListItem disablePadding>
                <ListItemButton>
                  <LinkRouter className='links' to="/index" onClick={() => {
                    dispatch(usersActions.logOutUser())
                  }}>
                    <ListItemText sx={{textDecoration:"none"}} primary="Log out" />
                  </LinkRouter>
                </ListItemButton>
              </ListItem>
            </div>
            {user.isAdmin ? 
              <div>
                  <LinkRouter className='links' to="/admin">
                  <ListItemButton>
                    <ListItemText sx={{textDecoration:"none"}} primary="Admin" />
                  </ListItemButton>
                  </LinkRouter>
              </div>
              :
                <></>
              }
            </>
        }
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      sx={{
        top:"50px",
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      {/* {console.log(user)} */}
      {!user ?
        <div>
            <LinkRouter className='links' to='/signin'>
              <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
            </LinkRouter>
            <LinkRouter className='links' to='/signup'>
              <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
            </LinkRouter>
          </div> 
        :
        <>
        <LinkRouter className='links' to="/index" onClick={() => {dispatch(usersActions.logOutUser())}}>
            <MenuItem>
              <Typography textAlign="center">Log Out</Typography>
            </MenuItem>
          </LinkRouter>
          {user.isAdmin ? 
        <div>
            <LinkRouter className='links'  to="/admin">
              <MenuItem>
                <Typography textAlign="center">Admin</Typography>
              </MenuItem>
            </LinkRouter>
        </div>
        :
          <></>
        }
          </>
          }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <LinkRouter to={'/basket'}>
              <ShoppingCartIcon />
            </LinkRouter>
          </Badge>
        </IconButton>
        <p>Basket</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={user?.favourite.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favs</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, zIndex: '1000' }}>
      <AppBar className='container-navbar' position="static">
        <Toolbar className='toolbar'>
          <Box className='ham-search'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer('top', true)}
            >
              <SearchIcon />
            </IconButton>
            <div>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button sx={{ display: 'none' }} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
            <div>
              {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button sx={{ display: 'none' }} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {searcher(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
            <div>
              {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button sx={{ display: 'none' }} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {basketDrawer(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </Box>
          <Box className='title'>
            <img alt='logo' className='logo' src='https://media.discordapp.net/attachments/998343174818889748/999050414328647870/MY-INDUSTRIAL-HOME-black.png' />
          </Box>
          <Box className='icons'>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={toggleDrawer('right', true)}>
                <Badge badgeContent={basket.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <LinkRouter to={"/Favorites"} >
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={user?.favourite.length} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </LinkRouter>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}



