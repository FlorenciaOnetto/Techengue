import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaInicio.css';
import imagenMascota from './assets/imagen_principal.jpg';

export default function PaginaInicio() {
    const navigate = useNavigate();
    const [mascotas, setMascotas] = useState([]);
    const [especie, setEspecie] = useState('');
    const [region, setRegion] = useState('');
    const [tamanoAproximado, setTamanoAproximado] = useState('');
    const [edadAproximada, setEdadAproximada] = useState('');
    const [edadUnidad, setEdadUnidad] = useState('');

    useEffect(() => {
        const fetchUserMascotas = async () => {
            const token = localStorage.getItem('token');
    
            if (!token) return;
    
            try {
                const response = await fetch('http://localhost:3000/mascotas/todas', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setMascotas(data);
                } else {
                    console.error('Error al obtener las mascotas del usuario');
                }
            } catch (error) {
                console.error('Error en la conexión con el servidor:', error);
            }
        };
        fetchUserMascotas();
    }, []);
    
    const handleVerDetalle = (id) => {
        navigate(`/perfilmascota/${id}`);
    };

    const handleRealizarSolicitud = (id) => {
        navigate(`/solicitud/${id}`);
    };

    const handleSearch = () => {
        if (especie && region && tamanoAproximado && edadAproximada && edadUnidad) {
            const searchURL = `/resultados?especie=${especie}&region=${region}&tamano_aproximado=${tamanoAproximado}&edad_aproximada=${edadAproximada}&edad_unidad=${edadUnidad}`;
            navigate(searchURL);
        } else {
            alert("Por favor, selecciona una opción en todos los campos de búsqueda.");
        }
    };

    return (
        <div className="pagina-inicio">
            <header className="header"></header>
            <img src={imagenMascota} alt="Mascota" className="imagen-principal" />
            <section className="search-bar">
                <h2>Dales una segunda oportunidad, encuentra a tu compañero de vida</h2>
                <p>Haz una búsqueda según tus preferencias</p>
                <div className="filters">
                    <select className="input" value={especie} onChange={(e) => setEspecie(e.target.value)}>
                        <option value="">Especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                    </select>
                    <select className="input" value={region} onChange={(e) => setRegion(e.target.value)}>
                        <option value="">Selecciona una región</option>
                        <option value="Arica y Parinacota">Arica y Parinacota</option>
                        <option value="Tarapacá">Tarapacá</option>
                        <option value="Antofagasta">Antofagasta</option>
                        <option value="Atacama">Atacama</option>
                        <option value="Coquimbo">Coquimbo</option>
                        <option value="Valparaíso">Valparaíso</option>
                        <option value="Metropolitana">Metropolitana</option>
                        <option value="O'Higgins">O'Higgins</option>
                        <option value="Maule">Maule</option>
                        <option value="Ñuble">Ñuble</option>
                        <option value="Biobío">Biobío</option>
                        <option value="Araucanía">Araucanía</option>
                        <option value="Los Ríos">Los Ríos</option>
                        <option value="Los Lagos">Los Lagos</option>
                        <option value="Aysén">Aysén</option>
                        <option value="Magallanes">Magallanes</option>
                    </select>
                    <select className="input" value={tamanoAproximado} onChange={(e) => setTamanoAproximado(e.target.value)}>
                        <option value="">Tamaño aproximado</option>
                        <option value="Pequeño">Pequeño</option>
                        <option value="Mediano">Mediano</option>
                        <option value="Grande">Grande</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Edad Aproximada"
                        value={edadAproximada}
                        onChange={(e) => setEdadAproximada(e.target.value)}
                        className="input"
                    />
                    <select className="input" value={edadUnidad} onChange={(e) => setEdadUnidad(e.target.value)}>
                        <option value="">Unidad</option>
                        <option value="meses">Meses</option>
                        <option value="años">Años</option>
                    </select>
                    <button className="search-btn" onClick={handleSearch}>→</button>
                </div>
            </section>

            {/* Sección de mascotas en adopción */}
            <section className="info-card">
                {mascotas.length > 0 ? (
                    <ul className="mascotas-list">
                        {mascotas.map((mascota) => (
                            <li key={mascota.id_mascota} className="mascota-item mascota-card">
                                <img 
                                    src={`http://localhost:3000/uploads/${mascota.fotos}`} 
                                    alt={mascota.nombre} 
                                    className="mascota-image"
                                />
                                <div className="mascota-details">
                                    <p><strong>Nombre:</strong> {mascota.nombre}</p>
                                    <p><strong>Especie:</strong> {mascota.especie}</p>
                                    <p><strong>Raza:</strong> {mascota.raza}</p>
                                    <p><strong>Edad:</strong> {mascota.edad_aproximada} {mascota.edad_unidad}</p>
                                    <p><strong>Región:</strong> {mascota.region}</p>
                                    <button className="detail-button" onClick={() => handleVerDetalle(mascota.id_mascota)}>Ver</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tienes mascotas publicadas.</p>
                )}
            </section>

            <footer className="footer">
                <p>&copy; TailWaggers</p>
            </footer>
        </div>
    );
}
