import { logarTempoDeExecucao } from "../helpers/decorators/index";
import { Negociacao, Imprimivel } from "./index";

export class Negociacoes extends Imprimivel {
    private _negociacoes: Negociacao[] = []; 

    adiciona(negociacao: Negociacao): void{
        this._negociacoes.push(negociacao);
    }
    @logarTempoDeExecucao()
    paraArray(): Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log(JSON.stringify(this._negociacoes));
    }
}