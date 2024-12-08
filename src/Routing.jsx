import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import PaginaInicio from "./PaginaInicio";
import PerfilUsuario from "./PerfilUsuario";
import AdoptionRequestForm from "./SolicitudAdopcion";
import PetAdoptionRequests from "./Solicitudes";
import Registro from './Registro';
import Login from './Login';
import NavBar from './NavBar';
import SolicitudDetalle from "./SolicitudDetalle";
import SolicitudEstado from "./SolicitudEstado";
import ResenaForm from "./Resena"; 
import PerfilMascota from "./PerfilMascota"; 
import PublicarMascota from './PublicarMascota';
import ResultadosBusqueda from "./ResultadosBusqueda";
import PrivateRoute from './PrivateRoute';  
import { AuthProvider } from './AuthContext';


export default function Routing() {

    return (
        <AuthProvider>
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path={'/inicio'} element={<PaginaInicio />} />
                <Route path={'/perfilusuario'} element={<PerfilUsuario />} />
                <Route path={'/SolicitudAdopcion/:idMascota'} element={<AdoptionRequestForm />}/>
                <Route path={'/Solicitudes'} element={<PetAdoptionRequests />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/registro'} element={<Registro />} />
                <Route path={'/request/:requestId'} element={<SolicitudDetalle />} />
                <Route path={'/SolicitudEstado'} element={<SolicitudEstado />} />
                <Route path={'/resena'} element={<ResenaForm />} /> 
                <Route path={'/perfilmascota/:idMascota'} element={<PerfilMascota />} /> 
                <Route path={"/publicar-mascota"} element={<PublicarMascota />} />
                <Route path={'/resultados'} element={<ResultadosBusqueda />} />
                <Route path={'/'} element={<App />} /> {/* Coloca la ruta raíz al final */}
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}
