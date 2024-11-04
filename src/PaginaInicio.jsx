import React, { useState } from 'react';
import './PaginaInicio.css';
import { useNavigate } from 'react-router-dom';
import imagenMascota from './assets/imagen_principal.jpg';

export default function PaginaInicio() {
    const navigate = useNavigate();

    const [especie, setEspecie] = useState('');
    const [region, setRegion] = useState('');
    const [tamanoAproximado, setTamanoAproximado] = useState('');
    const [edadRango, setEdadRango] = useState('');

    const handleSearch = () => {
        if (especie && region && tamanoAproximado && edadRango) {
            console.log("Rango de Edad seleccionado:", edadRango);
            navigate(`/resultados?especie=${especie}&region=${region}&tamano_aproximado=${tamanoAproximado}&edad_rango=${edadRango}`);
        } else {
            alert("Por favor, selecciona una opción en todos los campos de búsqueda.");
        }
    };

    return (
        <div>
            <header style={styles.header}></header>
            <img src={imagenMascota} alt="Mascota" style={styles.imagen_principal} />
            <section style={styles.searchBar}>
                <h2>Dales una segunda oportunidad, encuentra a tu compañero de vida</h2>
                <p>Haz una búsqueda según tus preferencias</p>
                <div style={styles.filters}>
                    <select style={styles.input} value={especie} onChange={(e) => setEspecie(e.target.value)}>
                        <option value="">Especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                    </select>
                    <select style={styles.input} value={region} onChange={(e) => setRegion(e.target.value)}>
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
                    <select style={styles.input} value={tamanoAproximado} onChange={(e) => setTamanoAproximado(e.target.value)}>
                        <option value="">Tamaño aproximado</option>
                        <option value="Pequeño">Pequeño</option>
                        <option value="Mediano">Mediano</option>
                        <option value="Grande">Grande</option>
                    </select>
                    <select style={styles.input} value={edadRango} onChange={(e) => setEdadRango(e.target.value)}>
                        <option value="">Rango de Edad</option>
                        <option value="0-12">0-12 meses</option>
                        <option value="1-3">1-3 años</option>
                        <option value="3-7">3-7 años</option>
                        <option value="7+">7+ años</option>
                    </select>
                    <button style={styles.searchBtn} onClick={handleSearch}>→</button>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; TailWaggers</p>
            </footer>
        </div>
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '20px',
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        backgroundColor: '#f4f4f4',
        padding: '20px',
        textAlign: 'center',
    },
    filters: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
    },
    input: {
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #ddd',
    },
    searchBtn: {
        padding: '10px 20px',
        border: 'none',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '50%',
        fontSize: '18px',
        cursor: 'pointer',
    },
    imagen_principal: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    },
};
