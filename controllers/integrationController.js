import httpStatus from 'http-status';
//import pick from '../utils/pick.js';
import {ApiError} from '../utils/ApiError.js';
import {catchAsync} from '../utils/catchAsync.js';
import * as integrationService from '../services/integration.js';

//CRUD
const addProduct = catchAsync(async (req, res,next) => {
  const data = await integrationService.addProduct(req.body);
  res.status(httpStatus.OK).send(data);
});
const addAttribute = catchAsync(async (req, res,next) => {
    const data = await integrationService.addAttribute(req.body);
    res.status(httpStatus.OK).send(data);
});

export {addProduct, addAttribute};