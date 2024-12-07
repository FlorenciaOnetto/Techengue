import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Registro.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      });
      if (response.ok) {
        alert('Usuario registrado exitosamente');
        // Redirigir al login después de un registro exitoso
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(`Error en el registro: ${errorData.error || 'Inténtalo de nuevo'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2>Bienvenido a TailWaggers</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre</label>
            <input
              type="text"
              name="username"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
        <p className="text-footer">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;
