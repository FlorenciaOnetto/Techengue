import React from 'react';
import './SolicitudEstado.css';

const SolicitudEstado = () => {
  // Datos de ejemplo
  const solicitud = {
    petName: "Max",
    status: "En espera" // Puede ser "Aceptada", "Rechazada", "En espera"
  };

  return (
    <div className="solicitud-estado-container">
      <h2>Estado de Solicitud de Adopción</h2>
      <p>Has solicitado adoptar a <strong>{solicitud.petName}</strong>.</p>
      <p><strong>Estado:</strong> <span className={`status ${solicitud.status.toLowerCase()}`}>{solicitud.status}</span></p>
    </div>
  );
};

export default SolicitudEstado;
