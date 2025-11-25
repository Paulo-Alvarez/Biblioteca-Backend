// src/repositories/BibliotecaRepository.js
const Livro = require('../models/Livro');
const ColecaoLivros = require('../models/ColecaoLivros');

// Simula a persistência em memória (seria substituído por um DB real)
class BibliotecaRepository {
    constructor() {
        this.colecoes = [];
        this.proximoCodigo = 1;
        this.semColecao = null;
        this.carregarDadosIniciais(); 
    }

    // Adaptado para simular a carga de dados
    carregarDadosIniciais() {
        // Simula o carregamento (poderia ser de um arquivo JSON ou DB)
        const semColecao = new ColecaoLivros("Sem Coleção");
        this.colecoes.push(semColecao);
        this.semColecao = semColecao;

        // Recuperação do maior código, se houvesse dados reais
    }

    // --- Métodos de Acesso a Dados ---

    gerarCodigo() {
        return this.proximoCodigo++;
    }

    // Retorna todas as coleções
    listarTudo() {
        return this.colecoes;
    }
    
    // Encontra uma coleção pelo nome
    encontrarColecao(nome) {
        return this.colecoes.find(c => c.nome === nome);
    }

    adicionarColecao(nome) {
        const novaColecao = new ColecaoLivros(nome);
        this.colecoes.push(novaColecao);
        return novaColecao;
    }

    adicionarLivro(livro, nomeColecao) {
        let colecao = nomeColecao ?
            this.encontrarColecao(nomeColecao) :
            this.semColecao;

        if (!colecao && nomeColecao) {
            colecao = this.adicionarColecao(nomeColecao);
        } else if (!colecao) {
             colecao = this.semColecao;
        }

        colecao.adicionar(livro);
        return livro;
    }
    
    // Retorna true se um livro com o título já existe em qualquer coleção
    existeLivroComTitulo(titulo) {
        return this.colecoes.some(c => c.listar().some(l => l.titulo === titulo));
    }
    
    // Procura e atualiza em qualquer coleção
    atualizarLivro(codigo, dadosAtualizados) {
        for (let c of this.colecoes) {
            if (c.atualizar(codigo, dadosAtualizados)) return true;
        }
        return false;
    }
    
    // Procura e deleta em qualquer coleção
    deletarLivro(codigo) {
        for (let c of this.colecoes) {
            if (c.deletar(codigo)) return true;
        }
        return false;
    }
}

// Singleton para garantir uma única instância de persistência
module.exports = new BibliotecaRepository();