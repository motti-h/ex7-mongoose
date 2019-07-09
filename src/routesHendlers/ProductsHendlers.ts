
import { Product } from '../models';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import mongodb from 'mongodb';
import * as Logger from '../utils/logger';
import * as validation from '../validation/common';
import { DbProduct } from '../store/products';
import { DbCategory } from '../store/categories';
const sizeIlegal = 3;
const createLogger = Logger.createLogger('productLogger');

export function productGetHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    return DbProduct.find().exec();
}

export async function productGetSpecificHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    createLogger.info(`Requested product by id - ${id}`);
    const product = await DbProduct.findById(id).exec();
    return (product) ? Promise.resolve(product) : Promise.reject(new Error('404'));
}

export async function productPostHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const newProducts: Product[] = req.body as Product[];
    const collection: Product[] = [];
    for (const prod of newProducts) {
        const category = await DbCategory.find({_id: prod.categoryId});
        if (category.length > 0) {
            const p = await DbProduct.create(prod);
            collection.push(p);
        }
    }
    return (collection.length > 0 ) ? Promise.resolve(collection) : Promise.reject(new Error('404'));
}

export async function productPutHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const replaceProduct: Product[] = req.body as Product[];
    const rep: Product[] = [];
    for (const prod of replaceProduct) {
        const _id = new mongodb.ObjectID(id);
        const replaced = await DbProduct.update({_id}, prod).exec();
        rep.push(prod);
    }
    return (rep.length > 0) ? Promise.resolve(rep) : Promise.reject(new Error('404'));
}

export async function productDeleteHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const _id = new mongodb.ObjectID(id);
    const deleted = await DbProduct.deleteOne({_id}).exec();
// tslint:disable-next-line: max-line-length
    return (deleted.ok && deleted.n) ? Promise.resolve(204) : Promise.reject(new Error('404'));
}

export function middleCheckName(req: Request, res: Response, next: NextFunction): any {
    const newProduct: Product = req.body as Product;
    validation.getOrThrow<string>(newProduct.name, validation.nameSchema);
    next();
}
