/**
 * Central error handler. Catches errors thrown (or passed via next(err))
 * from controllers and returns a JSON response. In dev, includes the stack.
 */
export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const payload = {
    error: err.message || 'Internal server error',
  };
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.stack = err.stack.split('\n').slice(0, 5);
  }
  if (status >= 500) {
    console.error('[error]', err);
  }
  res.status(status).json(payload);
}

/**
 * Small helper so controllers can `throw new HttpError(400, 'Bad email')`
 */
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/**
 * Wraps an async controller so errors bubble into the handler above.
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
