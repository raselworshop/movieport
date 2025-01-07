const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://movie-portal-20201.web.app"
    ],
    optionsSuccessStatus:true
}));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5hy3n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        const moviesCollection = client.db('movieDB').collection('movies');
        const favoritesMoviesCollection = client.db('movieDB').collection('favorites');
        const usersCollection = client.db('movieDB').collection('users');
        const usersActivitiesCollection = client.db('movieDB').collection('usersActivities');

        // for allmovies show up 
        app.get('/all/movies', async (req, res) => {
            const cursor = moviesCollection.find().sort({ ratings: -1 });
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/movies/top', async (req, res) => {
            const cursor = moviesCollection.find().sort({ ratings: -1 });
            const result = await cursor.limit(8).toArray();
            res.send(result)
        })
        app.get('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const result = await moviesCollection.findOne({ _id: new ObjectId(id) })
            res.send(result)
        })
        app.put('/movies/:id', async (req, res) => {
            const id = req.params.id;
            //console.log(id)
            const updatedMovie = req.body;
            delete updatedMovie._id;
            try {
                const result = await moviesCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updatedMovie }
                )
                if (result.matchedCount === 0) {
                    res.status(404).send('Movies not found')
                }
                res.send(result)

            } catch (error) {
                //console.log(error, "Error on updating movie");
                res.status(500).send("Error on updating movie")
            }
        })
        app.post('/movies/add', async (req, res) => {
            const newMovie = req.body;
            //console.log(newMovie)
            newMovie.addedBy = req.body.email;
            const result = await moviesCollection.insertOne(newMovie);
            const userQuery = { email: newMovie.addedBy }
            const update = { $inc: { moviesAdded: 1 } };
            const options = { upsert: true }
            await usersActivitiesCollection.updateOne(userQuery, update, options)
            res.send(result)
        })
        app.get('/movies/check/:title', async (req, res) => {
            const title = req.params.title;
            try {
                const existingMovie = await moviesCollection.findOne({ name: title });
                if (existingMovie) {
                    return res.json({ exists: true })
                } else {
                    return res.json({ exists: false })
                }
            } catch (error) {
                //console.log(error, "Error checking existing movie")
            }
        })
        app.get('/random/movies', async (req, res) => {
            try {
                const randomMovies = await moviesCollection.aggregate([{ $sample: { size: 8 } }]).toArray()
                const result = randomMovies;
                res.send(result)
            } catch (error) {
                //console.log('random movies fetching error', error)
            }
        })
        app.get("/movies", async (req, res) => {
            const { email } = req.query; 
          
            if (!email) {
              return res.status(400).json({ error: "Email is required" });
            }
          
            try {
              const movies = await moviesCollection.find({ userEmail: email }).toArray(); // MongoDB থেকে ডাটা ফিল্টার
              res.status(200).send(movies);
            } catch (error) {
              res.status(500).json({ error: "Failed to fetch movies" });
            }
          });
        // Users states 
        app.get('/usersStates', async (req, res) => {
            try {
                const users = await usersCollection.find().toArray();
                const activites = await usersActivitiesCollection.find().toArray();
                const userStates = users.map((user) => {
                    const activity = activites.find((act) => act.email === user.email) || {};
                    return {
                        email: user.email,
                        createdTime: user.createdTime || 'N/A',
                        lastSignInTime: user.lastSignInTime || 'N/A',
                        moviesAdded: activity.moviesAdded || 0,
                    };
                });
                res.json({ success: true, data: userStates })
            } catch (error) {
                //console.log('error fetching userstates', error);
            }
        })
        // search by query method 
        // {
        //     $or:[
        //         {name:{$regex: query, options: 'i'}},
        //         // {genre:{$regex: query, options: 'i'}}
        //     ]title : {$regex: query, $options:"i"}
        // }
        app.get('/search', async (req, res) => {
            const { searchQuery } = req.query;
            //console.log('search query recievd', searchQuery)
            let options = {};
            if (searchQuery) {
                options = { name: { $regex: searchQuery, $options: "i" } }
            }

            const result = await moviesCollection.find().toArray()
            res.send(result)
        })
        app.delete('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await moviesCollection.deleteOne(query);
            res.send(result);
        })
        app.get('/favorites/:email', async (req, res) => {
            const { email } = req.params;
            try {
                const userFavorites = await favoritesMoviesCollection.findOne({ email: email });
                if (userFavorites && userFavorites.favorites.length) {
                    const favoriteMovieIds = userFavorites.favorites.filter(favorite => favorite.movieId)
                    .map(favorite=> new ObjectId(favorite.movieId)) 
                    
                    const favoriteMovies = await moviesCollection.find({ _id: { $in: favoriteMovieIds } }).toArray();
                    res.send(favoriteMovies)
                } else {
                    // res.status(404).send('No favorites movie found for you');
                    res.send([]);
                }
            } catch (error) {
                //console.error('Error fetching favorites movies', error)
                res.status(500).send('Error fetching favorites movies')
                // res.send(userFavorites)
            }
        })
        app.patch('/favorites/:email', async (req, res) => {
            const { email } = req.params;
            const favoritesMovie = req.body;
            const query = { email: email };
            const updateData = {
                $addToSet: { favorites: favoritesMovie }
            }
            const options = { upsert: true }
            const result = await favoritesMoviesCollection.updateOne(query, updateData, options);
            res.send(result)

        })
        app.delete('/favorites/:email/:movieId', async (req, res) => {
            const { email, movieId } = req.params;
            const query = { email: email };
            const updateData = {
                $pull: { favorites: { movieId: movieId } }
            }
            try {
                const result = await favoritesMoviesCollection.updateOne(query, updateData);
                res.send(result)
            } catch (error) {
                // //console.error('Error removing a favorite movie', error)
                res.status(500).send('Error removing a favorite movie')
            }
        })
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/users/:email', async (req, res) => {
            const { email } = req.params;
            const user = await usersCollection.findOne({ email: email })
            if (user) {
                res.send(user)
            } else {
                res.status(404).send("user not found")
            }
        })
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            //console.log(newUser)
            const result = await usersCollection.insertOne(newUser);
            res.send(result)
        })
        app.patch('/users', async (req, res) => {
            const { email, lastSignInTime } = req.body;
            const query = { email: email };
            const update = {
                $set: { lastSignInTime: lastSignInTime }
            };
            const options = { upsert: true }
            const result = await usersCollection.updateOne(query, update, options);
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send('MOvie portal server is running')
})

app.listen(port, () => {
    console.log(`MOvie Portal is running on Port: ${port}`)
})