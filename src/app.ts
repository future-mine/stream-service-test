import { config } from "dotenv"
config()
import express, { Application } from "express"
import process from "process"
// import cors from "cors"
// import morgan from "morgan"
import Database from "./db/database"
import path from "path"
import { RegisterRoutes } from "./routes/routes"
import { seedDB } from "./db/helper/seed-handler"
import session from "express-session"
import passport from "./auths/passport"
import { port } from "./config"

const app: Application = express()

const db = Database.getInstance()
const knex = db.getKnex()
// app.disable("x-powered-by")

// app.use(morgan("dev"))
// app.use(cors())
// app.use(express.json())
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(
    session({ secret: process.env.SESSION_SECRET || "", resave: false, saveUninitialized: false })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/config"))

RegisterRoutes(app)

const server = app.listen(port, async () => {
    try {
        console.log("running migrations")

        await knex.migrate.latest({
            directory: path.resolve(__dirname + "/db/migrations"),
        })

        await seedDB(knex)

        console.log(`server is running on PORT ${port}`)
    } catch (e) {
        console.log(e)
        console.log("migration failed")
        process.kill(process.pid, "SIGTERM")
    }
})

process.on("SIGTERM", () => {
    server.close(() => {
        console.log("App has been terminated!")
    })
})
