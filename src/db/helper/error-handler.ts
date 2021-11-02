import {
    ValidationError,
    NotFoundError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError,
    DBError,
} from "objection"
import { ErrorResponse } from "../../models/error-response"

export const dbErrorHandler = (err: Record<string, any>): ErrorResponse => {
    const error = {} as ErrorResponse

    if (err instanceof ValidationError) {
        switch (err.type) {
            case "ModelValidation":
                error.message = err.message
                error.code = 400
                error.type = err.type
                error.errors = [JSON.stringify(err.data)]
                break
            case "RelationExpression":
                error.message = err.message
                error.code = 400
                error.type = "RelationExpression"
                error.errors = []
                break
            case "UnallowedRelation":
                error.message = err.message
                error.code = 400
                error.type = err.type
                error.errors = []
                break
            case "InvalidGraph":
                error.message = err.message
                error.code = 400
                error.type = err.type
                error.errors = []
                break
            default:
                error.message = err.message
                error.code = 400
                error.type = "UnknownValidationError"
                error.errors = []

                break
        }
    } else if (err instanceof NotFoundError) {
        error.message = err.message
        error.code = 404
        error.type = "NotFound"
        error.errors = []
    } else if (err instanceof UniqueViolationError) {
        error.message = err.message
        error.code = 409
        error.type = "UniqueViolation"
        error.errors = [
            JSON.stringify({
                columns: err.columns,
                table: err.table,
                constraint: err.constraint,
            }),
        ]
    } else if (err instanceof NotNullViolationError) {
        error.message = err.message
        error.code = 400
        error.type = "NotNullViolation"
        error.errors = [
            JSON.stringify({
                column: err.column,
                table: err.table,
            }),
        ]
    } else if (err instanceof ForeignKeyViolationError) {
        error.message = err.message
        error.code = 409
        error.type = "ForeignKeyViolation"
        error.errors = [
            JSON.stringify({
                table: err.table,
                constraint: err.constraint,
            }),
        ]
    } else if (err instanceof CheckViolationError) {
        error.message = err.message
        error.code = 400
        error.type = "CheckViolation"
        error.errors = [
            JSON.stringify({
                table: err.table,
                constraint: err.constraint,
            }),
        ]
    } else if (err instanceof DataError) {
        error.message = err.message
        error.code = 400
        error.type = "InvalidData"
        error.errors = []
    } else if (err instanceof DBError) {
        error.message = err.message
        error.code = 400
        error.type = "UnknownDatabaseError"
        error.errors = []
    } else {
        error.message = `${err.message}`
        error.code = 500
        error.type = "UnknownError"
        error.errors = []
    }

    return error
}
