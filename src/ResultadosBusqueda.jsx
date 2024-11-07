// ResultadosBusqueda.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultadosBusqueda.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ResultadosBusqueda() {
    const query = useQuery();
    const navigate = useNavigate();
    const [mascotas, setMascotas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMascotas = async () => {
            const especie = query.get('especie');
            const region = query.get('region');
            const tamano_aproximado = query.get('tamano_aproximado');
            const edad_aproximada = query.get('edad_aproximada');
            const edad_unidad = query.get('edad_unidad');
    
            // Agregar log para verificar los valores de los filtros
            console.log("Filtros de búsqueda:", {
                especie,
                region,
                tamano_aproximado,
                edad_aproximada,
                edad_unidad,
            });
    
            try {
                const response = await fetch(`http://localhost:3000/mascotas/buscar?especie=${especie}&region=${region}&tamano_aproximado=${tamano_aproximado}&edad_aproximada=${edad_aproximada}&edad_unidad=${edad_unidad}`);
                if (!response.ok) {
                    throw new Error("Error al buscar mascotas");
                }
                const data = await response.json();
                setMascotas(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Hubo un problema al cargar las mascotas.");
                setMascotas([]);
            }
        };
    
        fetchMascotas();
    }, [query]);
    

    const handleViewDetails = (idMascota) => {
        console.log(`Navegando a /perfilmascota/${idMascota}`);
        navigate(`/perfilmascota/${idMascota}`);
    };
    

    return (
        <div className="resultados-container">
            <h2 className="resultados-titulo">Resultados de Búsqueda</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                mascotas.length > 0 ? (
                    <div className="mascotas-grid">
                        {mascotas.map(mascota => (
                            <div key={mascota.id_mascota} className="mascota-card">
                                <div className="mascota-info">
                                    <h3>{mascota.nombre}</h3>
                                    <p><strong>Especie:</strong> {mascota.especie}</p>
                                    <p><strong>Región:</strong> {mascota.region}</p>
                                    <p><strong>Tamaño Aproximado:</strong> {mascota.tamano_aproximado}</p>
                                    <p><strong>Edad Aproximada:</strong> {mascota.edad_aproximada} {mascota.edad_unidad}</p>
                                </div>
                                {mascota.fotos && (
                                    <img src={`http://localhost:3000/uploads/${mascota.fotos}`} alt={mascota.nombre} className="mascota-foto" />
                                )}
                                <button 
                                    onClick={() => handleViewDetails(mascota.id_mascota)} 
                                    className="detalles-button"
                                >
                                    Ver detalles
                                </button>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron mascotas con esos criterios de búsqueda.</p>
                )
            )}
        </div>
    );
}

export default ResultadosBusqueda;
