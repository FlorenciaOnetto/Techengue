
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import PaginaInicio from "./PaginaInicio";
import PerfilUsuario from "./PerfilUsuario";
import AdoptionRequestForm from "./SolicitudAdopcion"
import PetAdoptionRequests from "./Solicitudes"


export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/inicio'} element={<PaginaInicio />} />
                <Route path={'/perfilusuario'} element={<PerfilUsuario />} />
                <Route path={'/'} element={<App />} />
                <Route path={"/SolicitudAdopcion"} element={<AdoptionRequestForm/>} />
                <Route path={"/Solicitudes"} element={<PetAdoptionRequests/>} />
            </Routes>
        </BrowserRouter>
    );
}
