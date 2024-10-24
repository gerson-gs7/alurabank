class View<T>{

    private _elemento: Element;

    constructor(seletor: string) {
        this._elemento = document.querySelector(seletor);
    }
    uptade(model: T){
        this._elemento.innerHTML = this.template(model);
    }
    template(model: T): string{
        throw new Error('Você deve implementar o método template')
    }
}