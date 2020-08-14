class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model){
        throw new Error('Precisa escrever o metodo template');
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}