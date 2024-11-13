import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Solicitudes.css';

const PetAdoptionRequests = () => {
  const { idMascota } = useParams(); // Obtenemos el ID de la mascota desde los parámetros de la URL
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3000/solicitudes/mascota/${idMascota}`);
        if (!response.ok) {
          throw new Error('Error al obtener las solicitudes');
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error(error);
        setError('Error al cargar las solicitudes');
      }
    };
    fetchRequests();
  }, [idMascota]);

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleViewRequestDetails = (requestId) => {
    navigate(`/request/${requestId}`);
  };

  return (
    <div className="requests-container">
      <h2>Solicitudes de Adopción</h2>
      {error && <p>{error}</p>}
      <div className="requests-list">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id_solicitud} className="request-card">
              <h3>{request.potencial_adoptante.nombre}</h3>
              <p>{request.created_at}</p>
              <div className="request-buttons">
                <button onClick={() => handleViewProfile(request.potencial_adoptante.id_usuario)} className="view-profile-btn">
                  Ver Perfil
                </button>
                <button onClick={() => handleViewRequestDetails(request.id_solicitud)} className="view-request-btn">
                  Ver Solicitud
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay solicitudes para esta mascota.</p>
        )}
      </div>
    </div>
  );
};

export default PetAdoptionRequests;
