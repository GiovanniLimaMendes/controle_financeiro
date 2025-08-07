# 💸 Controle Financeiro

Um sistema completo de controle financeiro pessoal, com cadastro de entradas e saídas, exibição de saldo atual e visualização gráfica mensal. Desenvolvido com Node.js no backend e Next.js no frontend.

---

## 🚀 Funcionalidades

- Cadastro de transações (entradas e saídas)
- Cálculo automático de saldo
- Listagem das transações
- Visualização mensal por gráfico de barras (Recharts)
- API RESTful integrada com MySQL
- Alertas de sucesso e erro com feedback ao usuário

---

## 🧱 Tecnologias Utilizadas

### Frontend (Next.js)

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Lucide-react](https://lucide.dev/)

### Backend (Node.js)

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) via [`mysql2`](https://www.npmjs.com/package/mysql2)

---

## 📦 Instalação

### Requisitos:

- Node.js 18+
- MySQL instalado e configurado

### Clonando o projeto:

```bash
git clone https://github.com/GiovanniLimaMendes/controle_financeiro
cd controle_financeiro
```

### Backend:

Configure o banco de dados:

1- Crie o banco de dados e as tabelas usando o script abaixo:

```bash
mysql -u root -p < src/app/database/schema.sql
```

2- Instale as dependências:

```bash
npm install
```

3- Conecte-se ao banco

```bash
cd src/app/database
node db.js
```

### Frontend:

No diretório raiz, inicie o projeto:
```bash
npm run dev
```

O app será iniciado em: http://localhost:3000

---

## 🧑‍💻 Autor

- Giovanni Lima Mendes – [@GiovanniLimaMendes](https://github.com/GiovanniLimaMendes)

---

## 📄 Licença

Este projeto está sob a licença MIT.
