import * as MVC from '../utils/mvc';

class Controller extends MVC.Controller {

    init () {
        this.eventSystem.addListener('view:test', alertMessage => {
            console.log(alertMessage); //eslint-disable-line no-console
        });
    }

}

export default Controller;
