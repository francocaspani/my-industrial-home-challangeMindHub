import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'

export const urlBackend = 'https://my-industrial-home-back.herokuapp.com/api'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Footer/>
    </div>
  );
}

export default App;
