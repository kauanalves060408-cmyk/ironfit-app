# 🏋️ IRONFIT — Guia Completo: Do Arquivo ao Play Store

## 📦 O que está nesta pasta

```
ironfit-pwa/
├── index.html          ← App completo com suporte a PWA
├── manifest.json       ← Configuração PWA (ícones, nome, cores)
├── sw.js               ← Service Worker (offline, cache, notificações)
├── twa-manifest.json   ← Configuração para gerar APK com Bubblewrap
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-256x256.png
│   ├── icon-384x384.png
│   ├── icon-512x512.png       ← Ícone principal (Play Store)
│   ├── splash-2048x2048.png   ← Tela de carregamento
│   └── feature-graphic-1024x500.png  ← Banner da Play Store
└── GUIA.md             ← Este arquivo
```

---

## ETAPA 1 — Hospedar o app no Netlify (GRÁTIS)

### 1.1 Criar conta
- Acesse https://netlify.com
- Clique em **Sign Up** → use sua conta Google ou GitHub

### 1.2 Publicar o app
1. No painel do Netlify, clique em **"Add new site"**
2. Escolha **"Deploy manually"**
3. **Arraste a pasta `ironfit-pwa` inteira** para a área indicada
4. Aguarde 10-30 segundos
5. Você receberá uma URL como: `https://ironfit-abc123.netlify.app`

### 1.3 Personalizar o domínio (opcional)
- Em Site Settings → Domain Management
- Você pode trocar para `https://ironfit.netlify.app` (se disponível)

### 1.4 ⚠️ IMPORTANTE: Atualizar os arquivos com sua URL
Após ter a URL do Netlify, edite:

**No arquivo `twa-manifest.json`** — troque `SEU-DOMINIO.netlify.app` pela sua URL real:
```json
"host": "ironfit.netlify.app",
"iconUrl": "https://ironfit.netlify.app/icons/icon-512x512.png",
"webManifestUrl": "https://ironfit.netlify.app/manifest.json",
"fullScopeUrl": "https://ironfit.netlify.app/"
```

---

## ETAPA 2 — Testar como PWA no celular

Antes de ir à Play Store, teste no celular:

1. Abra a URL do Netlify no **Chrome** do Android
2. Um banner aparecerá: **"Adicionar IRONFIT à tela inicial"**
3. Se não aparecer, toque nos 3 pontos (⋮) → "Adicionar à tela inicial"
4. O app abre em tela cheia, sem barra do navegador ✅

> ✅ Se funcionar aqui, está pronto para virar APK!

---

## ETAPA 3 — Instalar as ferramentas (computador)

### 3.1 Instalar Node.js
- Baixe em: https://nodejs.org (versão LTS)
- Instale normalmente

### 3.2 Instalar Java JDK
- Baixe em: https://adoptium.net
- Instale o **JDK 11 ou superior**

### 3.3 Instalar Android Studio
- Baixe em: https://developer.android.com/studio
- Durante a instalação, aceite instalar o Android SDK

### 3.4 Instalar Bubblewrap
Abra o **Terminal** (Mac/Linux) ou **Prompt de Comando** (Windows):
```bash
npm install -g @bubblewrap/cli
```

Verificar instalação:
```bash
bubblewrap --version
```

---

## ETAPA 4 — Gerar o APK com Bubblewrap

### 4.1 Inicializar o projeto
No terminal, navegue até a pasta `ironfit-pwa` e execute:

```bash
bubblewrap init --manifest https://SEU-DOMINIO.netlify.app/manifest.json
```

O Bubblewrap vai perguntar algumas coisas:
- **Package ID**: `com.ironfit.app` (ou `com.seunome.ironfit`)
- **App name**: `IRONFIT`
- **Launcher name**: `IRONFIT`
- **Theme color**: `#09090f`
- **Background color**: `#09090f`
- Aceite os padrões para o resto

### 4.2 Criar a chave de assinatura (keystore)
O Android exige que o APK seja assinado. O Bubblewrap cria automaticamente durante o `init`.

> ⚠️ **GUARDE ESTA SENHA!** Se perder o keystore, não poderá atualizar o app na Play Store.

### 4.3 Gerar o APK/AAB
```bash
bubblewrap build
```

Isso cria dois arquivos na pasta:
- `app-release-signed.apk` → Para instalar e testar no celular
- `app-release-bundle.aab` → Para enviar ao **Google Play Store** ⬅️

### 4.4 Testar o APK no celular
- Transfira o `.apk` para o celular por cabo ou WhatsApp
- No Android: Configurações → Segurança → "Fontes desconhecidas" → Ativar
- Abra o `.apk` e instale
- Verifique se o app funciona perfeitamente

---

## ETAPA 5 — Publicar na Google Play Store

