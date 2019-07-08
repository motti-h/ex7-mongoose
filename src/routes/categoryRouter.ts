import { Router } from 'express';
import * as categoryHendlers from '../routesHendlers/CategorysHendlers';
import * as middle from '../utils/middleware';
import * as credentials from '../models/credentials';
import * as asyncMaker from '../utils/async';
const categoryRouter = Router();

categoryRouter.use('/:id', middle.middleCheckId);

categoryRouter.get('/', asyncMaker.wrapAsyncAndSend( categoryHendlers.categoryGetHandler) );

categoryRouter.get('/:id/products', asyncMaker.wrapAsyncAndSend(categoryHendlers.categoryGetProductsByIdHandler));

categoryRouter.get('/:id', asyncMaker.wrapAsyncAndSend(categoryHendlers.categoryGetByIdHandler));

categoryRouter.use(
middle.authenticate(),
middle.authorize(credentials.UserRole.Admin));

categoryRouter.post('/', asyncMaker.wrapAsyncAndSend(categoryHendlers.categoryPostHandler));

categoryRouter.put('/:id', asyncMaker.wrapAsyncAndSend(categoryHendlers.categoryPutHandler));

categoryRouter.delete('/:id', asyncMaker.wrapAsyncAndSend(categoryHendlers.categoryDeleteHandler));

export {categoryRouter};
