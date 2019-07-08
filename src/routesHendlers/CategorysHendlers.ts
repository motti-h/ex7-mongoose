import { Category } from '../models';
import {store} from '../store';
import { Response, Request, NextFunction } from 'express';
import * as categoryUtils from '../utils/categoryUtils';
import * as Logger from '../utils/logger';
import { resolveStore} from './store';
const createLogger = Logger.createLogger('productLogger');

export function categoryGetHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const myStore = resolveStore(res);
    return myStore.categories.all();
}

export function categoryGetProductsByIdHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id.toString();
    const myStore = resolveStore(res);
    createLogger.info(`Requested product from category id - ${id}`);
    return myStore.products.find(id);
}

export function categoryGetByIdHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const myStore = resolveStore(res);
    return myStore.categories.findById(id);
}

export function categoryPostHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const newCategory: Category[] = req.body as Category[];
    const myStore = resolveStore(res);
    return myStore.categories.add(newCategory);
}

export function categoryPutHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const newCategory: Category = req.body as Category;
    const myStore = resolveStore(res);
    return myStore.categories.replace(newCategory);
}

export async function categoryDeleteHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const myStore = resolveStore(res);
    const r = await myStore.categories.deleteById(id);
    return (r.result.n) ? Promise.resolve('deleted') : Promise.reject(new Error('204'));
}
