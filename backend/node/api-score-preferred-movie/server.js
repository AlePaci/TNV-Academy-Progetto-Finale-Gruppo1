import express from "express";
import db from "./config/database.js"
import Movie from "./model/preferred_movie.js";
import router from "./routes/preff-movie-routes.js";
import cors from "cors";
import Suggested from "./model/suggested_movie.js";




const app = express();


// parse requests of content-type - application/json
app.use(express.json());

app.use(cors({
  origin: "*"
}))
// database connection e sync
db.movie = Movie;
db.suggested = Suggested;
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
db.sync();
// set port, listen for requests and routes
app.use(router);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});