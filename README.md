<h1 align="center">
   Desafio Liven - Transcrição de Vídeos e Áudios
</h1>

<h3 align="center">
  <br>
    <img src="https://github.com/GSSantiago/Desafio_Transcricao_Video_Liven/blob/main/apps/web/public/video-icon.svg" alt="Liven" height="64" align="center">
  <br>
</h3>

<p align="center">
 <a href="#pencil2-descrição">Descrição</a> •
 <a href="#rocket-tecnologias">Tecnologias</a> •
 <a href="#gear-arquitetura-do-projeto">Arquitetura</a> •
 <a href="#construction-como-rodar">Como Rodar</a>
</p>

## :pencil2: Descrição
Este projeto foi desenvolvido como parte do **Desafio da Liven** e consiste em uma aplicação completa (frontend + backend) para **transcrição de vídeos e áudios**.  
O usuário pode realizar upload de arquivos de mídia (MP3, MKV, MP4, MPEG), que são processados por um serviço de transcrição.  
O sistema permite acompanhar o **histórico de solicitações**, baixar o texto transcrito e respeita limites de cota de processamento.

---

## :rocket: Tecnologias

### Frontend (Next.js)
- ⚛️ **React / Next.js 15** — Base da aplicação web
- 🎨 **TailwindCSS + Radix UI + Shadcn/UI** — Estilização e componentes
- 🔄 **React Hook Form + Zod** — Formulários e validação
- 🔔 **React Toastify** — Notificações
- 📡 **Axios** — Comunicação com a API

### Backend (Express.js + Node.js)
- 🟢 **Express 5** — Servidor HTTP
- 📦 **Multer** — Upload de arquivos
- 🎵 **Fluent-ffmpeg** — Processamento de áudio/vídeo (conversão, corte, bitrate)
- 🤖 **OpenAI API** — Transcrição por IA
- 🔑 **Firebase Admin** — Autenticação

### Banco de Dados
- 🟣 **Prisma ORM**
- 🐘 **Postgre**

### Monorepo & Shared
- 🌀 **Turborepo** — Gerenciamento de workspaces
- 📦 **Workspaces**: `apps/web` (frontend), `apps/api` (backend), `packages/db` (Prisma + repositórios), `packages/ui` (componentes gerais)

---

## :gear: Arquitetura do Projeto

```
desafio-transcricao-video-liven/
├── apps
│   ├── web      # Front-End (Next.js)
│   └── api      # Back-End (Express)
├── packages
│   ├── db       # Prisma e schemas do banco
│   └── ui       # Componentes gerais (Shadcn-ui)
├── tmp          # Pasta temporária para upload de arquivos
└── README.md
```


Cada app/package possui seu próprio `package.json`, scripts e dependências isoladas, mas todos compartilham a mesma configuração base do monorepo.

---

## :computer: Execução

### 📦 Pré-requisitos

- [Node.js >= 18](https://nodejs.org)
- [Yarn 1.x](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

### 🔧 Passo a passo

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/desafio-transcricao-liven

# Entrar no diretório
cd desafio-transcricao-liven

# Instalar dependências
yarn install

# Configurar variáveis de ambiente
# Crie arquivos .env nas pastas /apps/api e /apps/web conforme os exemplos

# Executar migrações do banco
yarn workspace @repo/db db:migrate

# Rodar ambiente de desenvolvimento
yarn dev

O front rodará em http://localhost:3000
O back rodará em http://localhost:3001