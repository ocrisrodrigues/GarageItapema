import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEvents } from "./context/EventsContext";
import { Link } from "react-router-dom";

export function Hero() {
  const { getApprovedEvents } = useEvents();
  
  // Array de imagens para o carrossel
  const heroImages = [
    "https://images.unsplash.com/photo-1745401381326-29c84d9ee9e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnQlMjBvbGQlMjBjYXJ8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1665760027818-3b8f1d3db0a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxldmVudCUyMG9sZCUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1663581255238-5eef8be04228?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQ3fHxldmVudCUyMG9sZCUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D"
  ];
  
  // Estado para controlar qual imagem está sendo exibida
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Efeito para rotação automática das imagens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Alterna a cada 5 segundos
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  // Função para obter o próximo evento
  const getNextEvent = () => {
    const events = getApprovedEvents();
    if (events.length === 0) return null;
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time for date comparison
    
    // Converter datas dos eventos e filtrar eventos futuros
    const upcomingEvents = events
      .map(event => {
        // Assumindo que as datas estão no formato "DD/MM/YYYY" ou similar
        const dateParts = event.date.split(/[\/\-\.]/);
        let eventDate;
        
        // Tentar diferentes formatos de data
        if (dateParts.length === 3) {
          // DD/MM/YYYY
          if (dateParts[0].length <= 2) {
            eventDate = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
          } 
          // YYYY/MM/DD
          else {
            eventDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
          }
        } else {
          // Tentar parseamento direto
          eventDate = new Date(event.date);
        }
        
        return {
          ...event,
          parsedDate: eventDate
        };
      })
      .filter(event => event.parsedDate >= currentDate)
      .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());
    
    return upcomingEvents.length > 0 ? upcomingEvents[0] : events[0]; // Se não há eventos futuros, retorna o primeiro
  };

  const nextEvent = getNextEvent();

  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl lg:text-5xl mb-6 text-primary leading-tight">
              Encontros de<br />
              <span className="text-orange-500">Carros Clássicos</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Junte-se à comunidade mais apaixonada por carros antigos de Santa Catarina. 
              Eventos mensais, amizades reais e muito conhecimento compartilhado.
            </p>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div>
                <div className="text-lg text-primary">200+</div>
                <div>Membros</div>
              </div>
              <div>
                <div className="text-lg text-primary">50+</div>
                <div>Eventos</div>
              </div>
              <div>
                <div className="text-lg text-primary">8+</div>
                <div>Anos</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Container com posição relativa para as imagens */}
              <div className="relative w-full h-[500px]">
                {heroImages.map((image, index) => (
                  <ImageWithFallback
                    key={index}
                    src={image}
                    alt={`Encontro de carros clássicos Itapema Garage Eventos Automotivos - ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Indicadores de imagem */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-110' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating card - Próximo Evento */}
            {nextEvent ? (
              <Link to={`/evento/${nextEvent.id}`}>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-border hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-orange-500 uppercase tracking-wide">Próximo evento</h4>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate group-hover:text-orange-500 transition-colors">
                        {nextEvent.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {nextEvent.date} às {nextEvent.time}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {nextEvent.location}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </div>
              </Link>
            ) : (
              // Fallback se não houver eventos
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-border">
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-orange-500 uppercase tracking-wide">Próximo evento</h4>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Em breve</div>
                    <div className="text-xs text-muted-foreground">Novos eventos serão divulgados</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}