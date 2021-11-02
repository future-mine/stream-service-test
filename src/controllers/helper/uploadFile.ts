import { GcloudAuthenticationInstance } from "../services/gcs-service"
import { GCLOUD_BUCKET_BASE_URL } from "../constants/general-constants"
import { ErrorResponse } from "../../models/error-response"

export const uploadImage = (
    file: Express.Multer.File,
    bucketFolder: string,
    bucketName: string
): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        const { originalname } = file

        const storage = GcloudAuthenticationInstance.createGcloudAuthenticationBucket()

        const bucket = storage.bucket(bucketName)

        const blob = bucket.file(`${bucketFolder}/${originalname.replace(/ /g, "_")}`)

        const blobStream = blob.createWriteStream({
            resumable: false,
        })

        blobStream
            .on("finish", () => {
                resolve(`${GCLOUD_BUCKET_BASE_URL}/${bucketName}/${blob.name}`)
            })
            .on("error", (err) => {
                reject(createError(err))
            })
            .end(file.buffer)
    })
}

const createError = (err: Error): ErrorResponse => {
    return {
        message: err.message,
        type: err.name,
        code: 500,
        errors: [],
    }
}
