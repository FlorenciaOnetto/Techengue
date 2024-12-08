import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        localStorage.removeItem('userId');
        navigate('/login');
        window.location.reload();
    };

    const nombre = localStorage.getItem('nombre'); // Usamos el nombre guardado en localStorage

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/ManoPerro.png" alt="Logo" className="logo" />
                <h1>TailWaggers</h1>
            </div>
            <ul className="navbar-links">
                <li><Link to="/inicio">Inicio</Link></li>
                {/* Mostrar "Perfil de Usuario" solo si está autenticado */}
                {isAuthenticated && nombre && <li><Link to="/perfilusuario">Perfil de Usuario</Link></li>}
                {isAuthenticated && nombre && (
                  <Link to="/publicar-mascota" className="btn-publish">Publicar Mascota</Link>
                )}
            </ul>
            
            <div className="user-section">
                {isAuthenticated && nombre && <p className="user-greeting">Hola, {nombre}</p>}
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
                ) : (
                    <>
                        <Link to="/registro" className="joinBtn">Registrarse</Link>
                        <Link to="/login" className="loginBtn">Log in</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
