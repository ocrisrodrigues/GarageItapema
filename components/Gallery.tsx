import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const cars = [
  {
    id: 1,
    name: "Volkswagen Fusca 1975",
    year: "1975",
    owner: "João Silva",
    image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=300&fit=crop",
    category: "Nacional"
  },
  {
    id: 2,
    name: "Ford Maverick GT 1974",
    year: "1974",
    owner: "Maria Santos",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    category: "Muscle Car"
  },
  {
    id: 3,
    name: "Chevrolet Opala SS 1976",
    year: "1976",
    owner: "Carlos Oliveira",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop",
    category: "Nacional"
  },
  {
    id: 4,
    name: "Puma GTE 1978",
    year: "1978",
    owner: "Ana Costa",
    image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=400&h=300&fit=crop",
    category: "Esportivo"
  },
  {
    id: 5,
    name: "Dodge Charger R/T 1970",
    year: "1970",
    owner: "Roberto Lima",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop",
    category: "Muscle Car"
  },
  {
    id: 6,
    name: "Chevrolet Camaro SS 1969",
    year: "1969",
    owner: "Pedro Alves",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "Muscle Car"
  }
];

export function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">Galeria de Carros</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça alguns dos carros mais incríveis da nossa comunidade. 
            Cada um com sua história e paixão.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src={car.image}
                alt={car.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {car.category}
                </Badge>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg mb-1">{car.name}</h3>
                <p className="text-sm text-gray-300">Proprietário: {car.owner}</p>
                <p className="text-sm text-gray-300">Ano: {car.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Galeria Completa
          </Button>
        </div>
      </div>
    </section>
  );
}