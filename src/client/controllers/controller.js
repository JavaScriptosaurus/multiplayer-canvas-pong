export default class Controller {

    constructor (model, view) {
        this.model = model;
        this.view = view;
    }

    init () {
        this.view.events.subscribe('test', alertMessage => {
            console.log(alertMessage);
        })
    }

}
