import { Category } from '../models';
import { Response, Request, NextFunction } from 'express';
import * as Logger from '../utils/logger';
import { DbCategory } from '../store/categories';
import { DbProduct } from '../store/products';
import mongodb from 'mongodb';
const createLogger = Logger.createLogger('productLogger');

export function categoryGetHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    return DbCategory.find().exec();
}

export async function categoryGetProductsByIdHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id.toString();
    const product = await DbProduct.find({categoryId: id}).exec();
    return (product) ? Promise.resolve(product) : Promise.reject(new Error('404'));
}

export async function categoryGetByIdHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const category = await DbCategory.findById(id).exec();
    return (category) ? Promise.resolve(category) : Promise.reject(new Error('404'));
}

export async function categoryPostHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const newCategorys: Category[] = req.body as Category[];
    const category = await DbCategory.insertMany(newCategorys);
    return (category) ? Promise.resolve(category) : Promise.reject(new Error('204'));
}

export async function categoryPutHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const replaceCategory: Category = req.body as Category;
    const _id = new mongodb.ObjectID(id);
    const replaced = await DbCategory.replaceOne({_id}, replaceCategory).exec();
    return (replaced) ? Promise.resolve(replaced) : Promise.reject(new Error('404'));
}

export async function categoryDeleteHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const _id = new mongodb.ObjectID(id);
    const deleted = await DbCategory.deleteOne({_id}).exec();
// tslint:disable-next-line: max-line-length
    return (deleted.ok && deleted.n) ? Promise.resolve(204) : Promise.reject(new Error('404'));
}
