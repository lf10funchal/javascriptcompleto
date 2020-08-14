class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document); 
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacao = new Bind(
            new ListaNegociacao(),
            new NegociacaoView($('#negociacaoView')),
            'adiciona', 'esvazia');
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
    }

    adiciona(event){
        event.preventDefault();
        this._listaNegociacao.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Inserido com sucesso';
        this._limpaFormulario();
    }

    importaNegociacao(){

        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacaoSemana(),
            service.obterNegociacaoRetrasada()
        ]).then(negociacoes => {
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacao.adiciona(negociacao));
            this._mensagem.texto = "Deu certo";
        })
        .catch(error => this._mensagem.texto = error);
        this._limpaFormulario();

    }

    apaga(){
        
        this._listaNegociacao.esvazia();
        this._mensagem.texto = 'Lista apagada com sucesso';
        this._limpaFormulario();
        
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }


}