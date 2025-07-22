# 🚀 Guia de Deploy - Itapema Garage Eventos Automotivos

## 📋 Opções de Hospedagem

### 🆓 **Hospedagem Gratuita (Recomendada para início)**

#### 1. **Vercel** ⭐ (Mais Recomendada)
- **Vantagens**: Deploy automático, CDN global, domínio HTTPS gratuito
- **Limitações**: 100GB de bandwidth/mês, 1000 deploys/mês

**Passos:**
1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta GitHub/GitLab
3. Importe o repositório do projeto
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Deploy automático!

#### 2. **Netlify**
- **Vantagens**: Deploy contínuo, forms gratuitos, funções serverless
- **Limitações**: 100GB de bandwidth/mês

**Passos:**
1. Acesse [netlify.com](https://netlify.com)
2. Conecte repositório GitHub
3. Configure build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy!

#### 3. **GitHub Pages**
- **Vantagens**: Integração total com GitHub
- **Limitações**: Apenas repositórios públicos (versão gratuita)

**Configuração:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 💰 **Hospedagem Paga (Para produção profissional)**

#### 1. **HostGator** (Brasil)
- **Preço**: R$ 7,99/mês
- **Vantagens**: Suporte em português, cPanel
- **Para**: Aplicações estáticas

#### 2. **Hostinger** (Internacional)
- **Preço**: R$ 8,99/mês
- **Vantagens**: Performance excelente, SSL gratuito

#### 3. **DigitalOcean App Platform**
- **Preço**: $5/mês
- **Vantagens**: Escalabilidade, integração com banco de dados

## 🛠️ Preparação para Deploy

### 1. **Configuração do Build**
Crie/verifique o arquivo `package.json`:
```json
{
  "name": "itapema-garage-eventos",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "@tanstack/react-query": "^5.15.0",
    "sonner": "^2.0.3",
    "lucide-react": "^0.300.0",
    "recharts": "^2.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"
  }
}
```

### 2. **Configuração do Vite**
Crie/verifique o `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Para domínio próprio. Use '/nome-repo/' para GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
```

### 3. **Variáveis de Ambiente**
Crie `.env` para desenvolvimento:
```env
VITE_APP_NAME=Itapema Garage Eventos Automotivos
VITE_CONTACT_EMAIL=contato@itapemagarage.com.br
VITE_CONTACT_PHONE=+5547999999999
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### 4. **Configuração de Redirecionamentos**
Para SPAs, crie `public/_redirects` (Netlify):
```
/*    /index.html   200
```

Ou `public/.htaccess` (Apache):
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 🌐 Configuração de Domínio Personalizado

### **Registro de Domínio**
Sugestões para a Itapema Garage:
- `itapemagarage.com.br`
- `itapemaeventos.com.br` 
- `garageautomotiva.com.br`

**Registradores no Brasil:**
- Registro.br (oficial)
- HostGator
- Locaweb

### **Configuração DNS**
Após comprar o domínio, configure:

**Para Vercel/Netlify:**
1. Adicione o domínio no painel da hospedagem
2. Configure DNS:
   - **Tipo A**: `@` → IP da hospedagem
   - **Tipo CNAME**: `www` → domínio da hospedagem

## 📈 Otimizações para Produção

### 1. **Performance**
```typescript
// vite.config.ts - Otimizações adicionais
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  }
})
```

### 2. **SEO e Meta Tags**
Adicione ao `index.html`:
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Itapema Garage Eventos Automotivos | Encontros de Carros Clássicos</title>
  <meta name="description" content="A maior comunidade de carros clássicos da região. Encontros mensais, eventos especiais e muito mais!" />
  <meta name="keywords" content="carros clássicos, eventos automotivos, Itapema, encontros, garage" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Itapema Garage Eventos Automotivos" />
  <meta property="og:description" content="Comunidade apaixonada por carros clássicos" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:type" content="website" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
```

## 🚀 **Recomendação Final**

Para a **Itapema Garage Eventos Automotivos**, recomendo:

1. **Iniciar com Vercel** (gratuito, fácil, profissional)
2. **Registrar domínio** `itapemagarage.com.br`
3. **Configurar analytics** com Google Analytics
4. **Monitorar performance** e escalabilidade

### **Próximos Passos Sugeridos:**
- Configurar Google Analytics
- Implementar Supabase para backend
- Adicionar sistema de pagamentos
- Configurar email marketing
- SEO avançado

🎯 **O projeto está pronto para deploy profissional!**