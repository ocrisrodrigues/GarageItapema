import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { HomePage } from "./components/pages/HomePage";
import { AboutPage } from "./components/pages/AboutPage";
import { EventsPage } from "./components/pages/EventsPage";
import { EventDetailPage } from "./components/pages/EventDetailPage";
import { CreateEventPage } from "./components/pages/CreateEventPage";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import { EventsProvider } from "./components/context/EventsContext";
import { AuthProvider } from "./components/context/AuthContext";

// Layout padrão para páginas públicas
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Rota Admin - sem layout público */}
              <Route path="/admin" element={<ProtectedAdminRoute />} />
              
              {/* Rotas públicas específicas primeiro */}
              <Route 
                path="/" 
                element={
                  <PublicLayout>
                    <HomePage />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/sobre" 
                element={
                  <PublicLayout>
                    <AboutPage />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/eventos" 
                element={
                  <PublicLayout>
                    <EventsPage />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/evento/:id" 
                element={
                  <PublicLayout>
                    <EventDetailPage />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/criar-evento" 
                element={
                  <PublicLayout>
                    <CreateEventPage />
                  </PublicLayout>
                } 
              />
              
              {/* Catch-all 404 por último */}
              <Route 
                path="*" 
                element={
                  <PublicLayout>
                    <div className="min-h-screen flex items-center justify-center bg-muted/30">
                      <div className="max-w-md w-full mx-auto px-6 text-center">
                        <div className="mb-8">
                          <div className="text-6xl mb-4">🔧</div>
                          <h1 className="text-4xl mb-4 text-primary">Página não encontrada</h1>
                          <p className="text-muted-foreground mb-8">
                            Oops! A página que você está procurando não existe ou foi movida.
                          </p>
                        </div>
                      </div>
                    </div>
                  </PublicLayout>
                } 
              />
            </Routes>
            
            {/* Toaster para notificações */}
            <Toaster 
              position="top-right"
              richColors
              closeButton
              duration={3000}
            />
          </div>
        </Router>
      </EventsProvider>
    </AuthProvider>
  );
}