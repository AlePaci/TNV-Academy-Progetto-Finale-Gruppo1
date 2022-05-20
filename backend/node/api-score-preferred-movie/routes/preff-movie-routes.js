import express from "express";

import { 
    getPrefMovieById,
    getPrefMoviesbyUserId,
    createPreffMovie,
    deletePrefMovie,
    getPrefMovies,
    getPrefMoviesbyUserIdMovieId,
    getPrefMoviesbyMovieId
 } from "../controller/preff-movie-controller.js";
 
 import {
    getSuggMoviebyUserId,
    createSuggMovie,
    deleteSuggMovie
} from "../controller/sugg-movie-controller.js"

const router = express.Router();

router.post('/sugg', createSuggMovie);
router.get('/sugg/:userId',getSuggMoviebyUserId);
router.delete('/sugg/:id',deleteSuggMovie);
 
router.get('/movies', getPrefMovies);
router.get('/movies/:id', getPrefMovieById);
router.post('/movies', createPreffMovie);
router.get('/usermovies/:userId', getPrefMoviesbyUserId);
router.get('/moviemovies/:movieId',getPrefMoviesbyMovieId)
router.delete('/movies/:id', deletePrefMovie);
router.get('/idmovie/:userId/:movieId', getPrefMoviesbyUserIdMovieId);

 
export default router;