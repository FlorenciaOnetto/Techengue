import { BrowserRouter, Routes, Route } from "react-router-dom"
import PaginaInicio from "./PaginaInicio"

export default function Routing() {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<PaginaInicio/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}