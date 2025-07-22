import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar, MapPin, Clock, ArrowRight, DollarSign, Filter, Search } from "lucide-react";
import { useEvents } from "../context/EventsContext";
import { Link } from "react-router-dom";

const formatPrice = (price: number, isFree: boolean) => {
  if (isFree || price === 0) return 'Gratuito';
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

const states = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

export function EventsPage() {
  const { getApprovedEvents } = useEvents();
  const events = getApprovedEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  // Extrair cidades únicas dos eventos
  const cities = useMemo(() => {
    const citySet = new Set();
    events.forEach(event => {
      // Extrair cidade do endereço (assumindo formato: "Rua, Bairro, Cidade - UF")
      const addressParts = event.address.split(',');
      if (addressParts.length >= 2) {
        const cityPart = addressParts[addressParts.length - 2].trim();
        // Remove " - UF" se existir
        const city = cityPart.replace(/\s*-\s*[A-Z]{2}$/, '').trim();
        if (city) {
          citySet.add(city);
        }
      }
    });
    return Array.from(citySet).sort();
  }, [events]);

  // Filtrar e ordenar eventos
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...events];

    // Aplicar filtros
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedState !== "all") {
      filtered = filtered.filter(event => event.address.includes(selectedState));
    }

    if (selectedCity !== "all") {
      filtered = filtered.filter(event => {
        const addressParts = event.address.split(',');
        if (addressParts.length >= 2) {
          const cityPart = addressParts[addressParts.length - 2].trim();
          const city = cityPart.replace(/\s*-\s*[A-Z]{2}$/, '').trim();
          return city === selectedCity;
        }
        return false;
      });
    }

    // Aplicar ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "free":
          if (a.isFree && !b.isFree) return -1;
          if (!a.isFree && b.isFree) return 1;
          return 0;
        case "price":
          if (a.isFree && b.isFree) return 0;
          if (a.isFree) return -1;
          if (b.isFree) return 1;
          return a.price - b.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, selectedState, selectedCity, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedState("all");
    setSelectedCity("all");
    setSortBy("recent");
  };

  return (
    <>
      <div className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl mb-4 text-primary">
              Todos os Eventos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra encontros incríveis de carros clássicos em todo o Brasil
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{filteredAndSortedEvents.length} eventos encontrados</span>
              </div>
            </div>

            {/* Filtros Expandidos */}
            {showFilters && (
              <Card className="p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm mb-2 block">Estado</label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os estados</SelectItem>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Cidade</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as cidades</SelectItem>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Ordenar por</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Mais recentes</SelectItem>
                        <SelectItem value="free">Gratuitos primeiro</SelectItem>
                        <SelectItem value="price">Menor valor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Limpar filtros
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Lista de Eventos */}
          {filteredAndSortedEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Nenhum evento encontrado</p>
                <p className="text-sm">Tente ajustar os filtros de busca</p>
              </div>
              <Button onClick={clearFilters} variant="outline">
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant="secondary"
                        className={event.isFree ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'}
                      >
                        {formatPrice(event.price, event.isFree)}
                      </Badge>
                    </div>
                    {event.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-500 text-white">
                          Destaque
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg mb-3 text-primary">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-grow">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-3 text-orange-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-3 text-orange-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-3 text-orange-500" />
                        {event.location}
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-3 text-orange-500" />
                        {formatPrice(event.price, event.isFree)}
                      </div>
                    </div>
                    
                    <Link to={`/evento/${event.id}`} className="mt-auto">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0 group">
                        Ver Detalhes
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Banner promocional - Full Width */}
      <section className="relative py-24 overflow-hidden">
        {/* Imagem de fundo */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&h=800&fit=crop"
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
    </>
  );
}