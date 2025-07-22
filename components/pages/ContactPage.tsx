import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export function ContactPage() {
  const handleEmailClick = () => {
    window.location.href = "mailto:cristianrodrigues.da@gmail.com?subject=Contato Itapema Garage";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Entre em Contato</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou quer saber mais sobre a Itapema Garage? 
            Estamos aqui para ajudar!
          </p>
        </div>

        {/* Informações de Contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg border border-border">
            <Mail className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <h3 className="mb-2">E-mail</h3>
            <p className="text-muted-foreground mb-4">Envie uma mensagem</p>
            <button 
              onClick={handleEmailClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              cristianrodrigues.da@gmail.com
            </button>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-border">
            <Phone className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <h3 className="mb-2">Telefone</h3>
            <p className="text-muted-foreground mb-4">Ligue para nós</p>
            <a 
              href="tel:+5547999999999"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors inline-block"
            >
              (47) 99999-9999
            </a>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-border">
            <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <h3 className="mb-2">Localização</h3>
            <p className="text-muted-foreground mb-4">Onde estamos</p>
            <div className="text-sm">
              Itapema - SC<br />
              Santa Catarina, Brasil
            </div>
          </div>
        </div>

        {/* Formulário Simples */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg border border-border">
            <h2 className="text-2xl mb-6 text-center">Envie sua Mensagem</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const name = formData.get('name');
              const email = formData.get('email');
              const message = formData.get('message');
              
              const mailtoLink = `mailto:cristianrodrigues.da@gmail.com?subject=Contato de ${name}&body=Nome: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMensagem:%0D%0A${message}`;
              window.location.href = mailtoLink;
            }}>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">Nome *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm mb-2">Mensagem *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Escreva sua mensagem aqui..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 text-center">
          <div className="bg-muted/30 p-8 rounded-lg">
            <h3 className="text-xl mb-4">Horário de Atendimento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Segunda a Sexta</strong><br />
                8h às 18h
              </div>
              <div>
                <strong>Sábado</strong><br />
                8h às 12h
              </div>
              <div>
                <strong>Domingo</strong><br />
                Fechado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}