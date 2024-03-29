import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Index from './pages/Index';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignIn from '../src/components/SignIn'
import SignUp from '../src/components/SignUp'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ambientActions from '../src/redux/actions/ambientActions';
import productActions from './redux/actions/productActions';
import usersActions from './redux/actions/userActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Favorites from "./pages/Favorites"
import Policies from './pages/Policies';
import Product from './components/ProductDetails';
import Rooms from './pages/Rooms';
import Products from './pages/Products';
import Basket from './pages/Basket';
import Admin from './pages/Admin';
import ModifyProduct from './pages/ModifyProduct';
import ProductDetails from './components/ProductDetails';
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TyForBuy from './components/TyForBuy';
import basketActions from './redux/actions/basketActions';

export const urlBackend = 'https://my-industrial-home-back.herokuapp.com/api'
// export const urlBackend = 'http://localhost:4000/api'


function App(props) {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(store => store.usersReducer.userData)

  useEffect(() => {
    dispatch(ambientActions.getAmbients())
    dispatch(productActions.getProducts())

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token')

      const verifyToken = async () => {
        const res = await dispatch(usersActions.verifyToken(token))
        if (res) {

          toast(res.data.message, {
            theme: "dark",
            position: "bottom-left",
            autoClose: 4000,
          })
        }
      }
      verifyToken()
    }

    
  }, [])

  useEffect(() => {
    
    if (localStorage.getItem('basket') !== null) {
      let productLocal = JSON.parse(localStorage.getItem('basket'))
      if (user) {
        productLocal.map(product => {         
            dispatch(basketActions.addToBasket(product));
        })
        localStorage.removeItem('basket')
      }
    }
    
  }, [user])
  

  return (
    <div className="App">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path='/home' element={<Index />} />
        <Route path='/Favorites' element={<Favorites />} />
        <Route path='/' element={<Index />} />
        <Route path='/*' element={<Index />} />
        {!user && <Route path='/signin' element={<SignIn />} />}
        {!user && <Route path='/signup' element={<SignUp />} />}
        <Route path='/policies' element={<Policies />} />
        <Route path='/product' element={<Product />} />
        <Route path='/spaces' element={<Rooms />} />
        <Route path='/spaces/:id' element={<ProductDetails />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/products' element={<Products />} />
        <Route path='/basket' element={<Basket />} />
        {user?.isAdmin && <Route path='/admin' element={<Admin />} />}
        {user?.isAdmin && <Route path='/ModifyProduct/:id' element={<ModifyProduct />} />}
        <Route path='/thanks/:id' element={<TyForBuy />} />
      </Routes>
      <ScrollToTop
        style={{
          right: "10px",
          marginbottom: "80px",
          bottom: "100px",
        }}
        smooth
        component={<KeyboardArrowUpIcon />}
      />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
