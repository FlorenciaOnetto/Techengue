import React from 'react';
import './PaginaInicio.css';
import { useNavigate } from 'react-router-dom';
import imagenMascota from './assets/imagen_principal.jpg';

export default function PaginaInicio() {
    const navigate = useNavigate();

    const handleJoin = () => {
        navigate('/registro');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            {/* Header simplificado */}
            <header style={styles.header}>
            </header>

            {/* Search Bar */}
            <img src={imagenMascota} alt="Mascota" style={styles.imagen_principal} />
            <section style={styles.searchBar}>
                <h2>Dales una segunda oportunidad, encuentra a tu compañero de vida</h2>
                <p>Haz una búsqueda según tus preferencias</p>
                <div style={styles.filters}>
                    <select style={styles.input}>
                        <option value="">Especie</option>
                        <option value="">Perro</option>
                        <option value="Tarapacá">Gato</option>
                    </select>
                    <select style={styles.input}>
                        <option value="">Selecciona una región</option>
                        <option value="Tarapacá">Tarapacá</option>
                        <option value="Antofagasta">Antofagasta</option>
                        {/* Otras regiones... */}
                    </select>
                    <select style={styles.input}>
                        <option value="">Tamaño aproximado</option>
                        <option value="">Pequeño</option>
                        <option value="Tarapacá">Mediano</option>
                        <option value="Antofagasta">Grande</option>
                    </select>
                    <select style={styles.input}>
                        <option value="">Edad aproximada</option>
                        <option value="">Cachorro</option>
                        <option value="">Adolescente</option>
                        <option value="Tarapacá">Adulto</option>
                        <option value="Antofagasta">Senior</option>
                    </select>
                    <button style={styles.searchBtn}>→</button>
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
    authButtons: {
        display: 'flex',
        gap: '10px',
    },
    joinBtn: {
        padding: '10px 15px',
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
    },
    loginBtn: {
        padding: '10px 15px',
        backgroundColor: 'white',
        border: '1px solid #ff6b6b',
        color: '#ff6b6b',
        borderRadius: '20px',
        cursor: 'pointer',
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
