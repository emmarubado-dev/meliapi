import { isProd, isMLAllInOne, meliClientId,meliSecret,meliRedirectURI,meliAuthURL,meliTokenURL,shopApiUrl } from '../config/config.js';
import { logger } from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';
import httpStatus from 'http-status';
import {template} from '../utils/templateURL.js'
import * as dbServ from './db.js';

function extractPictureUrls(pictures) {
  logger.info('extractPictureUrls||input:'+JSON.stringify(pictures));
  if ( !pictures || !Array.isArray(pictures)) {
    throw new Error('Invalid input format');
  }

  return pictures.map(picture => picture.url);
}

const addProduct = async (payload) => {
  if(payload == null ){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payload no recibido');
  }
  let res = await dbServ.getUserProducts(payload);
  res.products.forEach((ele) =>{
    logger.info('productInfo||ele:'+JSON.stringify(ele));
    const requestOptions = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        "Access-Control-Origin": "*",
        //'Cookie': 'admin_token=<your jwt token id>'
      },
      body: {
        name: ele.title,
        description: JSON.stringify(ele),
        url_key: ele.id,
        meta_title: ele.title,
        status:1,
        sku: ele.id,
        price: ele.price,
        weight: 0,
        qty: 1,
        manage_stock: 0,
        group_id: 1,
        visibility: 1,
        images: [extractPictureUrls(ele.pictures)],
      },
    };
    logger.info("BODY"+JSON.stringify(requestOptions.body));
    
    let data = fetch(shopApiUrl+"products", requestOptions)
      .then(response => response.json())
      .then(async (data)=> {
        if(data.error !==undefined){
          logger.info('getToken||Error'+JSON.stringify(data));
          throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Response from Provider');
        }else{
          //logger.info('getToken||fetchData:'+JSON.stringify(data));
          let u = await dbServ.assertUser(data);
          //logger.info('getToken||userInfo:'+u);
          return u;
        }
      })
      .catch((error)=> {
        logger.info(error);
      });  
  });
  
  let products,data;
  
  //let userLog = await dbServ.assertUser(data);
  /*if(data!==undefined && data.user !== undefined && data.user.user_id !== undefined){
    //logger.info('getToken To Products');
    if(isMLAllInOne()){
      products = getProducts(data.user.access_token, data.user.user_id);
    }else{
    }
  }*/
/*
  if(!isProd()){
    logger.info('getToken||data:'+JSON.stringify(data));
    if(isMLAllInOne()){
      logger.info('getToken||products:'+JSON.stringify(products)); 
      logger.info('getToken||memory:'+JSON.stringify(memory));
    }
    logger.info('getToken||res:'+JSON.stringify(res));
  }*/
  return res;
};

const addAttribute = async (payload) => {
  if(payload == null ){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payload no recibido');
  }

  let res = await dbServ.getUserProducts(payload);

  const requestOptions = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      "Access-Control-Origin": "*",
      //'Cookie': 'admin_token=<your jwt token id>'
    },
    body: {},
  };


  if(!isProd()){
    logger.info(JSON.stringify(res));
  }
  return res;
};

const getUser = async (user_id) => {
  if(user_id == null ){
      throw new ApiError(httpStatus.BAD_REQUEST, 'User_id no recibido');
  }
  let res = dbServ.getUser(user_id);
  if(!isProd()){
    logger.info('getUser||user_id:'+JSON.stringify(user_id));
    logger.info('getUser||res:'+JSON.stringify(res));
  }
  return res;
};

