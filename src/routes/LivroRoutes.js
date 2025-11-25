// src/routes/LivroRoutes.js
const express = require('express');
const LivroController = require('../controllers/LivroController');

const router = express.Router();

// Rotas para a entidade Livro
// GET /api/livros
router.get('/', LivroController.listarTudo); 
// POST /api/livros
router.post('/', LivroController.adicionarLivro);
// PUT /api/livros/:codigo
router.put('/:codigo', LivroController.atualizarLivro);
// DELETE /api/livros/:codigo
router.delete('/:codigo', LivroController.deletarLivro);

// Rota adicional para Coleção
// POST /api/livros/colecao
router.post('/colecao', LivroController.criarColecao);

module.exports = router;