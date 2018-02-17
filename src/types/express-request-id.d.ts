/// <reference types="express" />

// Add RequestValidation Interface on to Express's Request Interface.
declare namespace Express {
  interface Request extends ExpressRequestId {}
}

interface ExpressRequestId {

  /**
   * Generate UUID for request and add it to X-Request-Id header. In case request contains X-Request-Id header, uses its value instead.
   * @type {string}
   * @memberof ExpressRequestId
   */
  id:string,
}

declare module "express-request-id";
