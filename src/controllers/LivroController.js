// src/controllers/LivroController.js
const LivroService = require('../services/LivroService');
const { ValidacaoError } = require('../services/Validador');

// O Controller lida com a requisição HTTP e chama o Service
class LivroController {
    
    static async listarTudo(req, res) {
        try {
            const livros = await LivroService.listarTudo();
            // Retorna o status 200 OK com os dados
            res.status(200).json(livros);
        } catch (error) {
            // Retorna erro 500 para falhas internas
            res.status(500).json({ message: "Erro interno do servidor ao listar livros.", error: error.message });
        }
    }

    static async adicionarLivro(req, res) {
        try {
            const novoLivro = await LivroService.adicionarLivro(req.body);
            // Retorna o status 201 Created com o novo recurso
            res.status(201).json(novoLivro);
        } catch (error) {
            // Se for erro de validação/regra, retorna 400 Bad Request
            if (error instanceof ValidacaoError) {
                 return res.status(400).json({ message: error.message });
            }
            // Retorna erro 500 para falhas internas
            res.status(500).json({ message: "Erro interno do servidor ao adicionar livro.", error: error.message });
        }
    }
    
    static async criarColecao(req, res) {
        try {
            const { nome } = req.body;
            const novaColecao = await LivroService.criarColecao(nome);
            res.status(201).json(novaColecao);
        } catch (error) {
            if (error instanceof ValidacaoError) {
                 return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: "Erro interno do servidor ao criar coleção.", error: error.message });
        }
    }

    static async atualizarLivro(req, res) {
        const { codigo } = req.params; // Obtém o código da URL
        try {
            await LivroService.atualizarLivro(codigo, req.body);
            // Retorna 200 OK
            res.status(200).json({ message: "Livro atualizado com sucesso." });
        } catch (error) {
            if (error instanceof ValidacaoError) {
                 return res.status(400).json({ message: error.message });
            }
            // Se o livro não for encontrado, retorna 404 Not Found
            if (error.message.includes("não encontrado")) {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: "Erro interno do servidor ao atualizar livro.", error: error.message });
        }
    }

    static async deletarLivro(req, res) {
        const { codigo } = req.params; // Obtém o código da URL
        try {
            await LivroService.deletarLivro(codigo);
            // Retorna 204 No Content para deleção bem sucedida
            res.status(204).send();
        } catch (error) {
            if (error instanceof ValidacaoError) {
                 return res.status(400).json({ message: error.message });
            }
            // Se o livro não for encontrado, retorna 404 Not Found
             if (error.message.includes("não encontrado")) {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: "Erro interno do servidor ao deletar livro.", error: error.message });
        }
    }
}

module.exports = LivroController;