import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
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
import { Link as LinkRouter } from "react-router-dom"
import { useEffect } from 'react';
import productActions from '../redux/actions/productActions';

export default function Navbar() {

  const dispatch = useDispatch()

  const [search, setSearch] = React.useState(null);
  
  React.useEffect(()=> {
    dispatch(productActions.filterProductsByName(search))
    setSearch(search)
  }, [search])
  
  const products = useSelector(store => store.productsReducer.productsFiltered)

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
        <input placeholder='Search by name' type="text" id="loginName" className="search-input" onKeyUp={(event) => {setSearch(event.target.value)}} />
      </div>
      <div className='drawer'>
          {
            (products.length < 21) ? products.map(product => (
              <div className='search-product'>
                <img alt='img-search' className='img-search' src={product.img} />
                <p className='name-search'>{product.name}</p>
                <p className='price-search'>$ {product.price}</p>
              </div>
            )) : <p></p>
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
        {[{to: '/', name:'Home'}, {to: '/', name:'Spaces'}, {to: '/products', name:'Products'}, {to: '/', name:'Shop'}, {to: '/Favorites', name:'Favs'}].map((text, index) => (
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
        {[{to: '/signin', name:'Log-in'}, {to: '/signup', name:'Sign-up'}].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <LinkRouter className='links' to={text.to}>
                <ListItemText primary={text.name} />
              </LinkRouter>
            </ListItemButton>
          </ListItem>
        ))}
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
      <LinkRouter className='links' to='/signin'> 
      <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
      </LinkRouter>
      <LinkRouter className='links' to='/signup'> 
      <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
      </LinkRouter>
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
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Shop</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
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
    <Box  sx={{ flexGrow: 1, zIndex: '1000' }}>
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
                      <Button sx={{display: 'none'}} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
                      <Button sx={{display: 'none'}} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
            </Box>
            <Box className='title'>
                <img alt='logo' className='logo' src='https://media.discordapp.net/attachments/998343174818889748/999050414328647870/MY-INDUSTRIAL-HOME-black.png'/>
            </Box>
            <Box className='icons'>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                    </IconButton>
                    <LinkRouter to={"/Favorites"} >
                    <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    >
                    <Badge badgeContent={17} color="error">
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



