export const DEFAULT_PAGE = 0
export const DEFAULT_PER_PAGE = 10
export const DEFAULT_OFFSET = 0

export const GCLOUD_STROAGE_SCOPE = [
    "https://www.googleapis.com/auth/devstorage.read_write",
    "https://www.googleapis.com/auth/pubsub",
]
export const GCLOUD_CONN_MAX_RETRIES = 3
export const GCLOUD_BUCKET_BASE_URL = "https://storage.googleapis.com"
export const GCLOUD_IMAGE_BUCKET_NAME = process.env.IMAGE_BUCKET
    ? process.env.IMAGE_BUCKET
    : "adp_dev_images"

export const GCLOUD_BRAND_FOLDER = "brands"
export const GCLOUD_PRODUCT_FOLDER = "products"
export const GCLOUD_PRODUCT_VARIANT_FOLDER = "product_variants"
export const GCLOUD_CATEGORY_FOLDER = "categories"
