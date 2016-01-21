let _events = new WeakMap();

export default class PubSub {

    constructor () {
        _events.set(this, []);
    }

    subscribe (event, callback) {

        // If we don't have this event in our registry, add it.
        if (!_events.get(this)[event]) {
            _events.get(this)[event] = [];
        }

        // Register callback against the event.
        _events.get(this)[event].push(callback);

        return this;

    }

    subscribeMultiple (eventsObj) {

        Object.keys(eventsObj).forEach(event => {
            this.subscribe(event, eventsObj[event]);
        });

        return this;

    }

    publish (event, ...args) {

        // If our event isn't in the events array, return false.
        if (!_events.get(this)[event]) {
            return this;
        }

        const callbacks = _events.get(this)[event];

        callbacks.forEach(callback => {
            callback(...args);
        });

        return this;

    }

    unsubscribe (event, fn) {

        // If our event isn't in the events array, return false.
        if (!_events.get(this)[event]) {
            return this;
        }

        _events.get(this)[event].forEach((callback, index, arr) => {
            if (callback === fn) {
                arr.splice(index, 1);
            }
        });

        return this;

    }

}
