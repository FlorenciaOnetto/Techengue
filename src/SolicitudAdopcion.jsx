import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SolicitudAdopcion.css';

const AdoptionRequestForm = () => {
  const { idMascota } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No hay token, redirigiendo a login...');
      navigate('/login');
    } else {
      try {
        const userData = JSON.parse(atob(token.split('.')[1]));
        setUserId(userData.id_usuario);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        navigate('/login');
      }
    }
  }, [navigate]);

  const [tipoVivienda, setTipoVivienda] = useState([]);
  const [otrosAnimales, setOtrosAnimales] = useState(null);
  const [experiencia, setExperiencia] = useState(null);
  const [descripcionExperiencia, setDescripcionExperiencia] = useState('');
  const [razones, setRazones] = useState('');
  const [contacto, setContacto] = useState('');
  const [aceptacionTerminos, setAceptacionTerminos] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCheckboxChange = (value, setter, currentValues) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter(item => item !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (tipoVivienda.length === 0) formErrors.tipoVivienda = 'Este campo es obligatorio';
    if (otrosAnimales === null) formErrors.otrosAnimales = 'Este campo es obligatorio';
    if (experiencia === null) formErrors.experiencia = 'Este campo es obligatorio';
    if (!razones) formErrors.razones = 'Este campo es obligatorio';
    if (!contacto) formErrors.contacto = 'Este campo es obligatorio';
    if (!aceptacionTerminos) formErrors.aceptacionTerminos = 'Debes aceptar los términos para continuar';
    setErrors(formErrors);
    console.log("Errores del formulario:", formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit se ha llamado');
    setSubmitError(''); // Reiniciar el mensaje de error
    const token = localStorage.getItem('token');

    if (validateForm() && token && userId) {
      const data = {
        id_mascota: idMascota,
        estado: 'pendiente',
        tipo_vivienda: tipoVivienda.toString(),
        otra_mascota: otrosAnimales === 'Sí',
        experiencia: experiencia === 'Sí',
        descripcion_experiencia: descripcionExperiencia,
        razones: razones,
        contacto: contacto,
    };

      try {
        console.log("Datos a enviar:", data);
        const response = await fetch(`${backendUrl}/solicitudes/crear`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          console.log('Solicitud enviada con éxito');
          navigate(-1); // Redirige a la página de inicio solo si la solicitud es exitosa
        } else {
          const errorData = await response.json();
          setSubmitError(errorData.error || 'Error al enviar la solicitud');
          console.error('Error al enviar la solicitud:', errorData);
        }
      } catch (error) {
        setSubmitError('Error en la conexión con el servidor');
        console.error('Error en la conexión:', error);
      }
    } else {
      console.log("Formulario no válido o falta de token/userId");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="adoption-form-container">
        <h2>Solicitud de Adopción</h2>

        <div>
          <label className="section-title">Seleccione su tipo de vivienda:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="Casa"
                checked={tipoVivienda.includes('Casa')}
                onChange={() => handleCheckboxChange('Casa', setTipoVivienda, tipoVivienda)}
              />
              Casa
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="Departamento"
                checked={tipoVivienda.includes('Departamento')}
                onChange={() => handleCheckboxChange('Departamento', setTipoVivienda, tipoVivienda)}
              />
              Departamento
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="Con patio"
                checked={tipoVivienda.includes('Con patio')}
                onChange={() => handleCheckboxChange('Con patio', setTipoVivienda, tipoVivienda)}
              />
              Con patio
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="Sin patio"
                checked={tipoVivienda.includes('Sin patio')}
                onChange={() => handleCheckboxChange('Sin patio', setTipoVivienda, tipoVivienda)}
              />
              Sin patio
            </label>
          </div>
          {errors.tipoVivienda && <p className="error-message">{errors.tipoVivienda}</p>}
        </div>
        <br />

        <div>
          <label className="section-title">¿Tienes otros animales en el hogar?</label>
          <div>
            <label>
              <input
                type="radio"
                name="otrosAnimales"
                value="Sí"
                checked={otrosAnimales === 'Sí'}
                onChange={() => setOtrosAnimales('Sí')}
              />
              Sí
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="otrosAnimales"
                value="No"
                checked={otrosAnimales === 'No'}
                onChange={() => setOtrosAnimales('No')}
              />
              No
            </label>
          </div>
          {errors.otrosAnimales && <p className="error-message">{errors.otrosAnimales}</p>}
        </div>
        <br />

        <div>
          <label className="section-title">¿Has tenido mascotas antes?</label>
          <div>
            <label>
              <input
                type="radio"
                name="experiencia"
                value="Sí"
                checked={experiencia === 'Sí'}
                onChange={() => setExperiencia('Sí')}
              />
              Sí
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="experiencia"
                value="No"
                checked={experiencia === 'No'}
                onChange={() => setExperiencia('No')}
              />
              No
            </label>
          </div>
          {errors.experiencia && <p className="error-message">{errors.experiencia}</p>}
          <br />
          <label className="section-title">Descripción de tu experiencia (opcional)</label>
          <textarea
            value={descripcionExperiencia}
            onChange={(e) => setDescripcionExperiencia(e.target.value)}
            placeholder="Describe tu experiencia con mascotas"
          ></textarea>
        </div>

        <div>
          <label className="section-title">Razones para adoptar</label>
          <textarea
            name="razones" 
            value={razones}
            onChange={(e) => setRazones(e.target.value)}
            placeholder="Explica tus motivos para adoptar"
          ></textarea>
          {errors.razones && <p className="error-message">{errors.razones}</p>}
        </div>

        <div>
          <label className="section-title">Información de Contacto</label>
          <input
            name="contacto" 
            type="text"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="Ingresa tu número de teléfono o correo"
          />
          {errors.contacto && <p className="error-message">{errors.contacto}</p>}
        </div>

        <div>
          <input
            type="checkbox"
            checked={aceptacionTerminos}
            onChange={(e) => setAceptacionTerminos(e.target.checked)}
          />
          <label>Acepto los términos y condiciones de adopción</label>
          {errors.aceptacionTerminos && <p className="error-message">{errors.aceptacionTerminos}</p>}
        </div>
        <br />

        {submitError && <p className="error-message">{submitError}</p>}

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default AdoptionRequestForm;
