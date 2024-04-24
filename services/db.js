import { isProd, isMLAllInOne,meliClientId,meliSecret,meliRedirectURI,meliAuthURL,meliTokenURL  } from '../config/config.js';
import { logger } from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';
import httpStatus from 'http-status';
import {User} from '../models/user.js';
import {Product} from '../models/products.js';
import {Event} from '../models/events.js';
import {Service} from '../models/service.js';

const assertUser = async (payload) => {
    let res;
    logger.info("assertUser//Payload:"+JSON.stringify(payload));
    try {
        //Check user
        const existingUser = await User.findOne({ user_id: payload.user_id });
    
        if (existingUser) {
          //Update
          await User.updateOne({ user_id: payload.user_id }, payload);
          res = {
            user: payload,
            new: false,
            };
        } else {
          //Insert
          const newUser = new User(payload);
          await newUser.save();
          res = {
            user: newUser,
            new: true,
            };
        }
      } catch (err) {
        logger.info(err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'err');
      }
      return res;
};
const getUser = async (userid) => {
  let res;
  logger.info("getUser//UserId:"+JSON.stringify(userid));
  try {
      //Check user
      const existingUser = await User.findOne({ user_id: userid });
  
      if (existingUser) {
        res = {
          user: existingUser,
          };
      } else {
        res = {
          user: null,
        };
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User Not Found');
      }
    } catch (err) {
      logger.info(err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'err');
    }
    return res;
};

const getUserProducts = async (payload) => {
  let res;
  logger.info("getUserProducts//Payload:"+JSON.stringify(payload));
  try {
      //Check user
      const existingProducts = await Product.find({ seller_id: payload.user_id});
  
      if (existingProducts) { 
        res = {
          user_id: payload.user_id,
          products: [...existingProducts],
        };
      } else {
        //empty
        res = {
          products: null,
          };
      }
    } catch (err) {
      logger.info(err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'err');
    }
    return res;
};
const getServices = async (payload) => {
  let res;
  logger.info("getServices//Payload:"+JSON.stringify(payload));
  try {
      //Check user
      const existingUser = await User.findOne({ user_id: payload.user_id });
  
      if (existingUser) {
        const existingServices = await Service.find({ user_id: payload.user_id });
        if (existingServices) {
          res = {
            user: existingUser,
            services: [existingServices],
          };
        } else {
          res = {
            user: existingUser,
            services: [],
          };
        }
      } else {
        //NotFound
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User Not Found');
      }
    } catch (err) {
      logger.info(err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'err');
    }
    return res;
};
const addService = async (payload) => {
  let res;
  logger.info("addService//Payload:"+JSON.stringify(payload));
  try {
      //Check user
      const existingUser = await User.findOne({ user_id: payload.user_id });
  
      if (existingUser) {
        const existingService = await Service.findOne({ user_id: payload.user_id, service_id: payload.service_id });
        logger.info("addService//existingService:"+JSON.stringify(existingService));
        if (existingService) {
          //Update
          await Service.updateOne({ user_id: payload.user_id, service_id: payload.service_id }, payload);
          res = {
            user: existingUser,
            services: [existingService],
          };
        } else {
          //Insert
          const newService = new Service(payload);
          await newService.save();
          res = {
            user: existingUser,
            services: newService,
          };
        }
      } else {
        //NotFound
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User Not Found');
      }
    } catch (err) {
      logger.info(err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'err');
    }
    return res;
};

const assertProduct = async (payload) => {
  let res;
  logger.info("assertUser//Payload:"+JSON.stringify(payload));
  try {
      //Check Product
      const existingProduct = await Product.findOne({ seller_id: payload.body.seller_id, id: payload.body.id});
  
      if (existingProduct) {
        //Update
        await Product.updateOne({ seller_id: payload.body.seller_id, id: payload.body.id}, payload.body);
        res = {
          product: {...payload.body},
          new: false,
          };
      } else {
        //Insert
        const newProduct = new Product(payload.body);
        await newProduct.save();
        res = {
          product: newProduct,
          new: true,
          };
      }
    } catch (err) {
      logger.info(err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'err');
    }
    return res;
};

const assertEvent = async (payload) => {
  let res;
  logger.info("assertEvent//Payload:"+JSON.stringify(payload));
  try {
      //Check user
      const existingEvent = await Event.findOne({ user_id: payload.user_id, id: payload.id});
  
      if (existingEvent) {
        //Update
        await Event.updateOne({ seller_id: payload.seller_id, id: payload.id}, payload);
        res = {
          event: {...payload}
          };
      } else {
        //Insert
        const newEvent = new Event(payload);
        await newEvent.save();
        res = {
          event: newEvent
          };
      }
    } catch (err) {
      logger.info(err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error inserting event');
    }
    return res;
};

export {assertUser,assertProduct,assertEvent,getUser,addService,getServices,getUserProducts};