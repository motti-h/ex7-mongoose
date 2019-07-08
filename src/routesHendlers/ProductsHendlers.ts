import { Product } from '../models';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import * as Logger from '../utils/logger';
import * as validation from '../validation/common';
import { resolveStore} from './store';

const sizeIlegal = 3;
const createLogger = Logger.createLogger('productLogger');

export function productGetHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const myStore = resolveStore(res);
    return myStore.products.all();
}

export async function productGetSpecificHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    createLogger.info(`Requested project by id - ${id}`);
    const myStore = resolveStore(res);
    const maybeProduct = await myStore.products.findById(id);
    return (maybeProduct) ? Promise.resolve(maybeProduct) : Promise.reject(new Error('404'));
}

export function productPostHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const newProduct: Product[] = req.body as Product[];
    const myStore = resolveStore(res);
    return myStore.products.add(newProduct);
}

export async function productPutHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const replaceProduct: Product = req.body as Product;
    replaceProduct.id = id;
    const myStore = resolveStore(res);
    const rep = myStore.products.replace(replaceProduct);
    return (rep) ? Promise.resolve(replaceProduct) : Promise.reject(new Error('404'));
}

export async function productDeleteHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const myStore = resolveStore(res);
    const pro = await myStore.products.deleteById(id);
    return (pro.result.n) ? Promise.resolve('deleted') : Promise.reject(new Error('204'));
}

export function middleCheckName(req: Request, res: Response, next: NextFunction): any {
    const newProduct: Product = req.body as Product;
    validation.getOrThrow<string>(newProduct.name, validation.nameSchema);
    next();
}
