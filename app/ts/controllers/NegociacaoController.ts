import { NegociacoesView, MensagemView } from "../views/index";
import { Negociacao, Negociacoes } from "../models/index";

export class NegociacaoController {
  /*private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputvalor: HTMLInputElement;*/
    
    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputvalor: JQuery;

    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagensView = new MensagemView('#mensagemView');

    constructor(){
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputvalor = $("#valor");
        this._negociacoesView.uptade(this._negociacoes);
    }

    adiciona(event: Event){
        event.preventDefault();
        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g,',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputvalor.val())
        );
        this._negociacoes.adiciona(negociacao);
        
        this._negociacoesView.uptade(this._negociacoes);
        this._mensagensView.uptade('Negociação adicionada com sucesso!')
    }

}