# Personal Library Manager API

The Personal Library Manager API facilitates the management of a personal library, allowing users to manage books and authors through a RESTful interface. This application provides endpoints for CRUD operations on books and authors, making it easy to store, retrieve, update, and delete library data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installing

Follow these steps to set up your development environment:

1. **Clone the repository:**

   ```
   git clone https://github.com/yourusername/personal-library-manager.git

   cd personal-library-manager
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:

   ```
   PORT=3000
   DB_URI=mongodb://localhost:27017/personalLibrary
   ```

4. **Start MongoDB:**
   Ensure MongoDB is running on your system. Start MongoDB with:

   ```
   mongod
   ```

### Running the Application

Execute the following command in the terminal to start the server:

```
npm start
```

The server will start on `http://localhost:3000`, or on another port if specified differently in your `.env` file.

## Using the API with Postman

Postman is a popular tool used for testing API endpoints. Below are examples of how you can use Postman to interact with this API.

### Setting Up Postman

1. **Install Postman**: Download and install from [the Postman website](https://www.postman.com/downloads/).

2. **Create a Collection**: Name it `Personal Library Manager API`.

3. **Configure Environment**:
   - Create an environment named `Development`.
   - Add a variable `baseUrl` with the value `http://localhost:3000`.

### Example Requests

#### Add a New Author

- **Method**: POST
- **URL**: `{{baseUrl}}/api/authors`
- **Body**: Set to JSON and include:
  ```
  {
    "name": "Jane Austen",
    "bio": "English novelist known primarily for her six major novels."
  }
  ```

#### Get All Books

- **Method**: GET
- **URL**: `{{baseUrl}}/api/books`

#### Update a Book

- **Method**: PUT
- **URL**: `{{baseUrl}}/api/books/{bookId}`
- **Body**: Set to JSON and include:
  ```
  {
    "title": "Pride and Prejudice (Updated)",
    "genre": "Fiction",
    "publicationYear": 1813
  }
  ```

#### Delete an Author

- **Method**: DELETE
- **URL**: `{{baseUrl}}/api/authors/{authorId}`

### Saving Requests

Save each request in your collection for future use or to share with your team.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.