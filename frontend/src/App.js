import './App.css';
import Navbar from './components/Navbar'

export const urlBackend = 'https://my-industrial-home-back.herokuapp.com/api'
function App() {
  return (
    <div className="App">
      <Navbar/>
    </div>
  );
}

export default App;
