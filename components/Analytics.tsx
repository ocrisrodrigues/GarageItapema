import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  MousePointer,
  Share2,
  MapPin,
  Heart
} from "lucide-react";
import { ReportExport } from "./ReportExport";

// Dados mockados para demonstração
const visitorsData = [
  { name: 'Jan', visitors: 2400, pageViews: 4800, events: 12 },
  { name: 'Fev', visitors: 3200, pageViews: 6400, events: 18 },
  { name: 'Mar', visitors: 2800, pageViews: 5600, events: 15 },
  { name: 'Abr', visitors: 4100, pageViews: 8200, events: 22 },
  { name: 'Mai', visitors: 3800, pageViews: 7600, events: 25 },
  { name: 'Jun', visitors: 4500, pageViews: 9000, events: 28 },
  { name: 'Jul', visitors: 5200, pageViews: 10400, events: 31 }
];

const deviceData = [
  { name: 'Mobile', value: 65, color: '#f97316' },
  { name: 'Desktop', value: 30, color: '#3b82f6' },
  { name: 'Tablet', value: 5, color: '#10b981' }
];

const topEventsData = [
  { name: 'Veteran CarFest 2025', views: 2400, registrations: 180 },
  { name: 'Lendários & Amigos', views: 1800, registrations: 140 },
  { name: 'Encontro Carros Antigos', views: 1600, registrations: 120 },
  { name: 'VolksClub São Leopoldo', views: 1200, registrations: 90 },
  { name: 'Encontro Sapiranga', views: 1000, registrations: 75 }
];

const trafficSourceData = [
  { name: 'Direto', value: 35, color: '#8b5cf6' },
  { name: 'Google', value: 28, color: '#06b6d4' },
  { name: 'Facebook', value: 20, color: '#3b82f6' },
  { name: 'Instagram', value: 12, color: '#ec4899' },
  { name: 'WhatsApp', value: 5, color: '#22c55e' }
];

const dailyStatsData = [
  { day: 'Seg', visitors: 820, events: 3 },
  { day: 'Ter', visitors: 932, events: 4 },
  { day: 'Qua', visitors: 1180, events: 5 },
  { day: 'Qui', visitors: 1320, events: 6 },
  { day: 'Sex', visitors: 1520, events: 8 },
  { day: 'Sáb', visitors: 1890, events: 12 },
  { day: 'Dom', visitors: 1650, events: 9 }
];

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Acompanhe o desempenho do site e eventos</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Dados em tempo real
          </Badge>
        </div>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52.2K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Ativos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.8%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.8%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de visitantes por mês */}
        <Card>
          <CardHeader>
            <CardTitle>Crescimento Mensal</CardTitle>
            <p className="text-sm text-muted-foreground">
              Visitantes, visualizações e eventos criados
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={visitorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stackId="1"
                  stroke="#f97316" 
                  fill="#f97316"
                  fillOpacity={0.8}
                />
                <Area 
                  type="monotone" 
                  dataKey="pageViews" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por dispositivo */}
        <Card>
          <CardHeader>
            <CardTitle>Dispositivos Utilizados</CardTitle>
            <p className="text-sm text-muted-foreground">
              Como os usuários acessam o site
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Eventos mais populares */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos Mais Populares</CardTitle>
          <p className="text-sm text-muted-foreground">
            Rankings por visualizações e interessados
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topEventsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#f97316" name="Visualizações" />
              <Bar dataKey="registrations" fill="#3b82f6" name="Interessados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Estatísticas semanais e origem do tráfego */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitantes por Dia da Semana</CardTitle>
            <p className="text-sm text-muted-foreground">
              Padrão de comportamento dos usuários
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ fill: '#f97316' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Origem do Tráfego</CardTitle>
            <p className="text-sm text-muted-foreground">
              De onde vêm os visitantes
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Métricas detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio no Site</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18s</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-2.1%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compartilhamentos</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+28%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Resumo executivo e exportação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Executivo</CardTitle>
            <p className="text-sm text-muted-foreground">
              Principais insights para apresentação
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">📈 Crescimento</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 28.5K visitantes únicos (+12.5% vs mês anterior)</li>
                  <li>• 52.2K visualizações totais (+8.2% vs mês anterior)</li>
                  <li>• 31 eventos ativos (+15.8% vs mês anterior)</li>
                  <li>• Taxa de conversão de 4.2% (+0.8% vs mês anterior)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">👥 Audience</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 65% acessam via mobile</li>
                  <li>• Maior tráfego aos fins de semana</li>
                  <li>• Tempo médio no site: 3m 42s</li>
                  <li>• 35% tráfego direto (marca forte)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <ReportExport />
      </div>
    </div>
  );
}