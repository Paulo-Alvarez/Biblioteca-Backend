const express = require('express');
const cors = require('cors');
const livroRoutes = require('./src/routes/LivroRoutes'); // Verifique se este caminho está correto

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS: Permitindo todas as origens (opção mais simples e aberta).
// Isso resolve o erro "Failed to fetch" de CORS.
app.use(cors());

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Rota principal da API
app.use('/api/livros', livroRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    // Este log aparecerá no console do Render
});