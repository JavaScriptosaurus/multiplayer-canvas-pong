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

        callbacks.forEach(callback => {
            callback(...args);
        });

        return this;

    };

    const unsubscribe = function (event, fn) {

        // If our event isn't in the events array, return false.
        if (!_events[event]) {
            return this;
        }

        _events[event].forEach((callback, index, arr) => {
            if (callback === fn) {
                arr.splice(index, 1);
            }
        });

        return this;

    };

    return {
        subscribe,
        publish,
        unsubscribe
    };

}
