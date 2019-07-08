import {store} from '../store/index';
import request from 'request-promise';
export async function httpCalls(){

const baseUrl = 'http://localhost:' + '3000';
const usersClient = request.defaults({
    baseUrl: `${baseUrl}/api/public`,
    json: true,
  });
store.products = await usersClient.get('/products.json');
store.categories = await usersClient.get('/categories.json');
store.users = await usersClient.get('/users.json');
}