### 5.1 Criar conta de desenvolvedor
- Acesse: https://play.google.com/console
- Faça login com sua conta Google
- Pague a taxa única de **U$ 25** (≈ R$ 125)
- Preencha os dados da conta

### 5.2 Criar o app
1. Clique em **"Criar app"**
2. Preencha:
   - **Nome**: IRONFIT — Seu Personal Digital
   - **Idioma padrão**: Português (Brasil)
   - **App ou jogo**: App
   - **Gratuito ou pago**: Gratuito
3. Aceite as políticas e clique em **Criar app**

### 5.3 Preencher as informações da loja

**Ficha da Play Store (Store listing):**
- **Título**: IRONFIT — Seu Personal Digital
- **Descrição curta** (80 chars):
  ```
  Treinos, nutrição e progresso. Seu personal trainer digital grátis! 💪
  ```
- **Descrição longa** (4000 chars):
  ```
  O IRONFIT é seu companheiro ideal na academia. Crie sua conta, monte seus
  treinos personalizados, acompanhe sua nutrição e veja sua evolução em tempo real.

  ✅ FUNCIONALIDADES:
  • 🔐 Sistema de login seguro — crie seu perfil exclusivo
  • 💪 Crie treinos personalizados por grupo muscular e dia da semana
  • ✓ Marque exercícios concluídos durante o treino
  • ⏱ Timer de descanso entre séries
  • 🥗 Acompanhamento de macros (proteína, carbo, gordura)
  • 💧 Controle de hidratação diária
  • 📊 Gráficos de frequência e progresso
  • 🔥 Streak de dias consecutivos de treino
  • 📱 Funciona offline — sem internet necessária
  • 🆓 Totalmente gratuito

  Ideal para iniciantes e avançados que querem organizar sua rotina de treinos.
  ```

**Imagens necessárias:**
- **Ícone do app**: `icons/icon-512x512.png` (512x512px)
- **Feature graphic**: `icons/feature-graphic-1024x500.png` (1024x500px)
- **Screenshots**: Tire prints do app funcionando no celular (mínimo 2)
  - Vá em Configurações do celular → Screenshot
  - Tire prints das telas: Home, Treino, Nutrição, Perfil

**Categoria:**
- Saúde e fitness

### 5.4 Configurar classificação do conteúdo
- Vá em "Classificação do conteúdo"
- Preencha o questionário (o app não tem conteúdo sensível)
- Classificação esperada: **Livre (Para todos)**

### 5.5 Configurar preços e distribuição
- Gratuito
- Países: selecione Brasil (ou todos)

### 5.6 Fazer o upload do AAB
1. Vá em **Produção → Criar nova versão**
2. Faça upload do arquivo `app-release-bundle.aab`
3. Adicione as notas da versão:
   ```
   Versão 1.0.0 — Lançamento inicial do IRONFIT!
   ```
4. Clique em **Revisar versão** → **Iniciar lançamento para produção**

### 5.7 Aguardar aprovação
- O Google leva de **1 a 7 dias** para revisar
- Você recebe um e-mail quando aprovado
- Após aprovação, o app aparece na Play Store! 🎉

---

## 🔗 Link de Deep Linking (verificação do domínio)

Para o TWA funcionar corretamente, você precisa verificar a propriedade do domínio.
Crie o arquivo em: `/.well-known/assetlinks.json` no seu site Netlify.

Conteúdo (substitua pelos seus dados após criar o app na Play Store):
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.ironfit.app",
    "sha256_cert_fingerprints": ["COLE_AQUI_O_FINGERPRINT_DO_SEU_KEYSTORE"]
  }
}]
```

Para obter o fingerprint do seu keystore:
```bash
keytool -list -v -keystore ironfit.keystore -alias ironfit
```

---

## 💡 Dicas finais

| Dica | Detalhe |
|------|---------|
| 📸 Screenshots bonitas | Use o app no celular e tire prints reais |
| 🔑 Guarde o keystore | Sem ele não pode atualizar o app |
| 📅 Atualizações futuras | Gere novo AAB e suba na Play Console |
| 🌐 Domínio próprio | Netlify permite domínio personalizado grátis |
| 📊 Analytics | Adicione Google Analytics para ver usuários |

---

## 🆘 Problemas comuns

**"Bubblewrap não encontra o Java"**
→ Instale o JDK 11+ e configure a variável `JAVA_HOME`

**"App não abre em tela cheia"**
→ Verifique se o `manifest.json` tem `"display": "standalone"`

**"Play Store rejeitou o app"**
→ Leia o motivo no e-mail, geralmente é falta de política de privacidade

**"Service Worker não registra"**
→ O site PRECISA ser HTTPS — o Netlify já fornece isso automaticamente

---

*Guia criado para o projeto IRONFIT — Seu Personal Digital de Academia*
