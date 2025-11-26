const express = require('express');
const cors = require('cors');
const livroRoutes = require('./src/routes/LivroRoutes'); // Verifique se este caminho está correto

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS: Permite apenas domínios específicos.
// CORREÇÃO: Usando a URL real do Vercel (URL do Front-end)
const allowedOrigins = [
    'http://localhost:5500', // Para testes locais
    'https://biblioteca-frontend-2-4f9r92jmx-paulos-projects-66c89578.vercel.app' // << URL CORRETA
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem 'origin' (como apps ou ferramentas como Postman) ou de origens permitidas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Aplica a configuração de CORS
app.use(cors(corsOptions));

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Rota principal da API
app.use('/api/livros', livroRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    // Este log aparecerá no console do Render
});