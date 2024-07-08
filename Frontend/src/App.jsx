
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Resgister from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Favorites from './pages/favorites';
import PrivateRoute from './privateRoute';


function App() {

  return (
    <>
      
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <Routes>
            <Route path="/register" element={<Resgister />} />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              } />
            <Route path="/favorites" element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
              } />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
