# Full Stack Books
Manage a collection of books.
Application uses React on the frontend and Python Flask with Postgres DB on the backend.

## Running the application
1. Execution requires: Docker and Docker Compose
2. Run application locally by executing `docker-compose up` (optionally with `sudo` and `--build`)
in the project root folder
3. Application can now be accessed at http://localhost (default HTTP port 80).
The database is available at port 5432 and the Python Flask backend is running at port 5000

## Linting and testing
To execute code linting, run `npm run lint` in folder "frontend".
To execute unit tests, run `npm run test` in folder "frontend"