const getProducts = async (ACTK, userId) => {
  if(ACTK == null || userId == null ){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faltan datos');
  }
  
  const requestOptions = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
			"Access-Control-Origin": "*",
      'Authorization': 'Bearer '+ACTK,
    },
  };

  let ret = await fetch(`https://api.mercadolibre.com/users/${userId}/items/search`, requestOptions)
    .then(response => response.json())
    .then(async (data)=> {
      if(data.error !==undefined){
        logger.info('getProducts||Error'+JSON.stringify(data));
        throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Response from Provider');
      }else{
        //logger.info('getProducts||fetchData:'+JSON.stringify(data));
        //let u = await dbServ.assertUser(data);
        //logger.info('getProducts||userInfo:'+u);
        return data;
      }
    })
    .catch((error)=> {
      logger.info(error);
    });
    
    if(ret!==undefined && ret.results !== undefined && ret.results.length >0){
      ret.results.forEach((ele) =>{
        //logger.info('productInfo||ele:'+JSON.stringify(ele));
        getProductInfo(ACTK, userId,ele);
      });
    }/*
  if(!isProd()){
    logger.info('getProducts||data:'+JSON.stringify(ret));
  }*/
  return ret;
};

const getProductInfo = async (ACTK, userId, product) => {

  if(ACTK == null || userId == null || product == null ){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faltan datos');
  }
  
  const requestOptions = {
    method: 'GET',
    headers: {
      'accept': '*/*',
      //'content-type': 'application/json',
			"Access-Control-Origin": "*",
      'Authorization': 'Bearer '+ACTK,
    },
  };
  let ret = await fetch(`https://api.mercadolibre.com/items?ids=${product}`, requestOptions)
    .then(response => response.json())
    .then(async (data)=> {
      if(data.error !==undefined){
        logger.info('getProductInfo||Error'+JSON.stringify(data));
        throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Response from Provider');
      }else{
        //logger.info('getProductInfo||fetchData:'+JSON.stringify(data));
        if(data.length > 0){
          let u = await dbServ.assertProduct(data[0]);
          logger.info('getProductInfo||productInfo:'+JSON.stringify(u));
        }
        return data;
      }
    })
    .catch((error)=> {
      logger.info(error);
    });
/*
  if(!isProd()){
    logger.info('getProductInfo||data:'+JSON.stringify(ret));
  }*/
};

const processEvent = async (event) => {
  if(event == null || event === undefined){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Falta evento');
  }
  if(event.topic !== undefined){
    switch (event.topic) {
      case 'items_prices':
      case 'items':
        dbServ.assertEvent(event);
        logger.info("EVENTDATA//"+JSON.stringify(event));
        let userdata = await dbServ.getUser(event.user_id);
        logger.info("USERDATA//"+JSON.stringify(userdata));
        if(userdata != null){
          getProductInfo(userdata.user.access_token,userdata.user.user_id, (event.resource.includes('/') ? event.resource.replace("/items/","") : event.resource));
        }
        break;
      case 'orders_v2': 
      case 'questions':
      case 'payments':
      case 'messages':
        await dbServ.assertEvent(event);
        break;
      case 'quotations':
      case 'invoices':
      case 'claims':
      case 'public_offers':
      case 'public_candidates':
      default:
        await dbServ.assertEvent(event);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Evento no registrado');
    }
  }
  return 'Success';
};

const getServices = async (payload) => {
  if(payload == null || payload === undefined){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Falta informacion del usuario/servicio');
  }
  if(payload.user_id !== undefined){
    let res = await dbServ.getServices(payload);
    logger.info("getServices//"+JSON.stringify(res));
    if(res.services != null && res.services.length >0){
      logger.info("getServices//"+JSON.stringify(res.services));
    }else{
      logger.info("No posee Servicios");
      //throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'No posee Servicios');
    }
    return res;    
  }
  
};

const addService = async (payload) => {
  if(payload == null || payload === undefined){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payload Incompleto');
  }
  if(payload.user_id !== undefined){
    let res = await dbServ.addService(payload);
    logger.info("addService//"+JSON.stringify(res));
    if(res.services != null && res.services.length >0){
      logger.info("addService//"+JSON.stringify(res.services));
    }else{
      logger.info("No posee Servicios");
      //throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'No posee Servicios');
    }
    return res;    
  }
  return 'Success';
};

export {addAttribute, addProduct}