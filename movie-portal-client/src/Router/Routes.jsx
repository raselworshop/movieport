import { createBrowserRouter, } from "react-router-dom";
import Root from "../MainLayout/Root";
import AllMovies from "../Pages/AllMovies";
import MyFavorite from "../Pages/MyFavorite";
import AddMovie from "../Pages/AddMovie";
import MovieDetails from "../Pages/MovieDetails";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import PrivateRoute from "./PrivateRoute";
import RecommendedMovies from "../Pages/RecommendedMovies";
import SearchResult from "../Pages/SearchResult";
import ErrorPage from "../Pages/ErrorPage";
import UpdateMoviePage from "../Pages/UpdateMoviePage";
import MovieTable from "../Pages/myMovies/MovieTable";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        loader: () => fetch('https://movie-portal-server-xi.vercel.app/movies/top')
    },
    {
        path: 'allmovies',
        element: <AllMovies></AllMovies>
    },
    {
        path: '/search',
        element: <SearchResult></SearchResult>,
    },
    {
        path: 'recommendedmovies',
        element: <RecommendedMovies></RecommendedMovies>
    },
    {
        path: 'myfavorites',
        element: <PrivateRoute>
            <MyFavorite></MyFavorite>
        </PrivateRoute>,
    },
    {
        path: 'addmovie',
        element: <PrivateRoute>
            <AddMovie></AddMovie>
        </PrivateRoute>,
    },
    {
        path: 'movies/update/:id',
        element: <PrivateRoute>
            <UpdateMoviePage></UpdateMoviePage>,
        </PrivateRoute>
    },
    {
        path: 'moviedetails/:id',
        element: <MovieDetails />
    },
    {
        path: 'postedMovies',
        element: <PrivateRoute>
            <MovieTable></MovieTable>
        </PrivateRoute>
    },
    {
        path: 'signup',
        element: <Signup></Signup>
    },
    {
        path: 'signin',
        element: <Signin></Signin>
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
]);

export default routes;