import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Index from './pages/Index';
import Product from './components/ProductDetails'

export const urlBackend = 'https://my-industrial-home-back.herokuapp.com/api'
function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Index/> */}
      <Product />
      <Footer/>
      
    </div>
  );
}

export default App;
