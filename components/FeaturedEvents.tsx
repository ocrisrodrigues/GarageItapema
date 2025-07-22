import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Clock, ArrowRight, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEvents } from "./context/EventsContext";
import { Link } from "react-router-dom";

const formatPrice = (price: number, isFree: boolean) => {
  if (isFree || price === 0) return 'Gratuito';
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

export function FeaturedEvents() {
  const { getApprovedEvents } = useEvents();
  const events = getApprovedEvents();
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 3;
  
  // Calcular o número total de páginas
  const totalPages = Math.ceil(events.length / eventsPerPage);
  
  // Obter eventos da página atual
  const getCurrentPageEvents = () => {
    const startIndex = currentPage * eventsPerPage;
    return events.slice(startIndex, startIndex + eventsPerPage);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0); // Loop para o início
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(totalPages - 1); // Loop para o final
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  // Auto-play do carrossel (opcional)
  useEffect(() => {
    if (totalPages > 1) {
      const interval = setInterval(() => {
        goToNextPage();
      }, 5000); // Muda a cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [currentPage, totalPages]);

  const EventCard = ({ event }: { event: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 h-full flex flex-col">
      <div className="relative">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-36 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary"
            className={event.isFree ? 'bg-green-100 text-green-700 border-green-200 text-xs' : 'bg-blue-100 text-blue-700 border-blue-200 text-xs'}
          >
            {formatPrice(event.price, event.isFree)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg mb-2 text-primary line-clamp-2">
          {event.title}
        </h3>
        <p className="text-muted-foreground mb-3 text-sm leading-relaxed flex-grow line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
            <span className="truncate">{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
            <span className="truncate">{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
            <span className="truncate">{formatPrice(event.price, event.isFree)}</span>
          </div>
        </div>
        
        <Link to={`/evento/${event.id}`} className="mt-auto">
          <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0 group">
            Ver Detalhes
            <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  if (events.length === 0) {
    return (
      <section id="events" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4 text-primary">Próximos Eventos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Participe dos nossos encontros e conecte-se com outros apaixonados por carros clássicos.
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Nenhum evento disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4 text-primary">Próximos Eventos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Participe dos nossos encontros e conecte-se com outros apaixonados por carros clássicos.
          </p>
        </div>

        <div className="relative">
          {/* Container do carrossel */}
          <div className="relative">
            {/* Grid de eventos da página atual */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[420px]">
              {getCurrentPageEvents().map((event) => (
                <div key={event.id}>
                  <EventCard event={event} />
                </div>
              ))}
              
              {/* Slots vazios para manter o layout consistente */}
              {getCurrentPageEvents().length < eventsPerPage && (
                <>
                  {Array.from({ length: eventsPerPage - getCurrentPageEvents().length }).map((_, index) => (
                    <div key={`empty-${index}`} className="hidden lg:block"></div>
                  ))}
                </>
              )}
            </div>

            {/* Botões de navegação */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={goToPreviousPage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white border-2 border-orange-500/20 hover:border-orange-500 text-orange-500 hover:text-orange-600 rounded-full p-2.5 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <button
                  onClick={goToNextPage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white border-2 border-orange-500/20 hover:border-orange-500 text-orange-500 hover:text-orange-600 rounded-full p-2.5 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Próxima página"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Indicadores de paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    index === currentPage
                      ? 'bg-orange-500 scale-110'
                      : 'bg-orange-200 hover:bg-orange-300'
                  }`}
                  aria-label={`Ir para página ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Link para ver todos os eventos */}
        <div className="text-center mt-8">
          <Link to="/eventos">
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Ver Todos os Eventos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}