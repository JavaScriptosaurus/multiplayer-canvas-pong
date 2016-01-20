import PubSub from '../utils/pubsub';

export default class Model {

    constructor () {
        this.events = new PubSub();
    }

}
