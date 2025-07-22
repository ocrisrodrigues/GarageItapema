import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Download, 
  FileText, 
  Calendar,
  Users,
  Eye,
  TrendingUp,
  Share2,
  Mail
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ReportExport() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportReport = async (format: 'pdf' | 'excel') => {
    setIsExporting(true);
    
    // Simulação de geração de relatório
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const fileName = `itapema-garage-analytics-${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
    
    // Em um cenário real, aqui seria feito o download do arquivo
    toast.success(`Relatório ${format.toUpperCase()} gerado com sucesso! Download iniciado para: ${fileName}`);
    
    setIsExporting(false);
  };

  const handleShareReport = () => {
    const reportData = {
      period: "Janeiro - Julho 2025",
      visitors: "28,500",
      pageViews: "52,200",
      events: "31",
      conversionRate: "4.2%",
      topDevice: "Mobile (65%)",
      topSource: "Direto (35%)"
    };

    const emailSubject = "Relatório Analytics - Itapema Garage Eventos";
    const emailBody = `
Olá,

Segue o relatório de analytics do site Itapema Garage Eventos Automotivos:

📊 PERÍODO: ${reportData.period}

📈 MÉTRICAS PRINCIPAIS:
• Visitantes únicos: ${reportData.visitors} (+12.5%)
• Visualizações: ${reportData.pageViews} (+8.2%)
• Eventos ativos: ${reportData.events} (+15.8%)
• Taxa de conversão: ${reportData.conversionRate} (+0.8%)

👥 AUDIENCE:
• Dispositivo principal: ${reportData.topDevice}
• Fonte de tráfego: ${reportData.topSource}

📱 DESTAQUES:
• Maior tráfego aos fins de semana
• 65% dos usuários acessam via mobile
• Tempo médio no site: 3m 42s
• Taxa de rejeição: 32.5%

Para visualizar os gráficos detalhados, acesse: ${window.location.origin}/admin

Atenciosamente,
Equipe Itapema Garage
    `;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Exportar Relatórios
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Gere relatórios para compartilhar com investidores e organizadores
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Opções de exportação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => handleExportReport('pdf')}
              disabled={isExporting}
              className="flex items-center justify-center h-20 bg-red-600 hover:bg-red-700 text-white"
            >
              <div className="text-center">
                <Download className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm">Relatório PDF</div>
              </div>
            </Button>

            <Button
              onClick={() => handleExportReport('excel')}
              disabled={isExporting}
              className="flex items-center justify-center h-20 bg-green-600 hover:bg-green-700 text-white"
            >
              <div className="text-center">
                <Download className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm">Planilha Excel</div>
              </div>
            </Button>

            <Button
              onClick={handleShareReport}
              disabled={isExporting}
              className="flex items-center justify-center h-20 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <div className="text-center">
                <Mail className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm">Compartilhar</div>
              </div>
            </Button>
          </div>

          {/* Resumo dos dados que serão exportados */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">📋 Dados incluídos no relatório:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                <span>Visitantes únicos e demografias</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2 text-green-500" />
                <span>Visualizações por página</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                <span>Performance dos eventos</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-purple-500" />
                <span>Métricas de conversão</span>
              </div>
              <div className="flex items-center">
                <Share2 className="w-4 h-4 mr-2 text-red-500" />
                <span>Origem do tráfego</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                <span>Análise comparativa</span>
              </div>
            </div>
          </div>

          {/* Status de exportação */}
          {isExporting && (
            <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-700">Gerando relatório...</span>
            </div>
          )}

          {/* Dicas para apresentação */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2">💡 Dicas para apresentação:</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Use o relatório PDF para apresentações formais</li>
              <li>• A planilha Excel permite análises personalizadas</li>
              <li>• Compartilhe por email com comentários contextuais</li>
              <li>• Destaque o crescimento mensal e a força da marca</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}