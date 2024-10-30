import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí agregarías la lógica para enviar los datos al backend
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
        <p className="text-footer">
          ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link> {/* Usamos Link en lugar de a */}
        </p>
      </div>
    </div>
  );
}

export default Login;
