import mongoose from 'mongoose';
import { dbPort, dbName, host, dialect, isDev, isTest } from '../config/config.js'
import { logger } from '../config/logger.js'


const connectDB = async () => {
    try {
        console.log(`${dialect}://${host}:${dbPort}/${dbName}`);
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/melisync").then(async () => {
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