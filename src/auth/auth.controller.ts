// auth.controller

import { Request, Response, NextFunction } from 'express';
import { Unauthenticated, TokenExpired } from '../error/error.types';

export class AuthController {

  static authorize(req: Request, res: Response, next: NextFunction) {
    if (req.session) {
      if (!req.session.token || req.session.token.expires_at <= Date.now()) {
        req.session.token = null;
        return next(new TokenExpired());
        // res.redirect('/oauth/auth');
      }
      return next();
    }
    return next(new Unauthenticated());
    // res.redirect('/oauth/auth');

  }

}
