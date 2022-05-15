import Movie from "../model/preferred_movie.js";

/**
 * metodo per salvare un nuovo film preferito
 * @param {*} req 
 * @param {*} res 
 */
export const createPreffMovie = async (req, res) => {
    try {
        const prefMovie = await Movie.create(req.body);
        res.json({
            "message": "Movie Created",
            "data" : prefMovie
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
/**
 * Metodo per recuperare tutti i film preferiti
 * @param {*} req 
 * @param {*} res 
 */
export const getPrefMovies = async (req, res) => {
    try {
        const prefMovies = await Movie.findAll();
        res.send(prefMovies);
    } catch (err) {
        console.log(err);
    }
}
/**
 *  Metodo per recuperare un film preferito cercando per Id
 * @param {*} req 
 * @param {*} res 
 */
export const getPrefMovieById = async (req, res) => {
    try {
        const prefMovie = await Movie.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if (prefMovie) {
            res.send(prefMovie);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
/**
 * Metodo per recuperare tutti i film preferiti cercando per userId
 * @param {*} req 
 * @param {*} res 
 */
export const getPrefMoviesbyUserId = async (req, res) => {
    try {
        const prefMovies = await Movie.findAll({
            where : {
                userId : req.params.userId
            }
        });
        res.send(prefMovies);
    } catch (err) {
        console.log(err);
    }
}
/**
 * Metodo per recuperare tutti i film preferiti cercando per movieId
 * @param {*} req 
 * @param {*} res 
 */
export const getPrefMoviesbyMovieId = async (req, res) => {
    try {
        const prefMovies = await Movie.findAll({
            where : {
                movieId : req.params.movieId
            }
        });
        res.send(prefMovies);
    } catch (err) {
        console.log(err);
    }
}
/**
 * Metodo per recuperare un film preferito cercando per movieId e userId
 * @param {*} req 
 * @param {*} res 
 */
export const getPrefMoviesbyUserIdMovieId = async (req, res) => {
    try {
        const prefMovies = await Movie.findOne({
            where : {
                userId : req.params.userId,
                movieId : req.params.movieId
            }
        });
        res.send(prefMovies);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Metodo per cancellare un film preferito dall id
 * @param {*} req 
 * @param {*} res 
 */
export const deletePrefMovie = async (req, res) => {
    try {
        await Movie.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Movie Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}