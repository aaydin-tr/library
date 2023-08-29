# Library Management System

TypeScript-based web application developed using Node.js for managing library transactions, enabling users to borrow and return books.

## Table of Contents

- [Library Management System](#library-management-system)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [How to Run](#how-to-run)
      - [Running Locally](#running-locally)
      - [Using Docker](#using-docker)
  - [Example Usage](#example-usage)
      - [Create User](#create-user)
      - [Get Users](#get-users)
      - [Get User](#get-user)
      - [Create Book](#create-book)
      - [Get Books](#get-books)
      - [Get Book](#get-book)
      - [Borrow Book](#borrow-book)
      - [Return Book](#return-book)

## Overview

The Library Management System is designed to facilitate the borrowing and returning of books from a library. The application enables users to perform various actions related to managing users, books, and their borrowing activities. The system is built using TypeScript and Node.js, creating a REST API that interacts with a PostgreSQL database. It adheres to the requirements outlined in the project document and responds to requests in a format compatible with the provided Postman Collection.

## Project Structure

The project is structured as follows:

- `api/`: Contains the API-related components.
  - `controllers/`: Controllers for different API endpoints.
  - `decorators/`: Custom decorators for routing and middleware.
  - `validations/`: Validation functions for request data.
- `consts/`: Constants used throughout the application.
  - `db-config.ts`: Database configuration settings.
  - `http-statuses.ts`: HTTP status codes.
  - `logger-configs.ts`: Logger configuration settings.
  - `web-server-configs.ts`: Web server configuration settings.
- `loaders/`: Loading modules for various parts of the application.
  - `ILoader.ts`: Interface for loader modules.
  - `application-loader.ts`: Application-level loader.
  - `logger-loader.ts`: Logger loader.
  - `postgresql-loader.ts`: PostgreSQL loader.
  - `server-loader.ts`: Web-Server loader.
- `models/`: Database models.
  - `book.ts`: Book model.
  - `book_activities.ts`: Book activities model.
  - `user.ts`: User model.
- `repository/`: Data repository classes.
  - `book.ts`: Book repository.
  - `book_activities.ts`: Book activities repository.
  - `user.ts`: User repository.
- `service/`: Business logic and service components.
  - `core/`: Core service components.
    - `controller.ts`: Base controller class.
    - `logger.ts`: Logging service.
    - `postgresql.ts`: PostgreSQL service.
    - `server.ts`: Web server service.
  - `book.ts`: Book service.
  - `book_activities.ts`: Book activities service.
  - `user.ts`: User service.
- `types/`: Custom TypeScript types and interfaces.
- `utils/`: Utility functions.

## How to Run

#### Running Locally

1. Make sure you have Node.js and PostgreSQL installed on your system.
2. Clone the repository: `git clone https://github.com/aaydin-tr/library`
3. Navigate to the project directory: `cd library`
4. Install dependencies: `npm install`
5. Copy the `.env.prod` file to `.env`.
6. Set up necessary environment variables:
   - `DB_HOST`: Hostname of the PostgreSQL server.
   - `DB_PORT`: Port number of the PostgreSQL server.
   - `DB_USERNAME`: Username for the PostgreSQL server.
   - `DB_PASSWORD`: Password for the PostgreSQL server.
   - `DB_DATABASE`: Name of the PostgreSQL database.
7. Start the server: `npm start`
8. The server should now be running at `http://localhost:3000`

#### Using Docker

1. Make sure you have Docker and Docker Compose installed.
2. Clone the repository: `git clone https://github.com/aaydin-tr/library`
3. Navigate to the project directory: `cd library`
4. Run: `docker-compose up -d`
5. The server should now be accessible at `http://localhost:3000`

   
## Example Usage

Example usage of the project:


#### Create User
Request:
```bash
curl localhost:3000/users -d '{"name": "John Doe"}'
```

Response:
```bash
Status: 201 Created
```

#### Get Users
Request:
```bash
curl localhost:3000/users
```
Response
```bash
[
    {
        "id": 1,
        "name": "John Doe"
    },
    {
        "id": 2,
        "name": "Jane Doe"
    },
    // ...
]
```

#### Get User
Request:
```bash
curl localhost:3000/users/:userId
```

Response:
```bash
{
    "id": 1,
    "name": "John Doe"
    "books": {
        "past": [
            {
                "name": "I, Robot",
                "userScore": 5
            },
            {
                "name": "The Hitchhiker's Guide to the Galaxy",
                "userScore": 10
            }
        ],
        "present": [
            {
                "name": "Brave New World"
            }
        ]
    }
}
```

#### Create Book
Request:
```bash
curl localhost:3000/books -d '{"name": "Brave New World"}'
```

Response:
```bash
Status: 201 Created
```

#### Get Books
Request:
```bash
curl localhost:3000/books
```

Response:
```bash
[
    {
        "id": 1,
        "name": "1984"
    },
    {
        "id": 2,
        "name": "Brave New World"
    },
    // ...
]
```

#### Get Book
Request:
```bash
curl localhost:3000/books/:bookId
```

Response:
```bash
{
    "id": 1,
    "name": "1984",
    "score": "10"
}
```

#### Borrow Book
Request:
```bash
curl localhost:3000/books/:userId/borrow/:bookId
```

Response:
```bash
Status: 204 No Content
```

#### Return Book
Request:
```bash
curl localhost:3000/books/:userId/return/:bookId
```

Response:
```bash
Status: 204 No Content
```


