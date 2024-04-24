import httpStatus from 'http-status';
//import pick from '../utils/pick.js';
import {ApiError} from '../utils/ApiError.js';
import {catchAsync} from '../utils/catchAsync.js';
import * as meliService from '../services/mercadolibre.js';

//CRUD
const getCodeUrl = catchAsync(async (req, res,next) => {
  const key = await meliService.getCodeUrl();
  res.status(httpStatus.CREATED).send(key);
});
const getToken = catchAsync(async (req, res,next) => {
    const data = await meliService.getToken(req.body.code);
    res.status(httpStatus.OK).send(data);
});
const refreshToken = catchAsync(async (req, res,next) => {
    const data = await meliService.refreshToken(req.body.token);
    res.status(httpStatus.OK).send(data);
});

//HOOKS
const meliHooks = catchAsync(async (req, res,next) => {
  const data = await meliService.processEvent(req.body);
  res.status(httpStatus.OK).send(data);
});

//OPERATIONAL
const getServices = catchAsync(async (req, res,next) => {
  const data = await meliService.getServices(req.body);
  res.status(httpStatus.OK).send(data);
});
const addService = catchAsync(async (req, res,next) => {
  const data = await meliService.addService(req.body);
  res.status(httpStatus.OK).send(data);
});

const getUser = catchAsync(async (req, res,next) => {
  const data = await meliService.getUser(req.params.userId);
  res.status(httpStatus.OK).send(data);
});
const getProducts = catchAsync(async (req, res,next) => {
  const data = await meliService.getProducts(req.params.userId);
  res.status(httpStatus.OK).send(data);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export {getCodeUrl, getToken, refreshToken, getUser, getProducts, meliHooks,getServices,addService};