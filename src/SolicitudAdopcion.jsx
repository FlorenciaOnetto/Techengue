import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './SolicitudAdopcion.css'; // Importa el archivo CSS

const AdoptionRequestForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/'); //redirige a la pagina de inicio
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="adoption-form-container">
      <h2>Solicitud de Adopción</h2>

      {/* Tipo de Vivienda */}
      <div>
        <label className="section-title">Seleccione su tipo de vivienda:</label>
        <div>
          <label>
            <input type="checkbox" value="Casa" {...register("tipoVivienda", { required: "Este campo es obligatorio" })} />
            Casa
          </label>
          <br></br>
          <label>
            <input type="checkbox" value="Departamento" {...register("tipoVivienda", { required: "Este campo es obligatorio" })} />
            Departamento
          </label>
          <br></br>
          <label>
            <input type="checkbox" value="Con patio" {...register("tipoVivienda", { required: "Este campo es obligatorio" })} />
            Con patio
          </label>
          <br></br>
          <label>
            <input type="checkbox" value="Sin patio" {...register("tipoVivienda", { required: "Este campo es obligatorio" })} />
            Sin patio
          </label>
        </div>
        {errors.tipoVivienda && <p className="error-message">{errors.tipoVivienda.message}</p>}
      </div>

      {/* Otros Animales */}
      <div>
        <label className="section-title">¿Tienes otros animales en el hogar?</label>
        <div>
        <br></br>
        <input type="checkbox" {...register("otrosAnimales", { required: "Este campo es obligatorio" })} />
        <span>Sí</span>
        <br></br>
        <input type="checkbox" {...register("otrosAnimales", { required: "Este campo es obligatorio" })} />
        <span>No</span>
        </div>
        {errors.otrosAnimales && <p className="error-message">{errors.otrosAnimales.message}</p>}
      </div>
      

      {/* Experiencia con Mascotas */}
      <div>
        <label className="section-title">¿Has tenido mascotas antes?</label>
        <div>
        <br></br>
        <input type="checkbox" {...register("experienciaPrevia", { required: "Este campo es obligatorio" })} />
        <span>Sí</span>
        <br></br>
        <input type="checkbox" {...register("experienciaPrevia", { required: "Este campo es obligatorio" })} />
        <span>No</span>
        <div>
        {errors.experienciaPrevia && <p className="error-message">{errors.experienciaPrevia.message}</p>}
        </div>
        <br></br>
          <label className="section-title">Descripción de tu experiencia (opcional)</label>
          <textarea {...register("descripcionExperiencia")} placeholder="Describe tu experiencia con mascotas"></textarea>
        </div>
      </div>

      {/* Motivos para Adoptar */}
      <div>
        <label className="section-title">Motivos para adoptar</label>
        <textarea {...register("motivos", { required: "Este campo es obligatorio" })} placeholder="Explica tus motivos para adoptar"></textarea>
        {errors.motivos && <p className="error-message">{errors.motivos.message}</p>}
      </div>

      {/* Aceptación de Términos */}
      <div>
        <input type="checkbox" {...register("aceptacionTerminos", { required: "Debes aceptar los términos para continuar" })} />
        <label>Acepto los términos y condiciones de adopción</label>
        {errors.aceptacionTerminos && <p className="error-message">{errors.aceptacionTerminos.message}</p>}
      </div>

      {/* Botón de Enviar */}
      <button type="submit">Enviar Solicitud</button>
    </form>
  );
};

export default AdoptionRequestForm;
