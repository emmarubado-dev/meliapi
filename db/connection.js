import mongoose from 'mongoose';
import { dbPort, dbName, host, dialect, isDev, isTest } from '../config/config.js'
import { logger } from '../config/logger.js'


const connectDB = async () => {
    try {
        console.log(`${dialect}://${host}:${dbPort}/${dbName}`);
        const conn = await mongoose.connect("mongodb+srv://emmarubado:5l2gCiidUU1WPyWT@cluster0.9zb5tyi.mongodb.net/").then(async () => {
            if(isDev() || isTest()){
            }
        });
        logger.debug(`DB CONNECTION ON ${dialect}://${host}:${dbPort}/${dbName}`);
    } catch (err) {
        logger.info('MongoDB connection error');
        logger.error(err);
        process.exit(1);
    }
}

export default connectDB;