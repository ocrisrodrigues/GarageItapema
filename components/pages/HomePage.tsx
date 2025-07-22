import { Hero } from "../Hero";
import { FeaturedEvents } from "../FeaturedEvents";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Seção de eventos com carrossel */}
      <FeaturedEvents />

      {/* Banner promocional */}
      <section className="relative py-24 overflow-hidden">
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

      {/* Seção Sobre */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4 text-primary">
              Uma comunidade apaixonada por carros clássicos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A Itapema Garage Eventos Automotivos conecta entusiastas e preserva a história automobilística 
              desde 2016 através de encontros especiais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-2xl text-primary mb-2">200+</div>
              <div className="text-sm text-primary mb-1">Membros Ativos</div>
              <div className="text-xs text-muted-foreground">Apaixonados por clássicos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary mb-2">50+</div>
              <div className="text-sm text-primary mb-1">Eventos Realizados</div>
              <div className="text-xs text-muted-foreground">Encontros inesquecíveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary mb-2">8+</div>
              <div className="text-sm text-primary mb-1">Anos de História</div>
              <div className="text-xs text-muted-foreground">Construindo amizades</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl mb-6 text-primary">Nossa História</h3>
              <div className="space-y-6">
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
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://scontent.fpoa28-1.fna.fbcdn.net/v/t39.30808-6/470805076_1120510789632333_8980922977637057550_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-2i8cIZc3oAQ7kNvwGMkOcO&_nc_oc=Admr3tdov8_tjG0F6UDstCASoqq2AMvfQadIlSG2cntQbDXZkZSOxzhVqi8iZ_ORx-c_5p39UwEVc5FzlytpYAlU&_nc_zt=23&_nc_ht=scontent.fpoa28-1.fna&_nc_gid=SIkrhRV1n-KGH_nTThrvuQ&oh=00_AfMfq4UkWzPWrUJAhgJhVN-uH12KDNiU6rv0lu6Nrqbh8Q&oe=68639B85"
                alt="Comunidade Itapema Garage Eventos Automotivos"
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}