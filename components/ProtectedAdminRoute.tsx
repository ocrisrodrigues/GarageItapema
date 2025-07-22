import { useAuth } from "./context/AuthContext";
import { AdminLogin } from "./AdminLogin";
import { AdminPage } from "./pages/AdminPage";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function ProtectedAdminRoute() {
  const { isAuthenticated, logout } = useAuth();

  // Debug: sempre mostrar que chegou aqui
  console.log("ProtectedAdminRoute: isAuthenticated =", isAuthenticated);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header do Admin */}
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-lg text-primary">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Itapema Garage Eventos</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
      
      {/* Conteúdo do Admin */}
      <AdminPage />
    </div>
  );
}