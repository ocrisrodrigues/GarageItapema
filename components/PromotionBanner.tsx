import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Calendar, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

export function PromotionBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Card className="border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Conteúdo */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-orange-600 uppercase tracking-wider">Destaque seu evento</span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl mb-4 text-primary">
                  Organize o Seu Próprio Evento
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Tem uma ideia incrível para um encontro de carros clássicos? Quer organizar um workshop, 
                  passeio ou exposição? Divulgue seu evento para nossa comunidade apaixonada e conecte-se 
                  com outros entusiastas!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm">Divulgação</div>
                      <div className="text-xs text-muted-foreground">Gratuita</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm">Comunidade</div>
                      <div className="text-xs text-muted-foreground">Engajada</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Star className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm">Aprovação</div>
                      <div className="text-xs text-muted-foreground">Rápida</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/criar-evento" className="flex-1">
                    <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0 group">
                      Criar Meu Evento
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <a href="#events" className="flex-1">
                    <Button size="lg" variant="outline" className="w-full">
                      Ver Eventos Ativos
                    </Button>
                  </a>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-sm text-blue-900">Workshop</div>
                          <div className="text-xs text-blue-600">15 participantes</div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-sm text-green-900">Encontro</div>
                          <div className="text-xs text-green-600">80 participantes</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="space-y-4 mt-8">
                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <div className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="text-sm text-purple-900">Exposição</div>
                          <div className="text-xs text-purple-600">50 participantes</div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="text-sm text-orange-900">Passeio</div>
                          <div className="text-xs text-orange-600">25 participantes</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}