import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import PaginaInicio from "./PaginaInicio"

export default function Routing() {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/inicio'} element={<PaginaInicio/>}/>
                <Route path={'/'} element={<App/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}