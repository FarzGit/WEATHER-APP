
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Resgister from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Favorites from './pages/favorites';


function App() {

  return (
    <>
      
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <Routes>
            <Route path="/register" element={<Resgister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favorites" element={<Favorites />} />

          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
