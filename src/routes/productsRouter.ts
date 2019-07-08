import { Router } from 'express';
import * as ProductsHendlers from '../routesHendlers/ProductsHendlers';
import * as asyncMaker from '../utils/async';
import * as middle from '../utils/middleware';
import * as credentials from '../models/credentials';
const productRouter = Router();

productRouter.use('/:id', middle.middleCheckId);

productRouter.get('/', middle.authenticate(),
asyncMaker.wrapAsyncAndSend(ProductsHendlers.productGetHandler));

productRouter.get('/:id',
middle.authenticate(),
asyncMaker.wrapAsyncAndSend(ProductsHendlers.productGetSpecificHandler) );

productRouter.delete('/:id',
middle.authenticate(),
middle.authorize(credentials.UserRole.Admin, credentials.UserRole.Contributor),
asyncMaker.wrapAsyncAndSend(ProductsHendlers.productDeleteHandler));

productRouter.use('/',
middle.authenticate(),
middle.authorize(credentials.UserRole.Admin),
middle.middleCheckName);

productRouter.post('/', asyncMaker.wrapAsyncAndSend(ProductsHendlers.productPostHandler));

productRouter.put('/:id', asyncMaker.wrapAsyncAndSend(ProductsHendlers.productPutHandler));

export { productRouter };
