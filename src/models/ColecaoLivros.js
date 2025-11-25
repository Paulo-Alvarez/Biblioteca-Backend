// src/models/ColecaoLivros.js
const ItemBiblioteca = require('./ItemBiblioteca');

class ColecaoLivros extends ItemBiblioteca {
    constructor(nome) {
        super();
        this.nome = nome;
        this.itens = []; // Contém instâncias de Livro
    }

    adicionar(item) {
        this.itens.push(item);
    }

    listar() {
        return this.itens;
    }

    atualizar(codigo, dados) {
        for (let item of this.itens) {
            if (item.atualizar(codigo, dados)) return true;
        }
        return false;
    }

    deletar(codigo) {
        const index = this.itens.findIndex(item => item.deletar(codigo));
        if (index !== -1) {
            this.itens.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = ColecaoLivros;