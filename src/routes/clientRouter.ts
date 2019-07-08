import express from 'express';
import {store} from '../store';

const clientRouter = express.Router();

clientRouter.get('/categories', (req, res) => {
  const categories = store.categories;
  res.render('categories', {
    pageTitle: 'categories Page',
    categories,
  });
});

export {clientRouter};
