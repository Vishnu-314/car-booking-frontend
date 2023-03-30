import './App.css';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {

  return (
    <>
        <BrowserRouter>
          <Navbar />

          <div className='container'>
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
    </>
  );
}

export default App;
