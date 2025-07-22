import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Edit, Plus, X } from "lucide-react";
import { useEvents, Event, Sponsor } from "./context/EventsContext";
import { ImageUploadField } from "./ImageUploadField";

interface EditEventModalProps {
  event: Event;
  trigger?: React.ReactNode;
}

export function EditEventModal({ event, trigger }: EditEventModalProps) {
  const { updateEvent } = useEvents();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Event>(event);
  const [newRequirement, setNewRequirement] = useState("");
  const [newSponsor, setNewSponsor] = useState<Sponsor>({
    name: "",
    logo: "",
    website: "",
    description: ""
  });

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleInputChange = (field: keyof Event, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (imageValue: string) => {
    setFormData(prev => ({
      ...prev,
      image: imageValue
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleAddSponsor = () => {
    if (newSponsor.name && newSponsor.logo) {
      setFormData(prev => ({
        ...prev,
        sponsors: [...prev.sponsors, newSponsor]
      }));
      setNewSponsor({ name: "", logo: "", website: "", description: "" });
    }
  };

  const handleRemoveSponsor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sponsors: prev.sponsors.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(event.id, formData);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button size="sm" variant="outline" className="text-xs">
      <Edit className="w-3 h-3 mr-1" />
      Editar
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Evento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Evento</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <ImageUploadField
                label="Imagem do Evento"
                value={formData.image}
                onChange={handleImageChange}
                placeholder="https://exemplo.com/imagem.jpg"
                description="Imagem principal do evento"
              />

              <div>
                <Label htmlFor="description">Descrição Curta</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="longDescription">Descrição Completa</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => handleInputChange('longDescription', e.target.value)}
                  rows={5}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Data e Local */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data e Local</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    placeholder="20 de Julho"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    placeholder="9h - 17h"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organizador */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações do Organizador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="organizer">Nome do Organizador</Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) => handleInputChange('organizer', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organizerEmail">E-mail</Label>
                  <Input
                    id="organizerEmail"
                    type="email"
                    value={formData.organizerEmail}
                    onChange={(e) => handleInputChange('organizerEmail', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organizerPhone">Telefone</Label>
                  <Input
                    id="organizerPhone"
                    value={formData.organizerPhone}
                    onChange={(e) => handleInputChange('organizerPhone', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status e Configurações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status e Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'pending' | 'approved' | 'rejected') => 
                      handleInputChange('status', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="approved">Aprovado</SelectItem>
                      <SelectItem value="rejected">Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Evento em Destaque</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFree"
                    checked={formData.isFree}
                    onCheckedChange={(checked) => {
                      handleInputChange('isFree', checked);
                      if (checked) {
                        handleInputChange('price', 0);
                      }
                    }}
                  />
                  <Label htmlFor="isFree">Evento Gratuito</Label>
                </div>
              </div>

              {!formData.isFree && (
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Requisitos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Requisitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar requisito..."
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRequirement()}
                />
                <Button type="button" onClick={handleAddRequirement} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {req}
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      className="ml-1 text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patrocinadores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Patrocinadores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sponsorName">Nome</Label>
                  <Input
                    id="sponsorName"
                    placeholder="Nome do patrocinador"
                    value={newSponsor.name}
                    onChange={(e) => setNewSponsor(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="sponsorLogo">Logo (URL)</Label>
                  <Input
                    id="sponsorLogo"
                    placeholder="https://..."
                    value={newSponsor.logo}
                    onChange={(e) => setNewSponsor(prev => ({ ...prev, logo: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="sponsorWebsite">Website (opcional)</Label>
                  <Input
                    id="sponsorWebsite"
                    placeholder="https://..."
                    value={newSponsor.website}
                    onChange={(e) => setNewSponsor(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="sponsorDescription">Descrição</Label>
                  <Input
                    id="sponsorDescription"
                    placeholder="Breve descrição..."
                    value={newSponsor.description}
                    onChange={(e) => setNewSponsor(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              
              <Button type="button" onClick={handleAddSponsor} size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Patrocinador
              </Button>

              <div className="space-y-2">
                {formData.sponsors.map((sponsor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src={sponsor.logo} alt={sponsor.name} className="w-8 h-8 object-cover rounded" />
                      <div>
                        <div>{sponsor.name}</div>
                        <div className="text-sm text-muted-foreground">{sponsor.description}</div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSponsor(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}