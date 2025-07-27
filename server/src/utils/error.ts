// src/utils/error.ts
export class NotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NotFoundError';
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  }
  
  export class UnauthorizedError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'UnauthorizedError';
      Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
  }
  
  export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
      Object.setPrototypeOf(this, ValidationError.prototype);
    }
  }