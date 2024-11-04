import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const nombreGuardado = localStorage.getItem('nombre');
        if (nombreGuardado) {
            setNombre(nombreGuardado);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/ManoPerro.png" alt="Logo" className="logo" />
                <h1>TailWaggers</h1>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Pet Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="#guardians">Guardians</Link></li>
                <li><Link to="#featured">Featured</Link></li>
                <li><Link to="/perfilusuario">Perfil de Usuario</Link></li>
                {nombre && (
                  <Link to="/publicar-mascota" className="btn-publish">Publicar Mascota</Link>
                )}
            </ul>
            
            <div className="user-section">
                {nombre && <p className="user-greeting">Hola, {nombre}</p>}
                {nombre ? (
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
