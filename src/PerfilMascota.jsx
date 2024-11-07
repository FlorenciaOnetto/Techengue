// PerfilMascota.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PerfilMascota.css';

export default function PerfilMascota() {
    const { idMascota } = useParams();
    const [mascota, setMascota] = useState(null);

    useEffect(() => {
        const fetchMascota = async () => {
            try {
                const response = await fetch(`http://localhost:3000/mascotas/${idMascota}`);
                const data = await response.json();
                setMascota(data);
            } catch (error) {
                console.error("Error al cargar la mascota:", error);
            }
        };

        fetchMascota();
    }, [idMascota]);

    if (!mascota) return <p>Cargando...</p>;

    return (
        <div className="pet-profile">
            <div className="profile-card">
                <img src={`http://localhost:3000/uploads/${mascota.fotos}`} alt={mascota.nombre} className="pet-image" />
                <div className="pet-details">
                    <h2>{mascota.nombre}</h2>
                    <p>Edad: {mascota.edad_aproximada} {mascota.edad_unidad}</p>
                    <p>Porte: {mascota.tamano_aproximado}</p>
                    <p>Raza: {mascota.raza}</p>
                    <p>Comportamiento: {mascota.comportamiento}</p>
                    <p>Salud: {mascota.salud ? 'Con problemas de salud' : 'No tiene problemas de salud'}</p>
                    {mascota.salud && <p>Detalles de Salud: {mascota.detallesSalud}</p>} {/* Mostrar detalles si hay problemas de salud */}
                    <div className="button-container">
                        <button className="contact-button">Contactar Guardian</button>
                        <button className="adoption-button">Solicitudes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
