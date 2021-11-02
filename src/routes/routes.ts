import { Application } from "express"
import AuthRoute from "./auth-route"
import UserRoute from "./user-route"
import HealthCheckRoutes from "./health-routes"

export const RegisterRoutes = (app: Application): void => {
    AuthRoute(app)
    UserRoute(app)
    HealthCheckRoutes(app)
}
