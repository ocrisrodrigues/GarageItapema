import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Wrench, Paintbrush, Cog, Zap, Shield, Star } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Restauração Completa",
    description: "Restauração total de carros clássicos com atenção aos detalhes originais e qualidade premium.",
    features: ["Motor", "Chassi", "Elétrica", "Acabamentos"]
  },
  {
    icon: Paintbrush,
    title: "Pintura Automotiva",
    description: "Pintura profissional com cabine própria, desde retoque até pintura completa.",
    features: ["Cabine de Pintura", "Cores Originais", "Verniz UV", "Acabamento Premium"]
  },
  {
    icon: Cog,
    title: "Mecânica Especializada",
    description: "Manutenção e reparo de motores clássicos com peças originais ou adaptadas.",
    features: ["Motores Antigos", "Carburação", "Ignição", "Transmissão"]
  },
  {
    icon: Zap,
    title: "Elétrica Automotiva",
    description: "Sistema elétrico completo para carros antigos, incluindo conversões modernas.",
    features: ["Fiação Completa", "Alternador", "Bateria", "Iluminação"]
  },
  {
    icon: Shield,
    title: "Customização",
    description: "Personalização respeitando as características originais do veículo.",
    features: ["Rodas", "Suspensão", "Interior", "Acessórios"]
  },
  {
    icon: Star,
    title: "Consultoria",
    description: "Orientação para compra, venda e avaliação de carros clássicos.",
    features: ["Avaliação", "Documentação", "Histórico", "Investimento"]
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos serviços completos para seu carro clássico, desde pequenos reparos 
            até restaurações completas com qualidade profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500/10 p-3 rounded-lg">
                    <service.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-black text-white p-8 rounded-lg">
            <h3 className="text-2xl mb-4">Orçamento Gratuito</h3>
            <p className="text-gray-300 mb-6">
              Entre em contato conosco para um orçamento personalizado para seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <span className="text-orange-500">📞</span>
                <span>(47) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orange-500">📧</span>
                <span>contato@itapemagarage.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}