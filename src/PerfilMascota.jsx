import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PerfilMascota.css';

export default function PerfilMascota() {
    const { idMascota } = useParams();
    const [mascota, setMascota] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [solicitudes, setSolicitudes] = useState([]);
    const [showSolicitudes, setShowSolicitudes] = useState(false); // Para alternar la vista de solicitudes
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMascota = async () => {
            try {
                const response = await fetch(`http://localhost:3000/mascotas/${idMascota}`);
                const data = await response.json();
                setMascota(data);

                const token = localStorage.getItem('token');
                if (token) {
                    const userData = JSON.parse(atob(token.split('.')[1]));
                    if (data.id_usuario === userData.id) {
                        setIsOwner(true);
                    }
                }
            } catch (error) {
                console.error("Error al cargar la mascota:", error);
            }
        };
        fetchMascota();
    }, [idMascota]);

    const handleViewSolicitudes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/solicitudes/mascota/${idMascota}`);
            const data = await response.json();
            setSolicitudes(data);
            setShowSolicitudes(true); // Mostrar las solicitudes
        } catch (error) {
            console.error("Error al obtener solicitudes:", error);
        }
    };

    if (!mascota) return <p>Cargando...</p>;

    return (
        <div className="pet-profile">
            <div className="profile-card">
                <img src={`http://localhost:3000/uploads/${mascota.fotos}`} alt={mascota.nombre} className="pet-image" />
                <div className="pet-details">
                    <h2>{mascota.nombre}</h2>
                    <p><strong>Edad:</strong> {mascota.edad_aproximada} {mascota.edad_unidad}</p>
                    <p><strong>Porte:</strong> {mascota.tamano_aproximado}</p>
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
                                <button className="edit-profile-button" onClick={() => navigate(`/editarperfil/${idMascota}`)}>Editar Perfil</button>
                            </>
                        ) : (
                            <button className="request-button" onClick={() => navigate(`/SolicitudAdopcion/${idMascota}`)}>Realizar Solicitud</button>
                        )}
                        <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
                    </div>
                </div>
            </div>

            {showSolicitudes && (
                <div className="solicitudes-container">
                    <h3>Solicitudes de Adopción</h3>
                    {solicitudes.length > 0 ? (
                        <ul>
                            {solicitudes.map((solicitud) => (
                                <li key={solicitud.id_solicitud}>
                                    <p><strong>Motivo:</strong> {solicitud.razones}</p>
                                    <p><strong>Descripción del Hogar:</strong> {solicitud.descripcion_hogar}</p>
                                    <p><strong>Estado:</strong> {solicitud.estado}</p>
                                    <p><strong>Contacto:</strong> {solicitud.contacto}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay solicitudes para esta mascota.</p>
                    )}
                </div>
            )}
        </div>
    );
}
