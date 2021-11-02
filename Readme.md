# Stream Service

## Setup

## Running the project

#### Ensure the database base volumes are up

-   Navigate to the deployments folder of in the deployments project
-   Run `docker-compose up`
-   To take down the volumes (clearing the db), run `docker-compose down -v` then run `docker-compose up`

#### To run the app

-   After the proxy has started, run the following command in another terminal

    `$ npm start`

#### Creating a migration

-   From the root directory of the project run `npm run dev:migrate:make <migration_name>`
-   This will create the migration in the migrations folder located at `/stream-service/src/db/migrations`

#### Running the migrations

-   From the root directory of the project run `npm run dev:migrate:latest`
-   This runs any migration which has not been previously run.
-   Note when you run the app, this is done by default

#### Rolling back migrations

-   From the root directory of the project run `npm run dev:migrate:rollback`
-   This rollbacks previously run migrations
