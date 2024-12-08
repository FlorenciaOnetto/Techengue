import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PublicarMascota.css';


function PublicarMascota() {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        // Obtener el userId del localStorage
        const userId = localStorage.getItem('userId');
        
        // Imprimir el userId en la consola para verificar si existe o no
        console.log('UserId en localStorage:', userId);
    
        // Verificar si el userId no existe
        if (!userId) {
          console.log('No hay userId, redirigiendo a login...');
          navigate('/login');
        }
      }, [navigate]);

    const [formData, setFormData] = useState({
        nombre: '',
        tamano_aproximado: '',
        edad_aproximada: '',
        edad_unidad: 'años',
        especie: '',
        raza: '',
        region: '',
        fotos: null,
        comportamiento: '',
        salud: false,
        detallesSalud: '' // Campo para detalles de salud
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            fotos: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        const token = localStorage.getItem('token');
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await fetch(`${backendUrl}/mascotas/publicar`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setSuccessMessage("Mascota publicada correctamente");
                setFormData({
                    nombre: '',
                    tamano_aproximado: '',
                    edad_aproximada: '',
                    edad_unidad: 'años',
                    especie: '',
                    raza: '',
                    region: '',
                    fotos: null,
                    comportamiento: '',
                    salud: false,
                    detallesSalud: '' // Reinicia el campo de detalles de salud
                });
            } else {
                const errorData = await response.json();
                console.log("Error al publicar la mascota:", errorData);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div className="publish-form-container">
            <form className="publish-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Publicar Mascota</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                
                <select
                    name="tamano_aproximado"
                    value={formData.tamano_aproximado}
                    onChange={handleChange}
                    required
                >
                    <option value="">Tamaño Aproximado</option>
                    <option value="Pequeño">Pequeño</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Grande">Grande</option>
                </select>

                <div className="edad-container">
                    <label>Edad Aproximada:</label>
                    <input
                        type="number"
                        name="edad_aproximada"
                        placeholder="Edad Aproximada"
                        value={formData.edad_aproximada}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                    <select name="edad_unidad" value={formData.edad_unidad} onChange={handleChange}>
                        <option value="meses">Meses</option>
                        <option value="años">Años</option>
                    </select>
                </div>

                <select
                    name="especie"
                    value={formData.especie}
                    onChange={handleChange}
                    required
                >
                    <option value="">Especie</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                </select>
                
                <input
                    type="text"
                    name="raza"
                    placeholder="Raza"
                    value={formData.raza}
                    onChange={handleChange}
                    required
                />
                
                <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                >
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
                
                <textarea
                    name="comportamiento"
                    placeholder="Descripción"
                    value={formData.comportamiento}
                    onChange={handleChange}
                    rows="3"
                    required
                ></textarea>

                <div className="salud-options">
                    <label>Salud:</label>
                    <label>
                        <input
                            type="radio"
                            name="salud"
                            value={true}
                            checked={formData.salud === true}
                            onChange={() => setFormData({ ...formData, salud: true })}
                        />
                        Con problemas de salud
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="salud"
                            value={false}
                            checked={formData.salud === false}
                            onChange={() => setFormData({ ...formData, salud: false })}
                        />
                        No tiene problemas de salud
                    </label>
                </div>

                {formData.salud && (
                    <textarea
                        name="detallesSalud"
                        placeholder="Detalles de problemas de salud"
                        value={formData.detallesSalud}
                        onChange={handleChange}
                        rows="3"
                    ></textarea>
                )}

                <label>Fotos:</label>
                <input
                    type="file"
                    name="fotos"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />
                
                <button type="submit">Publicar Mascota</button>
            </form>
        </div>
    );
}

export default PublicarMascota;
