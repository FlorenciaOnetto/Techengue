import React from 'react';
import './PerfilMascota.css'; 

export default function PerfilMascota() {
  return (
    <div className="pet-profile">
      <div className="profile-card">
        <img src="url_imagen.jpg" alt="Buddy" className="pet-image" />
        <div className="pet-details">
          <h2>Buddy</h2>
          <p>Edad: 3 años</p>
          <p>Porte: Mediano</p>
          <p>Raza: Golden</p>
          <p>Comportamiento: Es un perro muy bien portado</p>
          <div className="button-container">
            <button className="contact-button">Contactar Guardian</button>
            <button className="adoption-button">Solicitudes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

