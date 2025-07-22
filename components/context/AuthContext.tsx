import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verificar se já está autenticado no sessionStorage
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });

  const login = (username: string, password: string): boolean => {
    console.log("Tentativa de login:", username, password);
    
    // Verificar credenciais hardcoded
    if (username === 'garageadmin' && password === '@1234#') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      console.log("Login bem-sucedido!");
      return true;
    }
    
    console.log("Login falhou - credenciais incorretas");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    console.log("Logout realizado");
  };

  // Debug: log do estado atual
  useEffect(() => {
    console.log("AuthContext - isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const value = {
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}