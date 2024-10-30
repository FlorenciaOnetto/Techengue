import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SolicitudDetalle.css';

const SolicitudDetalle = () => {
  const { requestId } = useParams(); // Obtiene el ID de la solicitud desde la URL
  const navigate = useNavigate();

  // Datos simulados de la solicitud, en un proyecto real estos vendrían de una API
  const solicitud = {
    userName: "Carlos Pérez",
    petName: "Max",
    tipoVivienda: ["Casa", "Con patio"],
    otrosAnimales: "Sí",
    experienciaPrevia: "Sí",
    descripcionExperiencia: "He tenido perros y gatos durante 5 años.",
    motivos: "Quiero adoptar porque amo a los animales y quiero darle un hogar a uno en necesidad.",
    aceptacionTerminos: true,
  };

  const handleAccept = () => {
    alert("Solicitud aceptada");
    navigate("/Solicitudes");
  };

  const handleReject = () => {
    alert("Solicitud rechazada");
    navigate("/Solicitudes");
  };

  return (
    <div className="solicitud-detalle-container">
      <h2>Solicitud de Adopción</h2>
      <p><strong>{solicitud.userName}</strong> desea adoptar a la mascota <strong>{solicitud.petName}</strong>.</p>

      {/* Detalles de la solicitud */}
      <div className="solicitud-detalle-info">
        <p><strong>Tipo de Vivienda:</strong> {solicitud.tipoVivienda.join(', ')}</p>
        <p><strong>Otros Animales en el Hogar:</strong> {solicitud.otrosAnimales}</p>
        <p><strong>Experiencia con Mascotas:</strong> {solicitud.experienciaPrevia}</p>
        {solicitud.descripcionExperiencia && (
          <p><strong>Descripción de la Experiencia:</strong> {solicitud.descripcionExperiencia}</p>
        )}
        <p><strong>Motivos para Adoptar:</strong> {solicitud.motivos}</p>
        <p><strong>Aceptación de Términos:</strong> {solicitud.aceptacionTerminos ? "Sí" : "No"}</p>
      </div>

      {/* Botones de Aceptar y Rechazar */}
      <div className="solicitud-detalle-buttons">
        <button onClick={handleAccept} className="accept-btn">Aceptar Solicitud</button>
        <button onClick={handleReject} className="reject-btn">Rechazar Solicitud</button>
      </div>
    </div>
  );
};

export default SolicitudDetalle;
