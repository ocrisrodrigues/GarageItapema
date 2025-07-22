import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, MapPin, Clock, ArrowLeft, Phone, Mail, User, DollarSign, ExternalLink, Expand, Handshake, Share2, Copy, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ImageModal } from "../ImageModal";
import { useEvents } from "../context/EventsContext";
import { toast } from "sonner@2.0.3";

const formatPrice = (price: number, isFree: boolean) => {
  if (isFree || price === 0) return 'Gratuito';
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

// Componente para botão de compartilhamento
const ShareEventButton = ({ event }: { event: any }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  const eventUrl = window.location.href;
  const eventTitle = event.title;
  const eventDate = event.date;
  const eventLocation = event.location;
  
  const shareText = `🚗 ${eventTitle}\n📅 ${eventDate}\n📍 ${eventLocation}\n\nConfira mais detalhes:`;
  
  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + eventUrl)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: Share2,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: Share2,
      color: 'bg-gray-900 hover:bg-gray-800',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(eventUrl)}`;
        window.open(twitterUrl, '_blank');
      }
    },
    {
      name: 'Copiar Link',
      icon: Copy,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: async () => {
        try {
          await navigator.clipboard.writeText(eventUrl);
          toast.success('Link copiado para a área de transferência!');
        } catch (error) {
          // Fallback para navegadores que não suportam clipboard API
          const textArea = document.createElement('textarea');
          textArea.value = eventUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          toast.success('Link copiado para a área de transferência!');
        }
      }
    }
  ];

  return (
    <div className="relative">
      <Button
        onClick={() => setIsShareOpen(!isShareOpen)}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Compartilhar Evento
      </Button>
      
      {isShareOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsShareOpen(false)}
          />
          
          {/* Menu de compartilhamento */}
          <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white border border-border rounded-lg shadow-lg p-2">
            <div className="space-y-1">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.action();
                    setIsShareOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-white text-sm transition-colors ${option.color}`}
                >
                  <option.icon className="w-4 h-4 mr-2" />
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Componente para exibir mapa funcional
const EventMap = ({ address, location }: { address: string; location: string }) => {
  // Encode o endereço completo para URLs
  const fullAddress = `${location}, ${address}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  
  // URLs dos diferentes serviços de mapa
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}`;
  const openStreetMapUrl = `https://www.openstreetmap.org/search?query=${encodedAddress}`;
  
  return (
    <div className="w-full space-y-4">
      {/* Mapa incorporado funcional */}
      <div className="w-full h-64 border border-border rounded-lg overflow-hidden bg-muted/20">
        <iframe
          src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title="Localização do evento"
          className="rounded-lg"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      
      {/* Links para mapas externos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 inline-flex items-center justify-center px-3 py-2 rounded-lg transition-colors"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          Google Maps
        </a>
        
        <a
          href={wazeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white bg-purple-600 hover:bg-purple-700 inline-flex items-center justify-center px-3 py-2 rounded-lg transition-colors"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          Waze
        </a>
        
        <a
          href={openStreetMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white bg-green-600 hover:bg-green-700 inline-flex items-center justify-center px-3 py-2 rounded-lg transition-colors"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          OpenStreetMap
        </a>
      </div>
      
      {/* Endereço completo para copiar */}
      <div className="bg-muted/50 p-4 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground mb-2 font-medium">Endereço completo:</p>
        <p className="text-sm select-all cursor-text bg-background p-2 rounded border">
          {fullAddress}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          💡 Clique para selecionar e copiar o endereço
        </p>
      </div>
    </div>
  );
};

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  if (!id) {
    return <Navigate to="/" replace />;
  }
  
  const event = getEventById(id);
  
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Evento não encontrado</h1>
          <Link to="/">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
              Voltar para início
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para eventos
          </Link>
        </div>

        {/* Hero do Evento */}
        <div className="mb-8">
          <div 
            className="relative rounded-2xl overflow-hidden mb-6 group cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          >
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            
            {/* Ícone de expandir */}
            <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <Expand className="w-5 h-5 text-white" />
            </div>
            
            {/* Indicador de clique */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-black/70 rounded-lg px-4 py-2 backdrop-blur-sm">
                <p className="text-white text-sm flex items-center">
                  <Expand className="w-4 h-4 mr-2" />
                  Clique para ampliar
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 text-white">
              <div className="mb-4">
                <Badge className={event.isFree ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'}>
                  {formatPrice(event.price, event.isFree)}
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl mb-2">{event.title}</h1>
              <p className="text-lg text-gray-200">Organizado por {event.organizer}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrição */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl mb-4">Sobre o Evento</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.longDescription}
                </div>
              </CardContent>
            </Card>

            {/* Requisitos do Evento */}
            {event.requirements.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Requisitos e Informações Importantes</h3>
                  <ul className="space-y-2">
                    {event.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Mapa da Localização */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl mb-4 flex items-center">
                  <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                  Localização
                </h3>
                <div className="mb-4">
                  <div className="mb-4">
                    <div className="text-sm font-medium">{event.location}</div>
                    <div className="text-sm text-muted-foreground">{event.address}</div>
                  </div>
                </div>
                <EventMap address={event.address} location={event.location} />
              </CardContent>
            </Card>

            {/* Patrocinadores */}
            {event.sponsors.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center">
                    <Handshake className="w-5 h-5 text-orange-500 mr-2" />
                    Patrocinadores
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.sponsors.map((sponsor, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <ImageWithFallback
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium">{sponsor.name}</h4>
                            {sponsor.website && (
                              <a 
                                href={sponsor.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-600"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          {sponsor.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {sponsor.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações do Evento */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-orange-500 mr-2" />
                  Informações do Evento
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-sm font-medium">Data</div>
                      <div className="text-sm text-muted-foreground">{event.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-sm font-medium">Horário</div>
                      <div className="text-sm text-muted-foreground">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Local</div>
                      <div className="text-sm text-muted-foreground">{event.location}</div>
                      <div className="text-xs text-muted-foreground mt-1">{event.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-sm font-medium">Valor</div>
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(event.price, event.isFree)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizador */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center">
                  <User className="w-5 h-5 text-orange-500 mr-2" />
                  Organizador
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-orange-500" />
                    <span className="text-sm">{event.organizer}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <a href={`mailto:${event.organizerEmail}`} className="text-sm text-muted-foreground hover:text-primary">
                      {event.organizerEmail}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <a href={`tel:${event.organizerPhone}`} className="text-sm text-muted-foreground hover:text-primary">
                      {event.organizerPhone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compartilhar Evento */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center">
                  <Share2 className="w-5 h-5 text-orange-500 mr-2" />
                  Compartilhar
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Gostou do evento? Compartilhe com seus amigos!
                  </p>
                  <ShareEventButton event={event} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Imagem */}
        <ImageModal
          src={event.image}
          alt={event.title}
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        />
      </div>

      {/* Banner promocional - Divulgue seu evento */}
      <section className="relative py-24 overflow-hidden pt-16">
        {/* Imagem de fundo */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1729282840533-c93661b33b75?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU5fHxldmVudCUyMG9sZCUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Carro clássico vintage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        {/* Conteúdo */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-5xl mb-6">
            Divulgue Seu Evento
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
            Compartilhe sua paixão por carros clássicos com nossa comunidade. 
            Organize encontros, workshops e experiências inesquecíveis.
          </p>
          
          <Link to="/criar-evento">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg transition-colors text-lg shadow-xl">
              Divulgar Evento
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}