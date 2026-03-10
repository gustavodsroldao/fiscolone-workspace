# Fiscolone Dev Launcher

CLI para inicialização rápida do ecossistema de desenvolvimento **Fiscool + Tributone**.

Esta ferramenta permite iniciar diferentes partes do sistema (frontend, APIs ou todo o ecossistema) através de um **menu interativo no terminal**, facilitando o fluxo de desenvolvimento.

---

# 📌 Objetivo

Em ambientes com múltiplos serviços (frontend, APIs, microserviços), iniciar manualmente cada projeto pode ser trabalhoso.

O **Fiscolone Dev Launcher** resolve isso oferecendo:

* inicialização centralizada dos serviços
* menu interativo no terminal
* logs organizados por serviço
* melhor experiência para desenvolvedores

---

# 🖥️ Interface da CLI

Ao executar o launcher, será exibido um menu semelhante a:

```
Fiscolone

Serviços detectados:

✔ fiscool-web
✔ fiscool-api
✔ tributone-web
✔ tributone-api

? Quais serviços iniciar?

── Fiscool ──
❯ API Fiscool
  Front Fiscool
  Fiscool (Front + API)

── Gestão Fiscal Integrada ──
  API Tributone
  Front Tributone
  Tributone (Front + API)

── Eco-sistema Completo ──
  Todos os serviços
```

Após selecionar uma opção, os serviços são iniciados e seus logs são exibidos no terminal:

```
[FISCOOL-API] Listening on port 5001
[FISCOOL-WEB] Ready on http://localhost:3000
```

---

# 🚀 Requisitos

* Node.js 18+
* .NET SDK (para APIs)
* npm

---

# 📦 Instalação

Clone o repositório:

```
git clone <repositorio>
```

Entre na pasta:

```
cd fiscolone-workspace
```

Instale as dependências:

```
npm install
```

---

# ▶️ Executar

Para iniciar a CLI:

```
npm run dev
```

---

# 📁 Estrutura do projeto

```
fiscolone-workspace
│
├ scripts
│   launcher.js
│
├ package.json
└ README.md
```

O arquivo principal da CLI é:

```
scripts/launcher.js
```

---

# ⚙️ Configuração dos projetos

Os caminhos dos projetos são definidos no arquivo `launcher.js`.
