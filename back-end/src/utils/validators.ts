import { pool } from '../config/database';
import { AppError } from '../errors/AppError';

/**
 * Validates and returns a route ID as a number.
 */
export function validateId(rawId: any, paramName: string): number {
    // const idValue = req.params[paramName];

    if (!rawId) {
        throw new AppError(`Missing required parameter: '${paramName}'`, 400, true);
    }

    const parsedId = parseInt(rawId, 10);
    if (isNaN(parsedId)) {
        throw new AppError(`Invalid parameter '${paramName}': must be a number`, 400, true);
    }

    if (parsedId <= 0) {
        throw new AppError(`Invalid parameter '${paramName}': number must be positive`, 400, true);
    }

    return parsedId;
}

/**
 * Validates that a required field exists and is non-empty.
 * Throws a 400 AppError if validation fails.
 *
 * @param value - The value to validate
 * @param fieldName - The name of the field (for the error message)
 */
export function validatePresence(value: any, fieldName: string): void {
    if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
    ) {
        throw new AppError(`Missing required field: '${fieldName}'`, 400, true);
    }
}

/**
 * Throws a 404 error if the value is null or undefined.
 * @param value The object or result to check
 * @param resourceName Name of the resource (e.g., "User", "Profile")
 * @returns The value if it exists
 */
export function ensureExists<T>(value: T | null | undefined, resourceName: string): T {
    if (value === null || value === undefined) {
        throw new AppError(`${resourceName} not found`, 404, true);
    }
    return value;
}

/**
 * Generic existence check for a value in a DB table.
 * Useful for validating foreign key references.
 *
 * @param table - The DB table name
 * @param column - The column to check (e.g. "account_id")
 * @param value - The value to look for
 * @param resourceName - Name of the resource (for error messages)
 */
export async function validateExistsInDB(
    table: string,
    column: string,
    value: number,
    resourceName: string
): Promise<void> {
    const query = `SELECT 1 FROM ${table} WHERE ${column} = $1 LIMIT 1`;
    const result = await pool.query(query, [value]);

    if (result.rowCount === 0) {
        throw new AppError(`${resourceName} not found`, 404, true);
    }
}

/**
 * Validates that the request body exists and is a non-empty plain object.
 */
export function validateRequestBodyExists(value: any): void {
    if (
        !value ||
        typeof value !== "object" ||
        Array.isArray(value) ||
        Object.keys(value).length === 0
    ) {
        throw new AppError("Request body is missing, malformed, or empty", 400, true);
    }
}