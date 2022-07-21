import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Index from './pages/Index';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignIn from '../src/components/SignIn'
import SignUp from '../src/components/SignUp'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ambientActions from '../src/redux/actions/ambientActions'
import productActions from './redux/actions/productActions'
import usersActions from './redux/actions/userActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Favorites from "./pages/Favorites"
import Policies from './pages/Policies';
import Product from './components/ProductDetails';

export const urlBackend = 'https://my-industrial-home-back.herokuapp.com/api'
//export const urlBackend = 'http://localhost:4000/api'


function App() {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ambientActions.getAmbients())
    dispatch(productActions.getProducts())

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token')

      const verifyToken = async () => {
        const res = await dispatch(usersActions.verifyToken(token))
        console.log(res)
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
  
  // useEffect(()=>{
  //   dispatch(productActions.getProducts()) 
  //   // eslint-disable-next-line 
  // },[])

  return (
    <div className="App">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path='/home' element={<Index />} />
        <Route path='/Favorites' element={<Favorites />} />
        <Route path='/' element={<Index />} />
        <Route path='/*' element={<Index />} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/policies' element={<Policies/>}/>
        <Route path='/product' element={<Product/>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
