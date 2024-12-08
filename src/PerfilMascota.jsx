import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PerfilMascota.css';

export default function PerfilMascota() {
    const { idMascota } = useParams();
    const [mascota, setMascota] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [solicitudes, setSolicitudes] = useState([]);
    const [showSolicitudes, setShowSolicitudes] = useState(false);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchMascota = async () => { 
            try {
                const response = await fetch(`${backendUrl}/mascotas/${idMascota}`);
                if (!response.ok) throw new Error('Error al cargar la mascota');
                
                const data = await response.json();
                setMascota(data);

                const token = localStorage.getItem('token');
                if (token) {
                    const userData = JSON.parse(atob(token.split('.')[1]));
                    if (data.id_usuario === userData.id_usuario) {
                        setIsOwner(true);
                    } 
                }
            } catch (error) {
                console.error("Error al cargar la mascota:", error);
            }
        };

        fetchMascota();
    }, [idMascota]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirmChanges = async () => {
        const confirm = window.confirm("¿Estás seguro que deseas confirmar los cambios?");
        if (!confirm) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${backendUrl}/mascotas/${mascota.id_mascota}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mascota)
            });

            if (response.ok) {
                const updatedMascota = await response.json();
                setMascota(updatedMascota);
                setIsEditing(false);
                alert("Cambios guardados exitosamente.");
                navigate('/perfilusuario');
            } else {
                console.error("Error al actualizar la mascota.");
                alert("No se pudo actualizar la mascota.");
            }
        } catch (error) {
            console.error("Error en la conexión con el servidor:", error);
            alert("Hubo un problema con la conexión.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMascota({
            ...mascota,
            [name]: value,
        });
    };

    const handleViewSolicitudes = async () => {
        try {
            const response = await fetch(`${backendUrl}/solicitudes/mascota/${idMascota}`);
            if (!response.ok) throw new Error('Error al obtener solicitudes');

            const data = await response.json();
            setSolicitudes(Array.isArray(data) ? data : []);
            setShowSolicitudes(true);
        } catch (error) {
            console.error("Error al obtener solicitudes:", error);
            alert("Hubo un problema al cargar las solicitudes.");
        }
    };

    const handleSolicitudDecision = async (solicitudId, decision) => {
        try {
            const response = await fetch(`${backendUrl}/solicitudes/${solicitudId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: decision })
            });
    
            if (response.ok) {
                const updatedSolicitud = await response.json();
    
                if (decision === 'aceptada') {
                    // Si se acepta una solicitud, actualizar para que las demás se deshabiliten
                    setSolicitudes(prevSolicitudes =>
                        prevSolicitudes.map(s =>
                            s.id_solicitud === solicitudId
                                ? { ...s, estado: 'aceptada' }
                                : { ...s, estado: s.estado === 'pendiente' ? 'rechazada' : s.estado }
                        )
                    );
                } else if (decision === 'rechazada') {
                    // Si se rechaza una solicitud aceptada, verificar si quedan solicitudes aceptadas
                    setSolicitudes(prevSolicitudes => {
                        const updatedSolicitudes = prevSolicitudes.map(s =>
                            s.id_solicitud === solicitudId ? { ...s, estado: 'rechazada' } : s
                        );
    
                        // Verificar si hay alguna solicitud aceptada
                        const hasAccepted = updatedSolicitudes.some(s => s.estado === 'aceptada');
                        
                        // Si no hay ninguna aceptada, volver a habilitar todas las pendientes
                        if (!hasAccepted) {
                            return updatedSolicitudes.map(s =>
                                s.estado === 'rechazada' ? { ...s, estado: 'pendiente' } : s
                            );
                        }
                        
                        return updatedSolicitudes;
                    });
                } else {
                    // Para otras actualizaciones, simplemente actualizamos el estado normalmente
                    setSolicitudes(prevSolicitudes =>
                        prevSolicitudes.map(s =>
                            s.id_solicitud === solicitudId ? { ...s, estado: decision } : s
                        )
                    );
                }
            } else {
                console.error("Error al actualizar la solicitud");
                alert("No se pudo actualizar la solicitud.");
            }
        } catch (error) {
            console.error("Error en la conexión con el servidor:", error);
            alert("Hubo un problema con la conexión.");
        }
    };
    
    

    if (!mascota) return <p>Cargando...</p>;

    return (
        <div className="pet-profile">
            <div className="profile-card">
                <img src={`${backendUrl}/uploads/${mascota.fotos}`} alt={mascota.nombre} className="pet-image" />
                <div className="pet-details">
                    <h2>{mascota.nombre}</h2>

                    {isEditing ? (
                        <>
                            <button className="button confirm-button" onClick={handleConfirmChanges}>Confirmar cambios</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Edad:</strong> {mascota.edad_aproximada} {mascota.edad_unidad}</p>
                            <p><strong>Tamaño:</strong> {mascota.tamano_aproximado}</p>
                            <p><strong>Raza:</strong> {mascota.raza}</p>
                            <p><strong>Comportamiento:</strong> {mascota.comportamiento}</p>
                            <p><strong>Salud:</strong> {mascota.salud ? 'Con problemas de salud' : 'No tiene problemas de salud'}</p>
                            {mascota.salud && <p><strong>Detalles de Salud:</strong> {mascota.detallesSalud}</p>}
                            <p><strong>Especie:</strong> {mascota.especie}</p>
                            <p><strong>Región:</strong> {mascota.region}</p>
                            <div className="button-container">
                                {isOwner ? (
                                    <>
                                        <button className="view-solicitudes-button" onClick={handleViewSolicitudes}>Ver Solicitudes</button>
                                        <button className="button edit-button" onClick={handleEdit}>Editar Perfil</button>
                                    </>
                                ) : (
                                    <button className="request-button" onClick={() => navigate(`/SolicitudAdopcion/${idMascota}`)}>Realizar Solicitud</button>
                                )}
                                <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
                            </div>
                        </>
                    )}

                    {showSolicitudes && (
                        <div className="solicitudes-section">
                            <h3>Solicitudes de adopción</h3>
                            <div className="solicitudes-container">
                                {solicitudes.map(solicitud => (
                                    <div key={solicitud.id_solicitud} className="solicitud-card">
                                        <div className="user-info">
                                            <div className="user-details">
                                                <p className="user-name"><strong>{solicitud.potencial_adoptante.nombre}</strong></p>
                                                <p className="user-name"><strong>{solicitud.potencial_adoptante.email}</strong></p>
                                                <p className="user-contact"><strong>Contacto:</strong> {solicitud.contacto}</p>
                                            </div>
                                        </div>
                                        <div className="solicitud-details">
                                            <p><strong>Razones:</strong> {solicitud.razones}</p>
                                            <p><strong>Tipo de Vivienda:</strong> {solicitud.tipo_vivienda}</p>
                                            <p><strong>Otra Mascota:</strong> {solicitud.otra_mascota ? 'Sí' : 'No'}</p>
                                            <p><strong>Experiencia con Mascotas:</strong> {solicitud.experiencia ? 'Sí' : 'No'}</p>
                                            <p><strong>Descripción de la Experiencia:</strong> {solicitud.descripcion_experiencia}</p>
                                            <p><strong>Estado:</strong> {solicitud.estado}</p>
                                        </div>
                                        <div className="solicitud-actions">
                                            <button
                                                onClick={() => handleSolicitudDecision(solicitud.id_solicitud, 'aceptada')}
                                                className="accept-button"
                                                disabled={solicitud.estado !== 'pendiente' && solicitud.estado !== 'aceptada'}
                                            >
                                                Aceptar
                                            </button>
                                            <button
                                                onClick={() => handleSolicitudDecision(solicitud.id_solicitud, 'rechazada')}
                                                className="reject-button"
                                                disabled={solicitud.estado !== 'aceptada' && solicitud.estado !== 'pendiente'}
                                            >
                                                Rechazar
                                            </button>
                                        </div>


                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
