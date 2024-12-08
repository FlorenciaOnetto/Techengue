import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SolicitudEstado.css';

const SolicitudEstado = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch(`${backendUrl}/solicitudes/usuario/solicitudes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSolicitudes(data);
        } else {
          console.error("Error al obtener solicitudes.");
        }
      } catch (error) {
        console.error("Error en la conexión con el servidor:", error);
      }
    };

    fetchSolicitudes();
  }, [token]);

  const handleNavigateToProfile = (idMascota) => {
    navigate(`/perfilmascota/${idMascota}`);
  };

  return (
    <div className="solicitud-estado-container">
      <h2>Estado de Solicitudes de Adopción</h2>
      {solicitudes.length > 0 ? (
        solicitudes.map((solicitud) => (
          <div key={solicitud.id_solicitud} className="solicitud-item">
            <p>Has solicitado adoptar a <strong>{solicitud.mascota.nombre}</strong>.</p>
            <p>
              <strong>Estado:</strong>{' '}
              <span className={`status ${solicitud.estado.toLowerCase()}`}>{solicitud.estado}</span>
            </p>
            <button
              className="perfil-button"
              onClick={() => handleNavigateToProfile(solicitud.mascota.id_mascota)}
            >
              Ver Perfil de {solicitud.mascota.nombre}
            </button>
          </div>
        ))
      ) : (
        <p>No tienes solicitudes de adopción.</p>
      )}
      <button className="volver-button" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default SolicitudEstado;
