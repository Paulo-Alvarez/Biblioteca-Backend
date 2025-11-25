// src/models/Livro.js
const ItemBiblioteca = require('./ItemBiblioteca');

class Livro extends ItemBiblioteca {
    constructor(codigo, titulo, autor, ano, categoria) {
        super();
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.categoria = categoria;
    }

    listar() { return [this]; }

    atualizar(codigo, dados) {
        if (this.codigo === codigo) {
            // Remove o código dos dados a atualizar para evitar alteração
            const { codigo, ...dadosSemCodigo } = dados; 
            Object.assign(this, dadosSemCodigo);
            return true;
        }
        return false;
    }

    deletar(codigo) {
        return this.codigo === codigo;
    }
}

module.exports = Livro;