import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();

    // Función para actualizar el estado del usuario
    const updateUser = () => {
        const token = localStorage.getItem('token');
        const nombreGuardado = localStorage.getItem('nombre');
        if (token && nombreGuardado) {
            setNombre(nombreGuardado);
        } else {
            setNombre('');
        }
    };

    // useEffect inicial para cargar el usuario
    useEffect(() => {
        updateUser();
    }, []);

    // Listener de cambios en localStorage
    useEffect(() => {
        window.addEventListener('storage', updateUser);
        return () => {
            window.removeEventListener('storage', updateUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        localStorage.removeItem('userId');
        setNombre(''); // Actualizar el estado manualmente al cerrar sesión
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/ManoPerro.png" alt="Logo" className="logo" />
                <h1>TailWaggers</h1>
            </div>
            <ul className="navbar-links">
                <li><Link to="/inicio">Inicio</Link></li>
                {/* Mostrar "Perfil de Usuario" solo si hay un nombre guardado */}
                {nombre && <li><Link to="/perfilusuario">Perfil de Usuario</Link></li>}
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