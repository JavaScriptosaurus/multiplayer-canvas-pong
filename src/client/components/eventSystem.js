/**
 * Event System component.
 * @module components/eventSystem
 * A PubSub-like event system that can be used to create 'observable' objects.
 */

/*
 * Set up the private _events constant. The WeakMap allows each instance of this
 * component to have exclusive access to its events.
 */
const _events = new WeakMap();

/**
 * Adds multiple event listeners.
 * Internally iterates through object and calls on for each.
 * @param {object} eventsObj - Multiple event/callback pairs to register.
 */
const addMultipleListeners = function (eventsObj) {
    Object.keys(eventsObj).forEach(event => {
        this.on(event, eventsObj[event]);
    });

    return this;
};

/**
 * A EventSystem object.
 * Methods are chainable, and the list of registered events is private to each
 * instance.
 */
const EventSystem = {

    /**
     * Adds an event listener.
     * @param {string} event - The event to subscribe to.
     * @param {function} callback - The callback for the event.
     */
    on: function (event, callback) {

        // On run of 'on()'', set 'this' as our WeakMap key, with value [].
        if (!_events.has(this, [])) {
            _events.set(this, []);
        }

        // Allow an event object to be passed through, and handled with magic.
        if (event instanceof Object) {
            return addMultipleListeners.call(this, event);
        }

        // If we don't have this event in our registry, add it.
        if (!_events.get(this)[event]) {
            _events.get(this)[event] = [];
        }

        // Register callback against the event.
        _events.get(this)[event].push(callback);

        return this;

    },

    /**
     * Triggers an event.
     * Arguments passed in after the event name will be passed through to each
     * registered callback for that event.
     * @param {string} event - The event to trigger/publish.
     * @param {...args} ...args - The arguments to pass through to the callback.
     */
    trigger: function (event, ...args) {

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

    },

    /**
     * Removes an event listener.
     * @param {string} event - The event to unsubscribe to.
     * @param {function} fn - The callback to remove.
     */
    off: function (event, fn) {

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

};

export default EventSystem;
