import React, { useEffect, useState } from 'react';
import './PerfilUsuario.css';
import { useNavigate } from 'react-router-dom';

export default function PerfilUsuario() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mascotas, setMascotas] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) return;

            try {
                const response = await fetch('http://localhost:3000/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setNombre(data.nombre);
                    setEmail(data.email);
                } else {
                    console.error('Error al obtener el perfil del usuario');
                }
            } catch (error) {
                console.error('Error en la conexión con el servidor:', error);
            }
        };

        const fetchUserMascotas = async () => {
            const token = localStorage.getItem('token');

            if (!token) return;

            try {
                const response = await fetch('http://localhost:3000/mascotas/mis-mascotas', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setMascotas(data);
                } else {
                    console.error('Error al obtener las mascotas del usuario');
                }
            } catch (error) {
                console.error('Error en la conexión con el servidor:', error);
            }
        };

        fetchUserProfile();
        fetchUserMascotas();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdateProfile = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/auth/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, email })
            });

            if (response.ok) {
                setIsEditing(false);
                alert('Perfil actualizado exitosamente');
            } else {
                console.error('Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar tu cuenta?");
        if (!confirmDelete) return;

        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:3000/auth/profile', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Cuenta eliminada exitosamente');
                localStorage.removeItem('token');
                localStorage.removeItem('nombre');
                navigate('/login');
                window.location.reload();
            } else {
                console.error('Error al eliminar la cuenta');
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
        }
    };

    const handleDeleteMascota = async (id_mascota) => {
        const token = localStorage.getItem('token');
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta mascota?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/mascotas/${id_mascota}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMascotas(mascotas.filter(mascota => mascota.id_mascota !== id_mascota));
                alert("Mascota eliminada exitosamente.");
            } else {
                console.error("Error al eliminar la mascota.");
            }
        } catch (error) {
            console.error("Error en la conexión con el servidor:", error);
        }
    };

    const handleEditMascota = (id_mascota) => {
        navigate(`/perfilmascota/${id_mascota}`); // Redirigir a la página de edición de mascota
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <img src={defaultImage} alt="Foto de perfil" className="profile-image" />
                <h2>{nombre || 'Usuario'}</h2>
                <a href={`mailto:${email}`} className="profile-email">{email || 'Email no disponible'}</a>
                <div className="sidebar-buttons">
                    <button className="sidebar-button">Historial adopciones</button>
                    <button className="sidebar-button" onClick={() => navigate('/settings')}>Settings</button>
                </div>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                    Eliminar cuenta
                </button>
            </aside>

            <main className="main-content">
                <h1>Dashboard de Usuario</h1>
                <div className="info-sections">
                    <section className="info-card">
                        <h2>Información de perfil</h2>
                        {isEditing ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={nombre} 
                                    onChange={(e) => setNombre(e.target.value)} 
                                    placeholder="Nombre" 
                                />
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Email" 
                                />
                                <button onClick={handleUpdateProfile}>Actualizar</button>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Nombre:</strong> {nombre}</p>
                                <p><strong>Email:</strong> {email}</p>
                                <button className="sidebar-button" onClick={handleEdit}>Editar información</button>
                            </div>
                        )}
                    </section>

                    <section className="info-card">
                        <h2>Mascotas Publicadas</h2>
                        {mascotas.length > 0 ? (
                            <ul className="mascotas-list">
                                {mascotas.map((mascota) => (
                                    <li key={mascota.id_mascota} className="mascota-item">
                                        <img 
                                            src={`http://localhost:3000/uploads/${mascota.fotos}`} 
                                            alt={mascota.nombre} 
                                            className="mascota-image"
                                        />
                                        <div className="mascota-details">
                                            <p><strong>Nombre:</strong> {mascota.nombre}</p>
                                            <p><strong>Especie:</strong> {mascota.especie}</p>
                                            <p><strong>Raza:</strong> {mascota.raza}</p>
                                            <p><strong>Edad:</strong> {mascota.edad_aproximada} {mascota.edad_unidad}</p>
                                            <p><strong>Región:</strong> {mascota.region}</p>
                                            <button 
                                                className="edit-button" 
                                                onClick={() => handleEditMascota(mascota.id_mascota)}
                                            >
                                                Ver
                                            </button>
                                            <button 
                                                className="delete-button" 
                                                onClick={() => handleDeleteMascota(mascota.id_mascota)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tienes mascotas publicadas.</p>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
