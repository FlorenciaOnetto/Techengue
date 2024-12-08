import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        // Comprobar si hay datos en el localStorage al cargar la app
        const token = localStorage.getItem("token");
        const nombreGuardado = localStorage.getItem("nombre");

        if (token && nombreGuardado) {
            setIsAuthenticated(true);
            setNombre(nombreGuardado);
        } else {
            setIsAuthenticated(false);
            setNombre('');
        }
    }, []);

    const login = (nombre) => {
        setIsAuthenticated(true);
        setNombre(nombre);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setNombre('');
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, nombre, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
