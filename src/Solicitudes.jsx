import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Solicitudes.css';

const PetAdoptionRequests = () => {
  const navigate = useNavigate();

  // Datos de ejemplo para requests
  const exampleRequests = [
    { id: 1, userId: 101, userName: "Carlos Pérez", date: "2024-10-28" },
    { id: 2, userId: 102, userName: "Ana González", date: "2024-10-29" },
  ];

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleViewRequestDetails = (requestId) => {
    navigate(`/request/${requestId}`);
  };

  return (
    <div className="requests-container">
      <h2>Solicitudes de Adopción</h2>
      <div className="requests-list">
        {exampleRequests.map((request) => (
          <div key={request.id} className="request-card">
            <h3>{request.userName}</h3>
            <p>{request.date}</p>
            <div className="request-buttons">
              <button onClick={() => handleViewProfile(request.userId)} className="view-profile-btn">
                Ver Perfil
              </button>
              <button onClick={() => handleViewRequestDetails(request.id)} className="view-request-btn">
                Ver Solicitud
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetAdoptionRequests;
