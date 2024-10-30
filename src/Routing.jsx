import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import PaginaInicio from "./PaginaInicio";
import ResenaForm from "./ResenaForm"; // Importa el componente de reseña

export default function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/inicio" element={<PaginaInicio />} />
                <Route path="/resena" element={<ResenaForm />} /> {/* Nueva ruta para la vista de reseña */}
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}
