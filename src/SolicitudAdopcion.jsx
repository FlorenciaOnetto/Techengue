import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SolicitudAdopcion.css';

const AdoptionRequestForm = () => {
  const navigate = useNavigate();

  // Estado para cada campo del formulario
  const [tipoVivienda, setTipoVivienda] = useState([]);
  const [otrosAnimales, setOtrosAnimales] = useState(null);
  const [experienciaPrevia, setExperienciaPrevia] = useState(null);
  const [descripcionExperiencia, setDescripcionExperiencia] = useState('');
  const [motivos, setMotivos] = useState('');
  const [aceptacionTerminos, setAceptacionTerminos] = useState(false);

  // Estado para los mensajes de error
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

    if (tipoVivienda.length === 0) {
      formErrors.tipoVivienda = 'Este campo es obligatorio';
    }

    if (otrosAnimales === null) {
      formErrors.otrosAnimales = 'Este campo es obligatorio';
    }

    if (experienciaPrevia === null) {
      formErrors.experienciaPrevia = 'Este campo es obligatorio';
    }

    if (!motivos) {
      formErrors.motivos = 'Este campo es obligatorio';
    }

    if (!aceptacionTerminos) {
      formErrors.aceptacionTerminos = 'Debes aceptar los términos para continuar';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        tipoVivienda,
        otrosAnimales,
        experienciaPrevia,
        descripcionExperiencia,
        motivos,
        aceptacionTerminos,
      };
      console.log(data);
      navigate('/'); // Redirige a la página de inicio
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="adoption-form-container">
        <h2>Solicitud de Adopción</h2>

        {/* Tipo de Vivienda */}
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
        {/* Otros Animales */}
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
      {/* Experiencia con Mascotas */}
      <div>
        <label className="section-title">¿Has tenido mascotas antes?</label>
        <div>
          <label>
            <input
              type="radio"
              name="experienciaPrevia"
              value="Sí"
              checked={experienciaPrevia === 'Sí'}
              onChange={() => setExperienciaPrevia('Sí')}
            />
            Sí
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="experienciaPrevia"
              value="No"
              checked={experienciaPrevia === 'No'}
              onChange={() => setExperienciaPrevia('No')}
            />
            No
          </label>
        </div>
        {errors.experienciaPrevia && <p className="error-message">{errors.experienciaPrevia}</p>}
        <br />
        <label className="section-title">Descripción de tu experiencia (opcional)</label>
        <textarea
          value={descripcionExperiencia}
          onChange={(e) => setDescripcionExperiencia(e.target.value)}
          placeholder="Describe tu experiencia con mascotas"
        ></textarea>
      </div>

      {/* Motivos para Adoptar */}
      <div>
        <label className="section-title">Motivos para adoptar</label>
        <textarea
          value={motivos}
          onChange={(e) => setMotivos(e.target.value)}
          placeholder="Explica tus motivos para adoptar"
        ></textarea>
        {errors.motivos && <p className="error-message">{errors.motivos}</p>}
      </div>

      {/* Aceptación de Términos */}
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
      {/* Botón de Enviar */}
      <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default AdoptionRequestForm;

