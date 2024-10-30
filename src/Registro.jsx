import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom
import './Registro.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí agregarías la lógica para enviar los datos al backend
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Password:', password);
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
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link> {/* Usamos Link en lugar de a */}
        </p>
      </div>
    </div>
  );
}

export default Registro;
