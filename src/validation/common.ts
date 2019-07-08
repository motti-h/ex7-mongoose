import joi from 'joi';

export const idSchema = joi.string().length(24);
export const nameSchema = joi.string().min(3);

export function getOrThrow<T>(value: any, schema: joi.SchemaLike): T {
    const {error, value: v} = joi.validate(value, schema);
    if (error) throw error;
    return v;
  }
