// src/services/Validador.js
const CATEGORIAS_VALIDAS = ["Fantasia", "Romance", "Distopia", "Ciência", "História", "Tecnologia"];

class ValidacaoError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidacaoError";
    }
}

class Validador {
    setProximo(proximo) {
        this.proximo = proximo;
        return proximo;
    }

    validar(livro) {
        if (this.proximo) return this.proximo.validar(livro);
        return true;
    }
}

class ValidadorTitulo extends Validador {
    validar(livro) {
        if (!livro.titulo || livro.titulo.trim() === "") {
            throw new ValidacaoError("Título inválido!");
        }
        return super.validar(livro);
    }
}

class ValidadorAno extends Validador {
    validar(livro) {
        const anoAtual = new Date().getFullYear();
        if (!livro.ano || livro.ano > anoAtual) {
            throw new ValidacaoError("Ano inválido! Não é possível cadastrar livros do futuro.");
        }
        return super.validar(livro);
    }
}

class ValidadorCategoria extends Validador {
    validar(livro) {
        if (!CATEGORIAS_VALIDAS.includes(livro.categoria)) {
            throw new ValidacaoError("Categoria inválida! Use: " + CATEGORIAS_VALIDAS.join(", "));
        }
        return super.validar(livro);
    }
}

// Configuração da cadeia de validação
const cadeiaValidacao = new ValidadorTitulo();
cadeiaValidacao
    .setProximo(new ValidadorAno())
    .setProximo(new ValidadorCategoria());

module.exports = {
    cadeiaValidacao,
    ValidacaoError
};