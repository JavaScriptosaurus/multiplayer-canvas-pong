/** @module components/domEvents */

export default {

    addDomEvents: function (domEvents) {

        Object.keys(domEvents).forEach(eventKey => {
            const elementEvent = eventKey.split(':');
            const eventName = elementEvent[1];
            let element;

            if (elementEvent[0] === 'document') {
                element = document;
            } else {
                element = document.querySelector(elementEvent[0]);
            }

            if (element) {
                element.addEventListener(eventName, domEvents[eventKey].bind(this));
            }
        });

    }

};
