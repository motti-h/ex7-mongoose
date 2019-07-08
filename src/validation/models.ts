import joi from 'joi';
import { idSchema } from './common';

export const proguctSchema = {
  id: idSchema,
  name: joi.string().required().min(3),
};

export const userSchema = {
  id: idSchema,
  name: joi.string().required(),
};
