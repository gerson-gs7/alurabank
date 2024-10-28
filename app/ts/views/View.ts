import { logarTempoDeExecucao } from "../helpers/decorators/index";
//declare var $: any;
export abstract class View<T>{

    //private _elemento: Element;
    protected _elemento: JQuery;
    private _escapar: boolean;
    
    constructor(seletor: string, escapar: boolean = false) {
        //this._elemento = document.querySelector(seletor); 
        this._elemento = $(seletor)
        this._escapar = escapar;
    }
    @logarTempoDeExecucao(true)
    uptade(model: T){
        
        
        let template = this.template(model);
       
        if(this._escapar){
            template = template.replace(/<script>[\s\S]*?<\/script>/g,'');
        }
        
        this._elemento.html(template);
        //this._elemento.innerHTML = this.template(model);

        
    }
    abstract template(model: T): string;
}

