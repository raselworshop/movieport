# 🎬 ***Movie Portal Website***

## 🚀 ***Project Overview***
> ***This Movie Portal is a full-stack web application where users can search, view, and manage their favorite movies. The portal allows movie browsing, searching, adding movies to favorites, and user interactions. Built using the MERN stack, this project integrates MongoDB for database operations, React.js for the frontend, and Express.js for the backend.***

## 🌟 ***Features***
> ***View All Movies: Browse and explore all movies with relevant details like title, poster, and rating.***
> ***Top Movies: Show the most popular movies based on ratings.***
> ***Search Movies: Search for movies by title or other criteria.***
> ***Add to Favorites: Users can add movies to their personal favorites list.***
> ***User Authentication: Login and manage user-specific activities and favorites.***
> ***Admin Dashboard: Manage movies and perform CRUD operations.***
> ***Responsive UI: Optimized interface for both desktop and mobile devices.***

## 🛠️ ***Tech Stack***
- > ***Frontend: React.js, Axios, Tailwind CSS***
- > ***Backend: Node.js, Express.js***
- > ***Database: MongoDB***
- > ***Deployment: Vercel, Heroku***
- > ***Environment Variables: dotenv***

## 📥 ***Installation***
### ***Prerequisites***
> ***Node.js, MongoDB, Express.js and npm are installed on the system.***
> ***MongoDB Atlas account to host database.***
> ***Firebase account to authentications users.***

## ⚙️ ***Backend Setup***
### ***Backend Architecture***
- > ***Built with Node.js and Express.***
- > ***Uses MongoDB Atlas to store movies, favorites, and user data.***

## ***Backend Endpoints***
> ### ***Get All Movies***

> ***Copy code***
> ***GET https://movie-portal-server-xi.vercel.app/movies***

> ### ***Get a Single Movie by ID***
> ***GET https://movie-portal-server-xi.vercel.app/movies/:id***

> ### ***Search Movies by Query***
> ***GET https://movie-portal-server-xi.vercel.app/search?searchQuery=<movie-title>***

> ### ***Add a New Movie***
> ***POST https://movie-portal-server-xi.vercel.app/movies***

> ### ***Update Movie Details***
> ***PUT https://movie-portal-server-xi.vercel.app/movies/:id***

> ### ***Delete a Movie***
> ***DELETE https://movie-portal-server-xi.vercel.app/movies/:id***

> ### ***User Authentication and Favorites***
> - #### ***Get Favorites Movies by Email***
> ***GET https://movie-portal-server-xi.vercel.app/favorites/:email***

> - #### ***Add to Favorites***
> ***PATCH https://movie-portal-server-xi.vercel.app/favorites/:email***

> - #### ***Remove Movie from Favorites***
> ***DELETE https://movie-portal-server-xi.vercel.app/favorites/:email/:movieId***

## 🔧 ***Frontend Setup***
### ***React Components***
- ***Search Component***
- ***Allows searching movies by title.***

- ***Movie List Component***
- ***Displays all movies with details like title, poster, and description.***

- ***Favorites Component***
- ***Users can add or remove movies from their favorites list.***

- ***Top Movies Section***
- ***Shows the most popular movies based on user ratings.***

## 📜 ***Usage***
1. ***Launch the Application***
> ***Ensure both the frontend and backend services are running.***
 
2. ***Search for Movies***
> ***Use the search bar to find movies by title or genre.***
 
3. ***Add to Favorites***
> ***Sign in and save movies to your personal favorites list.***
 
4. ***Admin Dashboard***
> ***For managing movies, CRUD operations are accessible to administrators.***

## 🤝 ***Contribution***
### ***We welcome contributions to make the Movie Portal better!***

> ***Fork the project***
> ***Create a new branch (git checkout -b feature/your-feature)***
> ***Commit your changes (git commit -m "Add new feature")***
> ***Push to the branch (git push origin feature/your-feature)***
> ***Open a Pull Request***
https://movie-portal-20201.web.app/
https://spontaneous-cucurucho-dabe4a.netlify.app/
# 📞 Contact
## Developer Name: MD RASEL MIA
## GitHub: https://github.com/raselworshop
## Email: raselworshop@gmail.com


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
