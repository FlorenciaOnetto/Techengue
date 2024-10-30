import React from 'react';
import './PerfilUsuario.css';

export default function PerfilUsuario() {
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <img src="url-de-la-imagen" alt="Foto de perfil" className="profile-image" />
                <h2>Alex Johnson</h2>
                <a href="mailto:alex.johnson@example.com" className="profile-email">alex.johnson@example.com</a>
                <div className="sidebar-buttons">
                    <button className="sidebar-button">Perfil</button>
                    <button className="sidebar-button">Historial adopciones</button>
                    <button className="sidebar-button">Settings</button>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="main-content">
                <h1>Dashboard de Usuario</h1>
                <div className="info-sections">
                    <section className="info-card">
                        <h2>Información de perfil</h2>
                        <p>Name: Alex Johnson</p>
                        <p>Email: alex.johnson@example.com</p>
                        <p>Age: 30 years</p> {/* Nueva línea para la edad */}
                        <p>Member Since: January 2023</p>
                    </section>
                    <section className="info-card">
                        <h2>Historial adopciones</h2>
                        <p>Adopted Bella (Dog) on 12th March 2023</p>
                        <p>Adopted Charlie (Cat) on 5th February 2023</p>
                        <p>Adopted Max (Rabbit) on 10th January 2023</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
