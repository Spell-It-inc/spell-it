import { AppError } from "../errors/AppError";

interface PGError extends Error {
    code?: string;
    detail?: string;
    constraint?: string;
    table?: string;
}

/**
 * Converts PostgreSQL errors into AppError instances.
 * Useful for unique constraints and other known DB errors.
 */
export function handleDatabaseError(error: PGError): AppError {
    switch (error.code) {
        case "23505": // Unique constraint violation
            if (error.constraint) {
                // Optional: Customize messages by constraint
                switch (error.constraint) {
                    case "profiles_username_key":
                        return new AppError("Username already exists", 409, true);
                    case "accounts_auth_sub_key":
                        return new AppError("Auth sub already exists", 409, true);
                    default:
                        return new AppError("Duplicate key error", 409, true);
                }
            }
            return new AppError("Duplicate key error", 409, true);

        case "23503": // Foreign key violation
            return new AppError("Foreign key constraint violation", 400, true);

        case "23502": // Not null violation
            return new AppError("Missing required field", 400, true);

        default:
            // Unexpected DB error
            return new AppError("Database error", 500, false);
    }
}