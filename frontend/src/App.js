import './App.css';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      {/* <SignUp/> */}
      <SignIn/>
      {/* <Navbar/>
      <Index/> */}
    </div>
  );
}

export default App;
