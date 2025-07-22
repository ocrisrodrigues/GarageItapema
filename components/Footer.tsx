import { Wrench, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "figma:asset/a432fd4cbbd3c435c51d301e463221fbcb5d512c.png";

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage} 
                alt="Itapema Garage Eventos Automotivos" 
                className="h-10 w-10 object-contain rounded-full"
              />
              <div>
                <div className="text-lg">ITAPEMA GARAGE</div>
                <div className="text-xs text-orange-400 -mt-1 tracking-wider">EVENTOS AUTOMOTIVOS</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Conectando apaixonados por carros clássicos em Itapema e região. 
              Participe dos nossos eventos e faça parte da nossa comunidade.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>São Leopoldo - RS, Brasil</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-orange-400" />
                <a href="mailto:contato@itapemagarage.com.br" className="hover:text-white transition-colors">
                  contato@itapemagarage.com.br
                </a>
              </div>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          {/* Eventos */}
          <div>
            <h4 className="mb-4">Eventos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/criar-evento" className="hover:text-white transition-colors">
                  Criar Evento
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-white transition-colors">
                  Próximos Eventos
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  Administração
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Itapema Garage Eventos Automotivos. Todos os direitos reservados. Feito com ❤️ para a comunidade de carros clássicos.
          </p>
        </div>
      </div>
    </footer>
  );
}