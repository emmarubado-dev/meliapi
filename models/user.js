import mongoose from 'mongoose';
import {toJSON} from './plugins/toJson.js';

const userSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true },
    access_token: String,
    token_type: String,
    expires_in: Number,
    scope: String,
    refresh_token: String,
});

// Agrega el plugin de conversion de mongoose a json
userSchema.plugin(toJSON);

const User = mongoose.model('User', userSchema);
export {User};