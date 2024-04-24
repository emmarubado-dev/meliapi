import mongoose from 'mongoose';
import {toJSON} from './plugins/toJson.js';

const serviceSchema = new mongoose.Schema({
    service_id: String,
    user_id: String,
    useApi: Boolean,
    api: {
        url:String,
        method:String,//POST,GET,PUT
        requireAccessToken:Boolean,
        accessToken:String,
        queryParam:Boolean,
        bodyJson:Boolean,
    },
    db: {
        type:String,//SQL,POSGRES,MONGODB
        connectionUrl:String,
        user:String,
        pass:String,
        port:String,
        dbName:String,
        dbTable:String,
    },
});

// Agrega el plugin de conversion de mongoose a json
serviceSchema.plugin(toJSON);

const Service = mongoose.model('Service', serviceSchema);
export {Service};