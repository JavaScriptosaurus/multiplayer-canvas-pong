import * as chai from 'chai';
import PubSub from '../../utils/pubsub';

const expect = chai.expect;

describe('The PubSub util', function () {

    it ('should allow an event to be registered', function (done) {

        const pubsub = new PubSub();

        pubsub.subscribe('event', done);

        pubsub.publish('event');

    });

    it ('should allow an multiple subscriptions', function (done) {

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

    it ('should allow an unsubscriptions', function () {

        const pubsub = new PubSub();
        const numSubscriptions = 2;

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
