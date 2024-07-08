/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('jwt') && !!localStorage.getItem('userId');

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
