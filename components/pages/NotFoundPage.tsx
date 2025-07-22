import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "../ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="max-w-md w-full mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔧</div>
          <h1 className="text-4xl mb-4 text-primary">Página não encontrada</h1>
          <p className="text-muted-foreground mb-8">
            Oops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
          
          <Link to="/eventos" className="block">
            <Button variant="outline" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Ver Eventos
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à Página Anterior
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Se você acredita que isso é um erro, use o menu acima para navegar pelo site.</p>
        </div>
      </div>
    </div>
  );
}