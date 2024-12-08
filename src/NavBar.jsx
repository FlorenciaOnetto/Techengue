import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const [nombre, setNombre] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Nuevo estado para verificar si está autenticado
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Hacer una solicitud al backend para obtener el perfil del usuario
                    const response = await fetch(`${backendUrl}/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (response.ok) {
                        // Si la respuesta es exitosa (200), el token es válido
                        const data = await response.json();
                        // Verificar que los datos del usuario estén presentes
                        if (data.id_usuario && data.nombre) {
                            setIsAuthenticated(true);
                            setNombre(data.nombre);  // Puedes establecer el nombre del usuario desde la respuesta
                        } else {
                            setIsAuthenticated(false);
                        }
                    } else {
                        // Si la respuesta no es exitosa (401 o 404), el token no es válido
                        localStorage.removeItem('token');
                        localStorage.removeItem('nombre');
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Error al verificar el token:', error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        validateToken();

        // Listener para cambios en localStorage (por si el token se actualiza)
        window.addEventListener('storage', validateToken);

        return () => {
            window.removeEventListener('storage', validateToken);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        localStorage.removeItem('userId');
        setIsAuthenticated(false); // Cambiar el estado de autenticación
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
                <li><Link to="/inicio">Inicio</Link></li>
                {/* Mostrar "Perfil de Usuario" solo si está autenticado */}
                {isAuthenticated && <li><Link to="/perfilusuario">Perfil de Usuario</Link></li>}
                {isAuthenticated && (
                    <Link to="/publicar-mascota" className="btn-publish">Publicar Mascota</Link>
                )}
            </ul>
            
            <div className="user-section">
                {isAuthenticated && <p className="user-greeting">Hola, {nombre}</p>}
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
