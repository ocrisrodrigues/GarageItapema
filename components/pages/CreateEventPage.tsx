import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { X, Plus, ArrowLeft } from "lucide-react";
import { useEvents, Sponsor } from "../context/EventsContext";
import { Link } from "react-router-dom";
import { ImageUploadField } from "../ImageUploadField";

export function CreateEventPage() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    date: '',
    time: '',
    location: '',
    address: '',
    organizer: '',
    organizerEmail: '',
    organizerPhone: '',
    image: '',
    featured: false,
    isFree: true,
    price: ''
  });

  const [requirements, setRequirements] = useState<string[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [newSponsor, setNewSponsor] = useState({
    name: '',
    logo: '',
    website: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageValue: string) => {
    setFormData(prev => ({
      ...prev,
      image: imageValue
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isFree: checked,
      price: checked ? '' : prev.price
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements(prev => [...prev, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const addSponsor = () => {
    if (newSponsor.name.trim()) {
      const sponsor: Sponsor = {
        name: newSponsor.name.trim(),
        logo: newSponsor.logo.trim() || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
        website: newSponsor.website.trim() || undefined,
        description: newSponsor.description.trim() || undefined
      };
      setSponsors(prev => [...prev, sponsor]);
      setNewSponsor({ name: '', logo: '', website: '', description: '' });
    }
  };

  const removeSponsor = (index: number) => {
    setSponsors(prev => prev.filter((_, i) => i !== index));
  };

  const handleSponsorChange = (field: string, value: string) => {
    setNewSponsor(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      price: formData.isFree ? 0 : parseFloat(formData.price.replace(',', '.')) || 0,
      requirements,
      sponsors,
      image: formData.image || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      // Removendo category e tags
      category: 'Evento',
      tags: []
    };

    addEvent(eventData);
    navigate('/', { state: { message: 'Evento enviado para moderação!' } });
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para início
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Criar Novo Evento</CardTitle>
            <p className="text-muted-foreground">
              Preencha as informações do seu evento. Após o envio, será analisado por nossa equipe antes da publicação.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg">Informações Básicas</h3>
                
                <div>
                  <Label htmlFor="title">Título do Evento *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Encontro de Carros Clássicos"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição Resumida *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Breve descrição do evento (aparece nos cards)"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="longDescription">Descrição Completa *</Label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleInputChange}
                    required
                    placeholder="Descrição detalhada do evento (aparece na página de detalhes)"
                    rows={6}
                  />
                </div>

                <ImageUploadField
                  label="Imagem do Evento"
                  value={formData.image}
                  onChange={handleImageChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  description="Se não informar, uma imagem padrão será usada"
                />
              </div>

              {/* Valor do Evento */}
              <div className="space-y-4">
                <h3 className="text-lg">Valor do Evento</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFree"
                    checked={formData.isFree}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="isFree">Evento gratuito</Label>
                </div>

                {!formData.isFree && (
                  <div>
                    <Label htmlFor="price">Valor em Reais *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required={!formData.isFree}
                      placeholder="Ex: 150.00"
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Informe o valor por pessoa
                    </p>
                  </div>
                )}
              </div>

              {/* Data e Local */}
              <div className="space-y-4">
                <h3 className="text-lg">Data e Local</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: 15 de Julho, 2025"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário *</Label>
                    <Input
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: 9h - 17h"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Local *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Centro de Itapema"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Endereço Completo *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Rua das Flores, 123, Centro, Itapema - SC"
                  />
                </div>

              </div>

              {/* Organizador */}
              <div className="space-y-4">
                <h3 className="text-lg">Dados do Organizador</h3>
                
                <div>
                  <Label htmlFor="organizer">Nome/Empresa *</Label>
                  <Input
                    id="organizer"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    required
                    placeholder="Seu nome ou nome da empresa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizerEmail">E-mail *</Label>
                    <Input
                      id="organizerEmail"
                      name="organizerEmail"
                      type="email"
                      value={formData.organizerEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="organizerPhone">Telefone *</Label>
                    <Input
                      id="organizerPhone"
                      name="organizerPhone"
                      value={formData.organizerPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="(47) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              {/* Patrocinadores */}
              <div className="space-y-4">
                <h3 className="text-lg">Patrocinadores (Opcional)</h3>
                
                <div className="space-y-3 p-4 border border-border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Nome do patrocinador"
                      value={newSponsor.name}
                      onChange={(e) => handleSponsorChange('name', e.target.value)}
                    />
                    <Input
                      placeholder="URL do logo (opcional)"
                      value={newSponsor.logo}
                      onChange={(e) => handleSponsorChange('logo', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Website (opcional)"
                      value={newSponsor.website}
                      onChange={(e) => handleSponsorChange('website', e.target.value)}
                    />
                    <Input
                      placeholder="Descrição (opcional)"
                      value={newSponsor.description}
                      onChange={(e) => handleSponsorChange('description', e.target.value)}
                    />
                  </div>
                  <Button type="button" onClick={addSponsor} size="sm" disabled={!newSponsor.name.trim()}>
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar Patrocinador
                  </Button>
                </div>

                {sponsors.length > 0 && (
                  <div className="space-y-2">
                    {sponsors.map((sponsor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <div className="text-sm">{sponsor.name}</div>
                          {sponsor.description && (
                            <div className="text-xs text-muted-foreground">{sponsor.description}</div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSponsor(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Requisitos */}
              <div className="space-y-4">
                <h3 className="text-lg">Requisitos (Opcional)</h3>
                
                <div className="flex space-x-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Ex: Carro clássico (mais de 20 anos)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {requirements.length > 0 && (
                  <div className="space-y-2">
                    {requirements.map((req, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <span className="text-sm">{req}</span>
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botões */}
              <div className="flex space-x-4 pt-6">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Enviar para Moderação
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}