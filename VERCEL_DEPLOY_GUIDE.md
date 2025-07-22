# 🚀 Guia de Deploy no Vercel - Itapema Garage

## 📋 Pré-requisitos

1. **Conta no GitHub** (para versionar o código)
2. **Conta no Vercel** (gratuita em [vercel.com](https://vercel.com))
3. **Código pronto** (este projeto já está configurado!)

## 🛠️ Passo a Passo para Deploy

### 1. **Preparar o Repositório GitHub**

```bash
# Se ainda não inicializou o Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "🚀 Initial commit - Itapema Garage Eventos"

# Conectar ao repositório GitHub (substitua pelo seu)
git remote add origin https://github.com/SEU_USUARIO/itapema-garage-eventos.git

# Enviar para o GitHub
git push -u origin main
```

### 2. **Deploy no Vercel**

#### Opção A: Via Interface Web (Recomendado)
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Conecte sua conta GitHub
4. Selecione o repositório `itapema-garage-eventos`
5. Configurações automáticas:
   - **Framework Preset**: Vite ✅
   - **Build Command**: `npm run build` ✅  
   - **Output Directory**: `dist` ✅
6. Clique em **"Deploy"**

#### Opção B: Via CLI do Vercel
```bash
# Instalar CLI do Vercel
npm i -g vercel

# Login no Vercel
vercel login

# Deploy do projeto
vercel

# Seguir as perguntas:
# ? Set up and deploy "itapema-garage-eventos"? Y
# ? Which scope do you want to deploy to? [sua conta]
# ? Link to existing project? N
# ? What's your project's name? itapema-garage-eventos
# ? In which directory is your code located? ./
```

### 3. **Configurações Importantes**

O projeto já está configurado com:
- ✅ `vercel.json` - Configurações de deploy
- ✅ `_redirects` - Para roteamento SPA
- ✅ `vite.config.ts` - Build otimizado
- ✅ Headers de segurança
- ✅ Cache otimizado para assets

### 4. **Domínio Personalizado (Opcional)**

1. No painel Vercel, vá em **Settings > Domains**
2. Adicione seu domínio: `itapemagarage.com.br`
3. Configure DNS no registrador:
   ```
   Tipo: CNAME
   Nome: www
   Valor: cname.vercel-dns.com
   
   Tipo: A
   Nome: @
   Valor: 76.76.19.19
   ```

### 5. **Variáveis de Ambiente (Se necessário)**

No painel Vercel, vá em **Settings > Environment Variables**:
```
VITE_APP_NAME=Itapema Garage Eventos Automotivos
VITE_CONTACT_EMAIL=contato@itapemagarage.com.br
VITE_CONTACT_PHONE=+5547999999999
```

## ⚡ URLs Resultantes

Após o deploy:
- **URL temporária**: `https://itapema-garage-eventos.vercel.app`
- **URL personalizada**: `https://itapemagarage.com.br` (se configurar domínio)

## 🔄 Atualizações Automáticas

- Qualquer push para `main` → Deploy automático
- Preview branches → URLs de preview para testes
- Rollback → Volta versões anteriores com 1 clique

## 📊 Monitoramento

No painel Vercel você terá:
- 📈 Analytics de visitantes
- ⚡ Core Web Vitals
- 🐛 Logs de erro
- 🚀 Performance metrics

## 🆘 Troubleshooting

### Erro de Build
```bash
# Testar build localmente
npm run build
npm run preview
```

### Rotas não funcionam
- Verificar se `_redirects` está em `/public/`
- Verificar se `vercel.json` está na raiz

### Performance Issues
- Imagens muito grandes → Usar Unsplash com parâmetros
- Muitas dependências → Verificar bundle size

## 🎯 Checklist Final

- [ ] Código no GitHub
- [ ] Deploy no Vercel funcionando
- [ ] Todas as rotas funcionais
- [ ] Imagens carregando
- [ ] Responsivo em mobile
- [ ] Performance boa (> 90)
- [ ] SSL/HTTPS ativo

## 📞 Suporte

Se tiver problemas:
1. Verifique logs no painel Vercel
2. Teste build local: `npm run build && npm run preview`
3. Documentação: [vercel.com/docs](https://vercel.com/docs)

---

🚗 **Itapema Garage Eventos Automotivos** - Agora online! 🌐
```

## 🌟 **Status**: Pronto para Deploy!

O projeto está 100% configurado para deploy gratuito no Vercel.
```