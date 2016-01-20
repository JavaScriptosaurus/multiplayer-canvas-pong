import * as chai from 'chai';
import PubSub from '../../utils/pubsub';

const expect = chai.expect;

describe('The PubSub util', function () {

    it ('should allow an event to be registered', function (done) {

        const pubsub = new PubSub();

        pubsub.subscribe('event', done);

        pubsub.publish('event');

    });

    it ('should allow an multiple subscriptions seperately', function (done) {

        const pubsub = new PubSub();
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

        pubsub.subscribe('event', countingCallback);
        pubsub.subscribe('event', countingCallback);

        pubsub.publish('event');

    });

    it ('should allow an multiple subscriptions as a set', function (done) {

        const pubsub = new PubSub();

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

        pubsub.subscribeSet(eventsObj);

        pubsub.publish('event1');
        pubsub.publish('event2');

    });

    it ('should pass an argument into the callback', function (done) {

        const pubsub = new PubSub();
        const args = ['dog', 'cat'];

        pubsub.subscribe('event', (callback, arg0, arg1) => {
            expect(arg0).to.equal(args[0]);
            expect(arg1).to.equal(args[1]);
            callback();
        });

        pubsub.publish('event', done, ...args);

    });

    it ('should allow an unsubscriptions', function () {

        const pubsub = new PubSub();

        let count = 0;

        const callback1 = () => { count++; };
        const callback2 = () => { count++; };

        pubsub.subscribe('event', callback1);
        pubsub.subscribe('event', callback2);

        pubsub.unsubscribe('event', callback1);

        pubsub.publish('event');

        expect(count).to.equal(1);

    });

});
