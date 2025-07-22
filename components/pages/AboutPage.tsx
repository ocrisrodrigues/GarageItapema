import { About } from "../About";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl mb-6 text-primary">
            Sobre a Itapema Garage
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conectando apaixonados por carros clássicos desde 2016, preservando histórias 
            e criando memórias inesquecíveis através de encontros especiais.
          </p>
        </div>
      </section>

      {/* About Component */}
      <About />

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4 text-primary">Nossa Missão</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preservar a história automobilística e conectar pessoas através da paixão por carros clássicos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-xl mb-4 text-primary">Preservação</h3>
              <p className="text-muted-foreground">
                Mantemos viva a história dos automóveis clássicos através de encontros e eventos especiais.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl mb-4 text-primary">Comunidade</h3>
              <p className="text-muted-foreground">
                Conectamos pessoas que compartilham a mesma paixão, criando amizades duradouras.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl mb-4 text-primary">Conhecimento</h3>
              <p className="text-muted-foreground">
                Compartilhamos conhecimento sobre restauração, manutenção e história automobilística.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}