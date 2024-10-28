import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import PaginaInicio from "./PaginaInicio"
import AdoptionRequestForm from "./SolicitudAdopcion"

export default function Routing() {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/inicio'} element={<PaginaInicio/>}/>
                <Route path={'/'} element={<App/>}/>
                <Route path={"/SolicitudAdopcion"} element={<AdoptionRequestForm/>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}