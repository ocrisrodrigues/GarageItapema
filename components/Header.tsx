import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from 'figma:asset/abbebfc4a22782e5c6a75e09d156ed90d5b6c022.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logoImage}
              alt="Itapema Garage - Mecânica & Man Cave" 
              className="h-12 w-12 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-primary leading-tight">
                ITAPEMA GARAGE
              </span>
              <span className="text-xs text-orange-500 leading-tight uppercase">
                Eventos Automotivos
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${
                isActive('/') 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/eventos" 
              className={`text-sm transition-colors ${
                isActive('/eventos') 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Eventos
            </Link>
            <Link 
              to="/sobre" 
              className={`text-sm transition-colors ${
                isActive('/sobre') 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Sobre
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/criar-evento">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white border-0">
                Divulgue seu evento
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="flex flex-col py-4 space-y-3">
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/eventos" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Eventos
              </Link>
              <Link 
                to="/sobre" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link to="/criar-evento" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white border-0 mx-2 mt-2">
                  Divulgue seu evento
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}