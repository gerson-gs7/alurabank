class MensagemView {
    constructor(seletor) {
        this._elemento = document.querySelector(seletor);
    }
    uptade(model) {
        this._elemento.innerHTML = this.template(model);
    }
    template(model) {
        return `<p class="alert alert-info">${model}</p>`;
    }
}
