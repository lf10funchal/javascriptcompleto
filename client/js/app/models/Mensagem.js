class Mensagem {
    constructor(mensagem = '') {
        this._texto = mensagem;
    }

    get texto(){
        return this._texto;
    }

    set texto(mensagem){
        this._texto = mensagem;
    }
}