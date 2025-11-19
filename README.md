# 💸 Sistema PIX Front-End

Implementação Front-End da API Sistema PIX: [Repositório da API](https://github.com/BrunoPressi/sistema-pix-api)

---

## 📚 Sumário

- [📚 Sumário](#-sumário)
- [📌 Descrição](#-descrição)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [💻 Tutorial para rodar o projeto](#-tutorial-para-rodar-o-projeto) 

---

## 📌 Descrição

Este projeto foi desenvolvido como trabalho prático II na disciplina de Tópicos Especiais em Desenvolvimento de Software II no curso de Análise e Desenvolvimento de Sistemas. O projeto
é a implementação do front-end da API desenvolvida no trabalho prático I.

---

## 🚀 Tecnologias Utilizadas

- Typescript
- Node v22.20.0
- React v19.1.1
- Axios v1.12.2
- bcrypt v6.0.0
- js-cookie 3.0.5
- jsonwebtoken v9.0.2
- cypress v15.6.0

---

## 📁 Estrutura do Projeto

```
src/
│
├── app                  # Arquivos principais do projeto
├── backend              # Requisições para a API backend
├── components           # Componentes React
├── contexts             # Contextos da aplicação, ex: AuthContext
├── pages                # Páginas da aplicação
├── routes               # Rotas e configuração de rotas da aplicação
├── services             # Lógica de negócio
├── types                # Objetos/Interfaces DTO's
├── utils                # Métodos úteis para aplicação, ex: HandlingException, TokenDecode, etc...
```

---

## 💻 Tutorial para rodar o projeto
 
- Passo 1: Instalar o [NodeJS](https://nodejs.org/pt) ou `sudo apt install -y nodejs` no Linux.
- Passo 2: Clonar o projeto em sua máquina
- Passo 3: Abrir o terminal e executar `npm install`
- Passo 4: `npm run dev` -> para executar o projeto
- Passo 5: Executar a API: [Tutorial Sistema Pix API](https://github.com/BrunoPressi/sistema-pix-api?tab=readme-ov-file#-tutorial-para-rodar-o-projeto)
- Passo 6: Acessar `http://localhost:5173` no seu navegador
- Passo 7: Executar testes e2e: `npx cypress run`


# Desenvolvido por: Bruno Pressi
