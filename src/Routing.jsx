import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import PaginaInicio from "./PaginaInicio";
import PerfilUsuario from "./PerfilUsuario";
import AdoptionRequestForm from "./SolicitudAdopcion";
import PetAdoptionRequests from "./Solicitudes";
import Registro from './Registro';
import Login from './Login';
import NavBar from './NavBar';

export default function Routing() {
    return (
        <BrowserRouter>

            <NavBar /> {/* Colocamos la barra de navegación */}

            <Routes>
                <Route path={'/inicio'} element={<PaginaInicio />} />
                <Route path={'/perfilusuario'} element={<PerfilUsuario />} />
                <Route path={'/'} element={<App />} />
                <Route path="/SolicitudAdopcion" element={<AdoptionRequestForm />} />
                <Route path="/Solicitudes" element={<PetAdoptionRequests />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
            </Routes>
        </BrowserRouter>
    );
}
