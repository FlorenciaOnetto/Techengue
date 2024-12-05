import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      });
      if (response.ok) {
        alert('Usuario registrado exitosamente');
        // Puedes redirigir al usuario a la página de login o inicio aquí si lo deseas
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
