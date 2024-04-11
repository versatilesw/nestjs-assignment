
# NestJS TypeORM PostgreSQL

## Overview

This boilerplate provides a starting point for building a NestJS application with TypeORM and PostgreSQL. It includes authentication with Passport.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) - Make sure you have Node.js installed. You can download and install it from the official website.
- [npm](https://www.npmjs.com/) - Ensure you have npm (Node Package Manager) installed. It usually comes bundled with Node.js.
- [PostgreSQL](https://www.postgresql.org/) - Install PostgreSQL on your machine. Follow the installation instructions provided in the official documentation.

## Installation

Follow these steps to set up and run the application:

1. Clone this repository to your local machine:

    ```bash
    $ git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    $ cd nestjs-typeorm-postgres
    ```

3. Install dependencies:

    ```bash
    $ npm install
    ```

4. Copy the `.env.example` file to `.env`:

    ```bash
    $ cp .env.example .env
    ```

    Update the `.env` file with your environment variables as needed.

## Running the Application

Once you have completed the installation steps, you can run the application using the following commands:

- **Development Mode**:

    ```bash
    $ npm run start
    ```

- **Watch Mode**:

    ```bash
    $ npm run start:dev
    ```

- **Production Mode**:

    ```bash
    $ npm run start:prod
    ```

## Testing

To run tests, use the following commands:

- **Unit Tests**:

    ```bash
    $ npm run test
    ```

- **End-to-End (e2e) Tests**:

    ```bash
    $ npm run test:e2e
    ```

- **Test Coverage**:

    ```bash
    $ npm run test:cov
    ```

## Swagger url

  ```bash
    localhost:3000/api-docs
    ```

## Technologies Used

- [NestJS](https://docs.nestjs.com/first-steps) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- [Passport](https://www.passportjs.org/) - Authentication middleware for Node.js.
- [TypeORM](https://typeorm.io/) - An ORM that can run in Node.js and the browser which supports MySQL, MariaDB, PostgreSQL, SQLite, MS SQL Server, Oracle, WebSQL databases.
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.

---
