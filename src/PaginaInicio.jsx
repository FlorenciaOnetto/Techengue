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
    const [filtroAplicado, setFiltroAplicado] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await fetch(`${backendUrl}/mascotas/todas`);
                if (response.ok) {
                    const data = await response.json();
                    setMascotas(data);
                } else {
                    console.error('Error al obtener las mascotas');
                }
            } catch (error) {
                console.error('Error en la conexión con el servidor:', error);
            }
        };
        fetchMascotas();
    }, []);

    const handleVerDetalle = (id) => {
        navigate(`/perfilmascota/${id}`);
    };

    const handleRealizarSolicitud = (id) => {
        navigate(`/solicitud/${id}`);
    };

    const handleSearch = () => {
        setFiltroAplicado(true);

        let filteredMascotas = mascotas;

        if (especie) {
            filteredMascotas = filteredMascotas.filter(mascota => mascota.especie === especie);
        }

        if (region) {
            filteredMascotas = filteredMascotas.filter(mascota => mascota.region === region);
        }

        if (tamanoAproximado) {
            filteredMascotas = filteredMascotas.filter(mascota => mascota.tamano_aproximado === tamanoAproximado);
        }

        if (edadAproximada) {
            filteredMascotas = filteredMascotas.filter(mascota => mascota.edad_aproximada === edadAproximada);
        }

        if (edadUnidad) {
            filteredMascotas = filteredMascotas.filter(mascota => mascota.edad_unidad === edadUnidad);
        }

        setMascotas(filteredMascotas);
    };

    const handleResetFilters = () => {
        setEspecie('');
        setRegion('');
        setTamanoAproximado('');
        setEdadAproximada('');
        setEdadUnidad('');
        setFiltroAplicado(false);
        window.location.reload();
    };

    return (
        <div className="pagina-inicio">
            <header className="header"></header>
            <img src={imagenMascota} alt="Mascota" className="imagen-principal" />
            <section className="search-bar">
                <h2>Dales una segunda oportunidad, encuentra a tu compañero de vida</h2>
                <p>Haz una búsqueda según tus preferencias</p>
                <div className="filters">
                    <select
                        name="especie"
                        className="input"
                        value={especie}
                        onChange={(e) => setEspecie(e.target.value)}
                    >
                        <option value="">Especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                    </select>
                    <select
                        name="region"
                        className="input"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    >
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
                    <select
                        name="tamano_aproximado"
                        className="input"
                        value={tamanoAproximado}
                        onChange={(e) => setTamanoAproximado(e.target.value)}
                    >
                        <option value="">Tamaño aproximado</option>
                        <option value="Pequeño">Pequeño</option>
                        <option value="Mediano">Mediano</option>
                        <option value="Grande">Grande</option>
                    </select>
                    <button className="search-btn" name="search" onClick={handleSearch}>
                        →
                    </button>
                    {filtroAplicado && (
                        <button className="reset-filters" onClick={handleResetFilters}>
                            Limpiar Filtros
                        </button>
                    )}
                </div>
            </section>

            <section className="info-card">
                {mascotas.length > 0 ? (
                    <ul className="mascotas-list">
                        {mascotas.map((mascota) => (
                            <li key={mascota.id_mascota} className="mascota-item mascota-card">
                                <img
                                    src={`${backendUrl}/uploads/${mascota.fotos}`}
                                    alt={mascota.nombre}
                                    className="mascota-image"
                                />
                                <div className="mascota-details">
                                    <p><strong>Nombre:</strong> {mascota.nombre}</p>
                                    <p><strong>Especie:</strong> {mascota.especie}</p>
                                    <p><strong>Raza:</strong> {mascota.raza}</p>
                                    <p><strong>Edad:</strong> {mascota.edad_aproximada} {mascota.edad_unidad}</p>
                                    <p><strong>Región:</strong> {mascota.region}</p>
                                    <p><strong>Tamaño:</strong> {mascota.tamano_aproximado}</p>
                                    <button className="detail-button" onClick={() => handleVerDetalle(mascota.id_mascota)}>
                                        Ver
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results-message">No hay mascotas que coincidan con tu búsqueda.</p>
                )}
            </section>

            <footer className="footer">
                <p>&copy; TailWaggers</p>
            </footer>
        </div>
    );
}
