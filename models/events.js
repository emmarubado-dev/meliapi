import mongoose from 'mongoose';
import {toJSON} from './plugins/toJson.js';

const eventSchema = new mongoose.Schema({
    _id: {
      type: String
    },
    topic: {
      type: String
    },
    resource: {
      type: String
    },
    user_id: {
      type: Number
    },
    application_id: {
      type: Number
    },
    attempts: {
      type: Number
    },
    recieved: {
      type: Date
    },
    sent: {
      type: Date
    }
});

// Agrega el plugin de conversion de mongoose a json
eventSchema.plugin(toJSON);
/**
 * @typedef Event
 */
const Event = mongoose.model('Event', eventSchema);
export {Event};
