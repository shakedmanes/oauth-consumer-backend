// error.types

export class AuthError extends Error {

  public status: number;

  constructor(message?: string) {
    super(message || 'AuthError');
    this.status = 401;
  }

}

export class Unauthenticated extends AuthError {

  public status: number;

  constructor(message?: string) {
    super(message || 'Unauthenticated');
    this.status = 401;
  }
}

export class TokenExpired extends AuthError {

  public status: number;

  constructor(message?: string) {
    super(message || 'Token expired');
    this.status = 401;
  }
}
