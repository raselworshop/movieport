# Movie Portal

## Description
- A web application to browse, search, and manage movies. Users can add movies to their favorites and view movie details.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/raselworshop/movie-portal.git
    ```
2. Navigate to the project directory:
    ```sh
    cd movie-portal
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add necessary variables (e.g., `DB_USER`, `DB_PASS`)

## Usage
1. Start the server:
    ```sh
    npm start
    ```
2. Access the application at:
    ```sh
    http://localhost:3000/5000
    ```

## API Endpoints

### GET /all/movies
- Fetches all movies sorted by ratings in descending order

### GET /movies/top
- Fetches the top 6 rated movies

### GET /movies/:id
- Fetches a single movie by ID

### PUT /movies/:id
- Updates an existing movie by ID

### POST /movies/add
- Adds a new movie

### GET /movies/check/:title
- Checks if a movie with the given title already exists

### GET /random/movies
- Fetches 6 random movies

### GET /usersStates
- Fetches user states including email, created time, last sign-in time, and movies added

### GET /search
- Searches movies by name using a query parameter

### DELETE /movies/:id
- Deletes a movie by ID

### GET /favorites/:email
- Fetches favorite movies for a user by email

### PATCH /favorites/:email
- Adds a movie to favorites for a user by email

### DELETE /favorites/:email/:movieId
- Removes a movie from favorites by movie ID for a user by email

### GET /users
- Fetches all users

### GET /users/:email
- Fetches a single user by email

### POST /users
- Adds a new user

### PATCH /users
- Updates user information

## Contributing
- Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact
- Maintainer: [Your Name](mailto:raselworshop@gmail.com)
