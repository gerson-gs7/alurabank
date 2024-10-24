class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._mensagensView = new MensagemView('#mensagemView');
        this._inputData = document.querySelector("#data");
        this._inputQuantidade = document.querySelector("#quantidade");
        this._inputvalor = document.querySelector("#valor");
        this._negociacoesView.uptade(this._negociacoes);
    }
    adiciona(event) {
        event.preventDefault();
        const negociacao = new Negociacao(new Date(this._inputData.value.replace(/-/g, ',')), parseInt(this._inputQuantidade.value), parseFloat(this._inputvalor.value));
        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.uptade(this._negociacoes);
        this._mensagensView.uptade('Negociação adicionada com sucesso!');
    }
}
