import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ✅ Interfaz actualizada con los nuevos campos de negocio
interface Usuario {
  nombre: string;
  email: string;
  region?: string;
  comuna?: string;
  rol?: "user" | "admin";
  // Nuevos campos opcionales
  telefono?: string;
  fechaNacimiento?: string;
  descuento?: number; // Porcentaje de descuento
  puntos?: number;    // Puntos de gamificación
  nivel?: string;     // Nivel (Novato, Pro, Leyenda)
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (user: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) setUsuario(JSON.parse(stored));
  }, []);

  const login = (user: Usuario) => {
    setUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};