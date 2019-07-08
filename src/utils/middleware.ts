import { Response, Request, NextFunction, RequestHandler } from 'express';
import { Product } from '../models';
import passport from 'passport';
import { UserRole, UserCredential } from '../models';
import * as validation from '../validation/common';

export function middleCheckId(req: Request, res: Response, next: NextFunction): any {
    validation.getOrThrow<string>(req.params.id, validation.idSchema);
    next();
}

export function endError(err: any , req: Request, res: Response, next: NextFunction) {
  if (err.isJoi) {
    res.status(400).send(err.details);
    return;
  }
  if ( parseInt(err.message, 10) ) {
        res.sendStatus( parseInt(err.message, 10) );
    } else {
        next(err);
    }
}

export function middleCheckName(req: Request, res: Response, next: NextFunction): any {
  const newProduct: Product[] = req.body as Product[];
  newProduct.forEach((p) => {
    validation.getOrThrow<string>(p.name, validation.nameSchema);
  });
  next();
}

export function authenticate() {
  if (process.env.AUTH === 'true') {
    return passport.authenticate('jwt', {session: false});
  }
  return (req: Request, res: Response, next: NextFunction) => { next(); };
}

export function authorize(...roles: UserRole[]) {
  if (process.env.AUTH === 'true') {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.isAuthenticated()) {
        res.sendStatus(401);
        return;
      }
      const user = req.user as UserCredential;
      if (!roles.find(r => user.roles.indexOf(r) >= 0)) {
        res.sendStatus(403);
        return;
      }
      next();
    };
  }
  return (req: Request, res: Response, next: NextFunction) => { next(); };
}
