import * as chai from 'chai';
import EventSystem from '../../components/eventSystem';

const expect = chai.expect;

describe('The PubSub util', () => {

    it ('should allow an event to be registered', done => {

        const eventSystem = Object.create(EventSystem);

        eventSystem.on('event', done);

        eventSystem.trigger('event');

    });

    it ('should allow an \'any\' event to be registered', done => {

        const eventSystem = Object.create(EventSystem);

        eventSystem.on('*', done);

        eventSystem.trigger('event');

    });

    it ('should allow an multiple subscriptions seperately', done => {

        const eventSystem = Object.create(EventSystem);
        const numSubscriptions = 2;

        const countingCallback = (() => {
            let _count = 0;
            return () => {
                _count++;
                if (_count === numSubscriptions) {
                    done();
                }
            };
        })();

        eventSystem.on('event', countingCallback);
        eventSystem.on('event', countingCallback);

        eventSystem.trigger('event');

    });

    it ('should allow an multiple subscriptions as a set', done => {

        const eventSystem = Object.create(EventSystem);

        const countingCallback = (() => {
            let _count = 0;
            return () => {
                _count++;
                if (_count === Object.keys(eventsObj).length) {
                    done();
                }
            };
        })();

        const eventsObj = {
            'event1': countingCallback,
            'event2': countingCallback
        };

        eventSystem.on(eventsObj);

        eventSystem.trigger('event1');
        eventSystem.trigger('event2');

    });

    it ('should pass an argument into the callback', done => {

        const eventSystem = Object.create(EventSystem);
        const args = ['dog', 'cat'];

        eventSystem.on('event', (callback, arg0, arg1) => {
            expect(arg0).to.equal(args[0]);
            expect(arg1).to.equal(args[1]);
            callback();
        });

        eventSystem.trigger('event', done, ...args);

    });

    it ('should allow an unsubscriptions', () => {

        const eventSystem = Object.create(EventSystem);

        let count = 0;

        const callback1 = () => { count++; };
        const callback2 = () => { count++; };

        eventSystem.on('event', callback1);
        eventSystem.on('event', callback2);

        eventSystem.off('event', callback1);

        eventSystem.trigger('event');

        expect(count).to.equal(1);

    });

});
