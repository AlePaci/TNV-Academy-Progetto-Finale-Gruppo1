import Suggested from "../model/suggested_movie.js";

export const createSuggMovie = async (req, res) => {
    try {
        const suggMovie = await Suggested.create(req.body);
        res.json({
            "message": "Suggestion Created",
            "data" : suggMovie
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const getSuggMoviebyUserId = async (req, res) => {
    try {
        const suggMovies = await Suggested.findAll({
            where : {
                userId : req.params.userId
            }
        });
        res.send(suggMovies);
    } catch (err) {
        console.log(err);
    }
}

export const deleteSuggMovie = async (req, res) => {
    try {
        await Suggested.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Suggestion Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}