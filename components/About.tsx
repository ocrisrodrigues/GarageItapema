import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar, Users, Heart, Trophy, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const stats = [
  {
    icon: Users,
    value: "200+",
    label: "Membros Ativos",
    description: "Apaixonados por carros clássicos"
  },
  {
    icon: Calendar,
    value: "50+",
    label: "Eventos Realizados",
    description: "Encontros inesquecíveis"
  },
  {
    icon: Heart,
    value: "8+",
    label: "Anos de História",
    description: "Construindo amizades"
  },
  {
    icon: Trophy,
    value: "15+",
    label: "Prêmios Conquistados",
    description: "Reconhecimento da comunidade"
  }
];

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 rounded-lg mb-4">
                <stat.icon className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-2xl text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-primary mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl mb-6 text-primary">
              Uma comunidade apaixonada por carros clássicos
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A Itapema Garage nasceu da paixão compartilhada por carros antigos e do desejo 
              de preservar a história automobilística. Desde 2016, organizamos encontros que 
              vão além da exposição de veículos.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-primary mb-2">Encontros Mensais</h4>
                  <p className="text-sm text-muted-foreground">
                    Todo terceiro sábado do mês nos reunimos para compartilhar nossa paixão.
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-primary mb-2">Eventos Especiais</h4>
                  <p className="text-sm text-muted-foreground">
                    Workshops, passeios e participações em eventos regionais.
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-primary mb-2">Conhecimento Compartilhado</h4>
                  <p className="text-sm text-muted-foreground">
                    Troca de experiências sobre restauração, manutenção e história.
                  </p>
                </div>
              </div>
            </div>
            
            <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0 group">
              Fazer parte da comunidade
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=500&fit=crop"
                alt="Comunidade Itapema Garage"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating testimonial */}
            <Card className="absolute -bottom-6 -left-6 max-w-xs border-0 shadow-lg">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Mais que carros, encontrei uma família. Cada encontro é uma nova história."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">JC</span>
                  </div>
                  <div>
                    <div className="text-xs text-primary">João Carlos</div>
                    <div className="text-xs text-muted-foreground">Membro desde 2018</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}