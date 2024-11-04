import React, { useState } from 'react';
import './PaginaInicio.css';
import { useNavigate } from 'react-router-dom';
import imagenMascota from './assets/imagen_principal.jpg';

export default function PaginaInicio() {
    const navigate = useNavigate();

    const [especie, setEspecie] = useState('');
    const [region, setRegion] = useState('');
    const [tamanoAproximado, setTamanoAproximado] = useState('');
    const [edadAproximada, setEdadAproximada] = useState(''); // Valor numérico de la edad
    const [edadUnidad, setEdadUnidad] = useState(''); // Meses o años

    const handleSearch = () => {
      if (especie && region && tamanoAproximado && edadAproximada && edadUnidad) {
          // Imprimir el estado de edadUnidad para depuración
          console.log("Estado de edadUnidad:", edadUnidad);
          
          // Construir la URL de búsqueda
          const searchURL = `/resultados?especie=${especie}&region=${region}&tamano_aproximado=${tamanoAproximado}&edad_aproximada=${edadAproximada}&edad_unidad=${edadUnidad}`;
          
          // Imprimir la URL generada para verificar que todos los parámetros están presentes
          console.log("URL de consulta generada:", searchURL);
          
          // Redirigir a la URL de resultados
          navigate(searchURL);
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
                    <input
                        type="number"
                        placeholder="Edad Aproximada"
                        value={edadAproximada}
                        onChange={(e) => setEdadAproximada(e.target.value)}
                        style={styles.input}
                    />
                    <select style={styles.input} value={edadUnidad} onChange={(e) => setEdadUnidad(e.target.value)}>
                        <option value="">Unidad</option>
                        <option value="meses">Meses</option>
                        <option value="años">Años</option>
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
