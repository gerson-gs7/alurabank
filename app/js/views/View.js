class View {
    constructor(seletor) {
        this._elemento = document.querySelector(seletor);
    }
    uptade(model) {
        this._elemento.innerHTML = this.template(model);
    }
    template(model) {
        throw new Error('Você deve implementar o método template');
    }
}
