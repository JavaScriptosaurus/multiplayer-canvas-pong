let _events = new WeakMap();

export default class PubSub {

    constructor () {
        _events.set(this, []);
    }

    subscribe (event, callback) {

        let events = _events.get(this);

        // If we don't have this event in our registry, add it.
        if (!events[event]) {
            events[event] = [];
        }

        // Register callback against the event.
        events[event].push(callback);
        _events.set(this, events);


        return this;

    }

    subscribeSet (eventSet) {

        Object.keys(eventSet).forEach(event => {
            this.subscribe(event, eventSet[event]);
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
