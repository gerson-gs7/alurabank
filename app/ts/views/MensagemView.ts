class MensagemView extends View{

    uptade(model: string){
        this._elemento.innerHTML = this.template(model);
    }

    template(model: string){
        return `<p class="alert alert-info">${model}</p>`
    }
}