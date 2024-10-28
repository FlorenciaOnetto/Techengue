import React, { useState, useContext, useEffect } from 'react';
import './PaginaInicio.css';
import imagenMascota from './assets/imagen_principal.jpg';


export default function PaginaInicio() {
    return (
        <div>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>TailWaggers</div>
          <nav style={styles.nav}>
            <a href="#profiles">Pet Profiles</a>
            <a href="#guardians">Guardians</a>
            <a href="#featured">Featured</a>
            <a href="/perfilusuario">Perfil de Usuario</a> {/* Nuevo enlace */}
          </nav>
          <div style={styles.authButtons}>
            <button style={styles.joinBtn}>Join</button>
            <button style={styles.loginBtn}>Log in</button>
          </div>
        </header>
  
        {/* Search Bar */}
        <img src={imagenMascota} alt="Mascota" style={styles.imagen_principal} />
        <section style={styles.searchBar}>
          <h1>TailWaggers</h1>
          <h2>Dales una segunda oportunidad, encuentra a tu compañero de vida</h2>
          <p>Haz una búsqueda según tus preferencias</p>
          <div style={styles.filters}>
            <select style={styles.input}>
                <option value="">Especie</option>
                <option value="">Perro</option>
                <option value="Tarapacá">Gato</option>
            </select>
            {/* Menú desplegable para seleccionar regiones de Chile */}
            <select style={styles.input}>
                <option value="">Selecciona una región</option>
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
            <select style={styles.input}>
                <option value="">Tamaño aproximado </option>
                <option value="">Pequeño</option>
                <option value="Tarapacá">Mediano</option>
                <option value="Antofagasta">Grande</option>
            </select>
            <select style={styles.input}>
                <option value="">Edad aproximada</option>
                <option value="">Cachorro</option>
                <option value="">Adolecente</option>
                <option value="Tarapacá">Adulto</option>
                <option value="Antofagasta">Senior</option>
            </select>
            <button style={styles.searchBtn}>→</button>
          </div>
        </section>
  
        {/* Popular Pets Section */}
        <section style={styles.popularPets}>
          <h2>Perros y gatos en adopción</h2>
          <div style={styles.petsGrid}>
            <div style={styles.petCard}>
              <img src="url-de-la-imagen" alt="Benito" style={styles.petImage} />
              <p>Benito</p>
            </div>
            <div style={styles.petCard}>
              <img src="url-de-la-imagen" alt="Neptuno" style={styles.petImage} />
              <p>Neptuno</p>
            </div>
            {/* Más mascotas aquí */}
          </div>
        </section>
        <section className="about-us" style={{ clear: 'both',  textAlign: 'center' }}>
        <p>
            Cada adopción salva vidas y brinda una segunda oportunidad. ¡Juntos podemos cambiar el mundo, una mascota a la vez!
        </p>
      </section>

      <footer className="footer">
        <p>&copy; TailWaggers</p>
      </footer>
      </div>
    );
};

const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ff6b6b', // Color del logo rojo
    },
    nav: {
      display: 'flex',
      gap: '15px',
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
      title: {
        color: '#ff6347', 
      },
      subtitle: {
        color: '#333',
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
    popularPets: {
      padding: '40px',
      textAlign: 'center',
    },
    petsGrid: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    petCard: {
      width: '200px',
      margin: '20px',
    },
    petImage: {
      width: '100%',
      borderRadius: '10px',
    },
    imagen_principal: {
        width: '100%',       
        height: 'auto',       
        objectFit: 'cover',   
      },
  };