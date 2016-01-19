export default function () {

    // Our events registry, with callbacks (sub-arrays) per event.
    let _events = [];

    const subscribe = function (event, callback) {

        // If we don't have this event in our registry, add it.
        if (!_events[event]) {
            _events[event] = [];
        }

        // Register callback against the event.
        _events[event].push(callback);

        return this;

    };

    const publish = function (event, ...args) {

        // If our event isn't in the events array, return false.
        if (!_events[event]) {
            return this;
        }

        const callbacks = _events[event];

        callbacks.forEach(registeredCallback => {
            registeredCallback.apply(this, ...args);
        });

        return this;

    };

    const unsubscribe = function (event, callback) {

        // If our event isn't in the events array, return false.
        if (!_events[event]) {
            return this;
        }

        _events[event].forEach((registeredCallback, index, arr) => {
            if (registeredCallback === callback) {
                arr.splice(index, 1);
            }
        });

    };

    return {
        subscribe,
        publish,
        unsubscribe
    };

}
