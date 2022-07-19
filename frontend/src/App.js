import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Card from "./components/Card"
import "./styles/Card.css"

export const urlBackend = 'https://my-industrial-home-back.herokuapp.com/api'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Card/>
    </div>
  );
}

export default App;
