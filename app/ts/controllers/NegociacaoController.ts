import { NegociacoesView, MensagemView } from "../views/index";
import { Negociacao, Negociacoes } from "../models/index";
import { domInject } from "../helpers/decorators/index";

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

    constructor(){
        /*
        Selecionando os elementos no DOM
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputvalor = $("#valor");*/

        this._negociacoesView.uptade(this._negociacoes);
    }
    adiciona(event: Event){

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g,','));
        
        if(data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo){
            this._mensagensView.uptade('Somente negociações em dias úteis, por favor!');
            return
        }
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputvalor.val())
        );
        this._negociacoes.adiciona(negociacao);
        
        this._negociacoesView.uptade(this._negociacoes);
        this._mensagensView.uptade('Negociação adicionada com sucesso!')

    }
    importaDados(){

        function isOk(res: Response){
            if(res.ok){
                return res;
            }else{
                throw new Error(res.statusText);
            }
        }


        fetch('http://localhost:8080/dados')
        .then(res => isOk(res))
        .then(res => res.json())
        .then((dados: any[]) =>
            dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            .forEach(negociacao => this._negociacoes.adiciona(negociacao))
        )
        .catch(err => console.log(err.message));
    }

}

enum DiaDaSemana {

    Domingo, Segunda, Terca, Quarta, Quinta, Sexta, Sabado
}