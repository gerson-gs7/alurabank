import { NegociacoesView, MensagemView } from "../views/index";
import { Negociacao, Negociacoes, NegociacaoParcial } from "../models/index";
import { domInject, throttle } from "../helpers/decorators/index";
import { NegociacaoService } from "../service/index";
import { imprime } from "../helpers/index";

export class NegociacaoController {
    /*private _inputData: HTMLInputElement;
      private _inputQuantidade: HTMLInputElement;
      private _inputvalor: HTMLInputElement;*/

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputvalor: JQuery;

    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagensView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor() {
        /*
        Selecionando os elementos no DOM
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputvalor = $("#valor");*/

        this._negociacoesView.uptade(this._negociacoes);
    }
    @throttle(500)
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo) {
            this._mensagensView.uptade('Somente negociações em dias úteis, por favor!');
            return
        }
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputvalor.val())
        );
        imprime(negociacao, this._negociacoes);
        this._negociacoes.adiciona(negociacao);
        this._negociacoes.paraTexto();
        this._negociacoesView.uptade(this._negociacoes);
        this._mensagensView.uptade('Negociação adicionada com sucesso!')

    }

    @throttle(500)
    async importaDados() {
        /*Implementando método async/await
        */
        try {
            const negociacoesParaImportar = await this._service.obterNegociacoes(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error(res.statusText);
                }
            });

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar
                .filter(negociacao =>
                    !negociacoesJaImportadas.some(jaImportada =>
                        negociacao.ehIgual(jaImportada)
                    )
                )
                .forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao));
            this._negociacoesView.uptade(this._negociacoes);
        }

        catch (err) {
            this._mensagensView.uptade(err.message)
        }
    }
    /* 
    Sem async / await
    importaDados() {

        this._service
        .obterNegociacoes(res => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(negociacoesParaImportar => {

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar
                .filter(negociacao =>
                    !negociacoesJaImportadas.some(jaImportada =>
                        negociacao.ehIgual(jaImportada)
                    )
                )
            .forEach(negociacao =>
                this._negociacoes.adiciona(negociacao));
                this._negociacoesView.uptade(this._negociacoes);
            })
            .catch(err => {
                this._mensagensView.uptade(err.message);
            });
    }*/

}
enum DiaDaSemana {

    Domingo, Segunda, Terca, Quarta, Quinta, Sexta, Sabado
}