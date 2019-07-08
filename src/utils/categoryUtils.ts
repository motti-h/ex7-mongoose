import {store} from '../store';
import {Category} from '../models/category';

function getAllCategories() : Category[]
{
    return store.categories;
}

function getCategoryById(id: number): Category | undefined {
    return store.categories.find(p => p.id === id.toString());
}

function getCategoriesLength(): number {
    return store.categories.length;
}
export {getCategoryById , getAllCategories, getCategoriesLength }; 
