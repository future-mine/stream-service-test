import { isEmpty } from "lodash"
import { ErrorResponse } from "../../models/error-response"
import { Response } from "express-serve-static-core"

export const TranslationError = (): ErrorResponse => ({
    message: `Translation not available for given locale`,
    code: 500,
    type: "MissingTranslationsError",
    errors: [],
})

export const EmptyDeleteRequest = (): ErrorResponse => ({
    message: `Empty list of ids provided`,
    code: 400,
    type: "EmptyDeleteRequestError",
    errors: [],
})

export const EmptyDeleteRequestObjects = (): ErrorResponse => ({
    message: `No object found with the given ids`,
    code: 404,
    type: "EmptyDeleteRequestObjectsError",
    errors: [],
})

export const EmptyObjectErr = (objName: string): ErrorResponse => ({
    message: `Can't save an empty ${objName}`,
    code: 400,
    type: "EmptyObject",
    errors: [],
})

export const ObjectEmptinessCheck = (obj: Record<string, any>, objName: string): void => {
    if (isEmpty(obj)) {
        throw EmptyObjectErr(objName)
    }
}

export const NonArrayTypeError = (): ErrorResponse => {
    return {
        message: "A non-array was provided where an array was expected",
        code: 400,
        type: "UpdateValidation",
        errors: [],
    }
}

export const ListPreconditionCheck = <T>(list: T[], objName: string): void => {
    if (isEmpty(list)) {
        throw EmptyObjectErr(objName)
    }

    if (!(list instanceof Array)) {
        throw NonArrayTypeError()
    }
}

export const WrongObjID = (): ErrorResponse => ({
    message: "Update failed, can't update object with a non matching id",
    code: 400,
    type: "UpdateValidation",
    errors: [],
})

export const NotFoundError = (name: string, identifier: string): ErrorResponse => ({
    message: `${name} with that ${identifier} not found`,
    code: 404,
    type: "NotFound",
    errors: [],
})

export const CreationError = (obj: Record<string, any>[], objName: string): void => {
    obj.forEach((o) => {
        if (isEmpty(o)) {
            throw {
                message: `${objName}creation failed`,
                code: 400,
                type: "CreationError",
                error: {},
            }
        }
    })
}

export const responseErrorHandler = (
    res: Response<any, Record<string, any>, number>,
    error: Record<string, any>
): void => {
    const err = {} as ErrorResponse

    err.code = !isEmpty(error.code) ? (error.code as number) : 500
    err.message = !isEmpty(error.message) ? (error.message as string) : "Unknown Error"
    err.errors = !isEmpty(error.errors) ? (error.errors as string[]) : []
    err.type = !isEmpty(error.type) ? (error.type as string) : "Unknown"

    res.status(err.code).send(err)
}
