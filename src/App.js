import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Main } from './pages/Main';
import NotFound from './pages/NotFound';
import PrivateRouter from './pages/PrivateRouter';
import Register from './pages/Register';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
    <Route path='/' element={<PrivateRouter/>}>
      <Route path='' element={<Main/>}/>
    </Route>
    <Route path='*' element={<NotFound/>}/>
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
