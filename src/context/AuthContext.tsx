import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ✅ Interfaz alineada con la respuesta del Backend y necesidades del Frontend
export interface Usuario {
  id: number; // Fundamental para crear pedidos (backend requiere usuarioId)
  nombre: string;
  email: string; // Mapeamos 'correo' a 'email' para consistencia interna o usamos 'correo'
  rol: "ADMIN" | "CLIENTE";
  
  // Datos opcionales si se cargan después
  telefono?: string;
  fechaNacimiento?: string;
  region?: string;
  comuna?: string;
  descuento?: number; 
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (authData: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    // Al cargar, intentamos recuperar la sesión
    const storedUser = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  // Recibe la respuesta completa del backend (AuthResponse)
  const login = (authData: any) => {
    // Guardamos el token para las peticiones
    localStorage.setItem("token", authData.token);

    // Construimos el objeto usuario para el estado global
    const user: Usuario = {
      id: authData.idUsuario,
      nombre: authData.nombreCompleto,
      email: authData.correo,
      rol: authData.rol,
      // Si el backend devuelve más datos en el futuro, se agregan aquí
    };

    localStorage.setItem("usuario", JSON.stringify(user));
    setUsuario(user);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};