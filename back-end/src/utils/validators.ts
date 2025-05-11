import { Request } from 'express';
import { AppError } from '../errors/AppError';

/**
 * Validates and returns a route param as a number.
 */
export function validateIdParam(req: Request, paramName: string): number {
    const idValue = req.params[paramName];

    if (!idValue) {
        throw new AppError(`Missing required parameter: '${paramName}'`, 400, true);
    }

    const parsed = parseInt(idValue, 10);
    if (isNaN(parsed)) {
        throw new AppError(`Invalid parameter '${paramName}': must be a number`, 400, true);
    }

    return parsed;
}