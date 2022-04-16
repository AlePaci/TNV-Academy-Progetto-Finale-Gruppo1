import express from "express";
import db from "./config/database.js"
import Movie from "./model/preferred_movie.js";
import router from "./routes/preff-movie-routes.js";




const app = express();


// parse requests of content-type - application/json
app.use(express.json());


// database connection e sync
db.movie = Movie;
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
db.sync();
// set port, listen for requests and routes
app.use(router);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});