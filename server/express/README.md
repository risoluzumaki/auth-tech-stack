# Express Server

This project is a simple authentication server built with Express.js, TypeScript, and PostgreSQL.

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or later)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- A running PostgreSQL instance (for local development)

## Setup & Running the Application

You can run this project in three ways: using Docker Compose, as a standalone Docker container, or directly on your local machine.

### 1. Using Docker Compose (Recommended)

This is the easiest way to get started, as it handles both the database and the application services.

1.  **Navigate to the Docker directory:**
    ```bash
    cd docker
    ```

2.  **Configure Environment Variables:**
    A `.env` file is already provided in the `docker` directory for convenience. You can use the default values to get started quickly.
    ```env
    # Default values in docker/.env
    DATABASE_URL="postgresql://pgdb:pgdb@db:5432/pgdb"
    JWT_SECRET="supersecret"
    JWT_REFRESH="superrefresh"
    ```
    If you need to change these values, simply edit the `.env` file.

3.  **Run the services:**
    ```bash
    docker-compose up --build
    ```
    This command will build the application image, start the PostgreSQL container, and run the application. The app will be available at `http://localhost:3000`.

### 2. Using Standalone Docker Container

This method assumes you have a separate PostgreSQL container or instance running and accessible from the application container.

1.  **Ensure PostgreSQL is running** and you have its connection URL.

2.  **Build the Docker image** from the project's root directory:
    ```bash
    docker build -t express-auth-server . -f ./docker/Dockerfile --build-arg DATABASE_URL="your_database_connection_url"
    ```
    Replace `"your_database_connection_url"` with the actual URL (e.g., `"postgresql://user:password@host:port/database"`).

3.  **Run the container:**
    ```bash
    docker run -p 3000:3000 --name express-auth-app express-auth-server
    ```

4.  **Manually run database commands:**
    After the container starts, you need to pull the schema, generate the Prisma client, and seed the database.
    ```bash
    # Open a shell inside the running container
    docker exec -it express-auth-app sh

    # Run the commands inside the container
    npm run prisma:pull
    npm run prisma:generate
    npm run prisma:seed

    # Exit the shell
    exit
    ```
    The application will then be running and accessible at `http://localhost:3000`.

### 3. Local Development (Without Docker)

This method requires you to have Node.js and PostgreSQL installed on your machine.

1.  **Install dependencies** from the project root directory:
    ```bash
    npm install
    ```

2.  **Configure Environment Variables:**
    A `.env` file is provided in the project root directory. You can use it for local development, but ensure the `DATABASE_URL` matches your local PostgreSQL configuration.
    ```env
    # Default values in .env
    DATABASE_URL="postgresql://pgdb:pgdb@localhost:5432/pgdb"
    JWT_SECRET="supersecret"
    JWT_REFRESH="superrefresh"
    PORTAPP=3000
    ```
    Feel free to modify the values in the `.env` file as needed.

3.  **Pull the database schema:**
    ```bash
    npm run prisma:pull
    ```

4.  **Generate the Prisma client:**
    ```bash
    npm run prisma:generate
    ```

5.  **Build the application:**
    ```bash
    npm run build
    ```

6.  **Seed the database (optional):**
    ```bash
    npm run prisma:seed
    ```

7.  **Start the server:**
    ```bash
    npm start
    ```
    The application will be running at `http://localhost:3000`.

## Environment Variables

The application requires the following environment variables:

-   `DATABASE_URL`: The connection string for the PostgreSQL database.
-   `JWT_SECRET`: Secret key for signing JWT access tokens.
-   `JWT_REFRESH`: Secret key for signing JWT refresh tokens.
-   `PORTAPP`: The port on which the application will run (defaults to 3000 if not set).
