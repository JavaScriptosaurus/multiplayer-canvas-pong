export class MVCBase {

    constructor (eventSystem) {
        this.eventSystem = eventSystem;
        this.init();
    }

    init () {
        // No-op
    }

}

export class Controller extends MVCBase {

    constructor (eventSystem, model, view) {
        super(eventSystem);
        Object.assign(this, {model, view});
    }

}

export class Model extends MVCBase {

    // Nothing here yet.

}

export class View extends MVCBase {

    // Nothing here yet.

}
