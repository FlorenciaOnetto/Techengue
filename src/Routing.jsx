import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import PaginaInicio from "./PaginaInicio"
import Registro from './Registro';
import Login from './Login';
import NavBar from './NavBar';

export default function Routing() {

    return (
        <>
        <BrowserRouter>

            <NavBar /> {/* Colocamos la barra de navegación */}

            <Routes>
                <Route path={'/inicio'} element={<PaginaInicio/>}/>
                <Route path={'/'} element={<App/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}