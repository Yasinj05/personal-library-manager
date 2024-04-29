# Personal Library Manager API 📚

The Personal Library Manager API facilitates the management of a personal library, allowing users to manage books and authors through a RESTful interface. This application provides endpoints for CRUD operations on books and authors, making it easy to store, retrieve, update, and delete library data.

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installing 📥

Follow these steps to set up your development environment:

1. **Clone the repository:**

   ```
   git clone https://github.com/yourusername/personal-library-manager.git
   ```

2. **Go to the project directory:**

   ```
   cd personal-library-manager
   ```

3. **Install dependencies:**

   ```
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add:

   ```
   PORT=3000
   DB_URI=mongodb://localhost:27017/personalLibrary
   ```

5. **Start MongoDB:**
   Ensure MongoDB is running on your system. Start MongoDB with:

   ```
   mongod
   ```

### Running the Application ⚙️

Execute the following command in the terminal to start the server:

```
npm start
```

The server will start on `http://localhost:3000`, or on another port if specified differently in your `.env` file.

## Using the API with Postman

Postman is a popular tool used for testing API endpoints. Below are examples of how you can use Postman to interact with this API.

### Setting Up Postman 📫

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

#### Get All Authors

- **Method:** GET
- **URL:** `{{baseUrl}}/api/authors`

#### Retrieve an Author by ID

- **Method:** GET
- **URL:** `{{baseUrl}}/api/authors/{authorId}`
  - Replace `{authorId}` with the actual ID of the author.

#### Update an Author's Details

- **Method:** PUT
- **URL:** `{{baseUrl}}/api/authors/{authorId}`
- **Body:** Set to JSON and include:
  ```
  {
    "name": "Updated Author Name",
    "bio": "Updated author biography."
  }
  ```

#### Delete an Author

- **Method:** DELETE
- **URL:** `{{baseUrl}}/api/authors/{authorId}`

#### Add a New Book

- **Method:** POST
- **URL:** `{{baseUrl}}/api/books`
- **Body:** Set to JSON and include:
  ```
  {
    "title": "New Book Title",
    "author": "{authorId}",  // Replace `{authorId}` with the actual author's ID
    "genre": "Mystery",
    "publicationYear": 2020
  }
  ```

#### Get All Books

- **Method:** GET
- **URL:** `{{baseUrl}}/api/books`

#### Retrieve a Book by ID

- **Method:** GET
- **URL:** `{{baseUrl}}/api/books/{bookId}`
  - Replace `{bookId}` with the actual ID of the book.

#### Update a Book

- **Method:** PUT
- **URL:** `{{baseUrl}}/api/books/{bookId}`
- **Body:** Set to JSON and include:
  ```
  {
    "title": "Pride and Prejudice (Updated)",
    "author": "{authorId}",  // Replace `{authorId}` with the actual author's ID
    "genre": "Fiction",
    "publicationYear": 1813
  }
  ```

#### Delete an Book

- **Method:** DELETE
- **URL:** `{{baseUrl}}/api/books/{authorId}`

### Saving Requests

Save each request in your collection for future use or to share with your team.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
