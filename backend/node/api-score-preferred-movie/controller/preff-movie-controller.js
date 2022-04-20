import Movie from "../model/preferred_movie.js";

export const createPreffMovie = async (req, res) => {
    try {
        const prefMovie = await Movie.create(req.body);
        res.json({
            "message": "Pizza Created",
            "data" : prefMovie
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const getPrefMovies = async (req, res) => {
    try {
        const prefMovies = await Movie.findAll();
        res.send(prefMovies);
    } catch (err) {
        console.log(err);
    }
}

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



export const deletePrefMovie = async (req, res) => {
    try {
        await Movie.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Pizza Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}