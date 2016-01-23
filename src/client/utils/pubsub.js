let _events = new WeakMap();

export default class PubSub {

    constructor () {
        _events.set(this, []);
    }

    addListener (event, callback) {

        // If we don't have this event in our registry, add it.
        if (!_events.get(this)[event]) {
            _events.get(this)[event] = [];
        }

        // Register callback against the event.
        _events.get(this)[event].push(callback);

        return this;

    }

    addMultipleListeners (eventsObj) {

        Object.keys(eventsObj).forEach(event => {
            this.addListener(event, eventsObj[event]);
        });

        return this;

    }

    trigger (event, ...args) {

        const events = _events.get(this);

        // If our event isn't in the events array, return false.
        if (!events[event] && !events['*']) {
            return this;
        }

        let callbacks = events[event] || [];

        // Allows subscription to an 'any' event.
        if (events['*']) {
            callbacks = callbacks.concat(events['*']);
        }

        callbacks.forEach(callback => {
            callback(...args);
        });

        return this;

    }

    removeListener (event, fn) {

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
