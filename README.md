<h1 align="center">🏋️ IronFit App</h1>

<p align="center">
  <b>Sistema de gestão para academias — PWA, multiusuário e 100% offline</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white"/>
</p>

<p align="center">
  <a href="https://ironfit.kauanalves060408-cmyk.github.io" target="_blank">
    <img src="https://img.shields.io/badge/🚀 Ver Demo ao Vivo-28a745?style=for-the-badge"/>
  </a>
</p>

---

## 📌 Sobre o Projeto

Academias pequenas e pessoais muitas vezes não têm sistema de controle de treinos — tudo é feito
no papel ou em planilhas difíceis de atualizar. O **IronFit App** resolve isso com uma solução
leve, rápida e que funciona mesmo sem internet.

> Desenvolvido como projeto prático para consolidar conhecimentos em desenvolvimento web,
> PWA e arquitetura de aplicações sem backend.

---

## ✅ Funcionalidades

- 👥 **Multiusuário** — cada aluno tem seu próprio perfil e histórico
- 🏋️ **Treinos personalizados** — montagem e acompanhamento de séries e exercícios
- 📴 **Modo offline** — funciona sem internet graças ao Service Worker
- 📱 **Instalável** — pode ser adicionado à tela inicial como um app nativo (PWA)
- 💾 **Dados locais** — armazenamento via LocalStorage, sem necessidade de servidor

---

## 🖥️ Como usar

### Opção 1 — Demo online (recomendado)
Acesse direto pelo navegador:
```
https://kauanalves060408-cmyk.github.io/ironfit-app
```

### Opção 2 — Rodar localmente
```bash
# 1. Clone o repositório
git clone https://github.com/kauanalves060408-cmyk/ironfit-app.git

# 2. Abra o arquivo
cd ironfit-app
# Abra o index.html no seu navegador
```

> Não precisa instalar nada. É HTML/CSS/JS puro!

---

## 🗂️ Estrutura do Projeto
```
ironfit-app/
├── index.html          # Estrutura principal do app
├── manifest.json       # Configuração do PWA
├── sw.js               # Service Worker (modo offline)
├── twa-manifest.json   # Configuração para Android TWA
└── GUIA.md             # Guia de uso do sistema
```

---

## 🚧 Próximas melhorias

- [ ] Migrar para backend com Python + FastAPI
- [ ] Banco de dados real (SQLite / PostgreSQL)
- [ ] Autenticação com login e senha
- [ ] Dashboard com gráficos de evolução do aluno

---

## 👨‍💻 Autor

Feito por **José Kauan Alves de Lima**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kauanalves060408-cmyk)
