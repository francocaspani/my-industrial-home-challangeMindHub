import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Index from './pages/Index';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export const urlBackend = 'https://my-industrial-home-back.herokuapp.com/api'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Index/>
      <Footer/>
    </div>
  );
}

export default App;
