import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "../ui/alert-dialog";
import { Calendar, MapPin, Clock, Check, X, Eye, DollarSign, Trash2, Save, ArrowLeft, BarChart3 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useEvents } from "../context/EventsContext";
import { EditEventModal } from "../EditEventModal";
import { Analytics } from "../Analytics";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner@2.0.3";

const formatPrice = (price: number, isFree: boolean) => {
  if (isFree || price === 0) return 'Gratuito';
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

export function AdminPage() {
  const { events, approveEvent, rejectEvent, deleteEvent, getPendingEvents, getApprovedEvents } = useEvents();
  const [selectedTab, setSelectedTab] = useState("pending");
  const navigate = useNavigate();
  
  const pendingEvents = getPendingEvents();
  const approvedEvents = getApprovedEvents();
  const rejectedEvents = events.filter(event => event.status === 'rejected');

  const handleApprove = (id: string) => {
    approveEvent(id);
    toast.success("Evento aprovado com sucesso!");
  };

  const handleReject = (id: string) => {
    rejectEvent(id);
    toast.success("Evento rejeitado com sucesso!");
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
    toast.success("Evento excluído com sucesso!");
  };

  const handleSaveChanges = () => {
    toast.success("Alterações salvas com sucesso! Redirecionando para a página inicial...");
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const DeleteEventDialog = ({ event }: { event: any }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          className="text-xs"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir o evento "{event.title}"? 
            Esta ação não pode ser desfeita e o evento será removido permanentemente do sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(event.id)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir Permanentemente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const EventCard = ({ event, showActions = false }: { event: any; showActions?: boolean }) => (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-32 h-32 flex-shrink-0">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg text-primary">{event.title}</h3>
            <div className="flex gap-2">
              <Badge variant={
                event.status === 'approved' ? 'default' : 
                event.status === 'pending' ? 'secondary' : 
                'destructive'
              }>
                {event.status === 'approved' ? 'Aprovado' : 
                 event.status === 'pending' ? 'Pendente' : 
                 'Rejeitado'}
              </Badge>
              <Badge className={event.isFree ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'}>
                {formatPrice(event.price, event.isFree)}
              </Badge>
              {event.featured && (
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                  Destaque
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {event.description}
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-orange-500" />
              {event.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1 text-orange-500" />
              {event.time}
            </div>
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-orange-500" />
              {event.location}
            </div>

            <div className="flex items-center">
              <DollarSign className="w-3 h-3 mr-1 text-orange-500" />
              {formatPrice(event.price, event.isFree)}
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-3">
            <strong>Organizador:</strong> {event.organizer}<br />
            <strong>E-mail:</strong> {event.organizerEmail}<br />
            <strong>Telefone:</strong> {event.organizerPhone}
          </div>

          <div className="flex flex-wrap gap-2">
            <Link to={`/evento/${event.id}`}>
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Ver Detalhes
              </Button>
            </Link>
            
            <EditEventModal event={event} />
            
            {/* Botão de exclusão para todos os eventos */}
            <DeleteEventDialog event={event} />
            
            {showActions && event.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleApprove(event.id)}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Aprovar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleReject(event.id)}
                  className="text-xs"
                >
                  <X className="w-3 h-3 mr-1" />
                  Rejeitar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-4">Painel Administrativo</h1>
              <p className="text-muted-foreground">
                Gerencie os eventos enviados pela comunidade.
              </p>
            </div>
            
            {/* Botões de ação */}
            <div className="flex gap-3">
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Site
                </Button>
              </Link>
              
              <Button 
                onClick={handleSaveChanges}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl text-orange-500 mb-2">{pendingEvents.length}</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl text-green-600 mb-2">{approvedEvents.length}</div>
              <div className="text-sm text-muted-foreground">Aprovados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl text-red-600 mb-2">{rejectedEvents.length}</div>
              <div className="text-sm text-muted-foreground">Rejeitados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl text-primary mb-2">{events.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">
              Pendentes ({pendingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Aprovados ({approvedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejeitados ({rejectedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Nenhum evento pendente no momento.</p>
                </CardContent>
              </Card>
            ) : (
              pendingEvents.map(event => (
                <EventCard key={event.id} event={event} showActions={true} />
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Nenhum evento aprovado ainda.</p>
                </CardContent>
              </Card>
            ) : (
              approvedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Nenhum evento rejeitado.</p>
                </CardContent>
              </Card>
            ) : (
              rejectedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>

        {/* Botão fixo na parte inferior */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex justify-center">
            <Button 
              onClick={handleSaveChanges}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              <Save className="w-5 h-5 mr-2" />
              Finalizar e Salvar Todas as Alterações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}