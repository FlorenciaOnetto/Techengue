import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const userId = localStorage.getItem('userId'); // Obtener el userId de localStorage
  
  // Si no hay userId, redirige a /login
  if (!userId) {
    return <Navigate to="/login" />;
  }

  // Si hay userId, muestra el componente protegido
  return <Element />;
};

export default PrivateRoute;
