import React from 'react';
import './Resena.css';

export default function ResenaForm() {
    return (
        <div className="resena-form">
            <h2>Califica tu experiencia</h2>
            <div className="calificacion">
                <span>⭐⭐⭐⭐⭐</span> 
            </div>
            <label>Comparte tu experiencia</label>
            <textarea placeholder="Comparte tu historia de adopción y ayuda a otros a encontrar su compañero perfecto"></textarea>

            <label>Detalles adicionales</label>
            <textarea placeholder="Añade detalles que te gustaría que el resto de adoptantes supieran"></textarea>

            <label>Sube fotos de la mascota</label>
            <div className="subir-fotos">
                <input type="file" multiple />
                <button>Seleccionar fotos</button>
            </div>

            <button className="btn-publicar">Publicar reseña</button>
        </div>
    );
}
