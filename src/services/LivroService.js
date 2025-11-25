// src/services/LivroService.js
const BibliotecaRepository = require('../repositories/BibliotecaRepository');
const Livro = require('../models/Livro');
const { cadeiaValidacao, ValidacaoError } = require('./Validador');

// Usamos uma Factory simples para criar a instância com o código
class LivroFactory {
    static criarLivro(titulo, autor, ano, categoria) {
        const codigo = BibliotecaRepository.gerarCodigo();
        return new Livro(codigo, titulo, autor, ano, categoria);
    }
}

class LivroService {

    async listarTudo() {
        // Retorna a estrutura de Coleções e Livros
        return BibliotecaRepository.listarTudo();
    }

    async adicionarLivro({ titulo, autor, ano, categoria, nomeColecao }) {
        // 1. Regra de Negócio: Checar unicidade do título
        if (BibliotecaRepository.existeLivroComTitulo(titulo)) {
            throw new ValidacaoError(`Já existe um livro com o título "${titulo}"!`);
        }

        const livro = LivroFactory.criarLivro(titulo, autor, ano, categoria);

        // 2. Validação: Aplicar Chain of Responsibility
        cadeiaValidacao.validar(livro);

        // 3. Persistência
        return BibliotecaRepository.adicionarLivro(livro, nomeColecao);
    }

    async atualizarLivro(codigo, dadosAtualizados) {
        const codigoInt = parseInt(codigo);
        if (isNaN(codigoInt)) throw new ValidacaoError("Código inválido.");

        // Pode-se revalidar os dados atualizados aqui, se necessário.
        
        const sucesso = BibliotecaRepository.atualizarLivro(codigoInt, dadosAtualizados);
        if (!sucesso) {
            throw new Error("Livro não encontrado para atualização.");
        }
        return { message: "Livro atualizado com sucesso." };
    }

    async deletarLivro(codigo) {
        const codigoInt = parseInt(codigo);
        if (isNaN(codigoInt)) throw new ValidacaoError("Código inválido.");
        
        const sucesso = BibliotecaRepository.deletarLivro(codigoInt);
        if (!sucesso) {
            throw new Error("Livro não encontrado para deleção.");
        }
        return { message: "Livro deletado com sucesso." };
    }
    
    async criarColecao(nome) {
        if (!nome || BibliotecaRepository.encontrarColecao(nome)) {
            throw new ValidacaoError("Nome de coleção inválido ou já existente.");
        }
        return BibliotecaRepository.adicionarColecao(nome);
    }
}

module.exports = new LivroService();