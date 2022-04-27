import express from "express";

import { 
    getPrefMovieById,
    getPrefMoviesbyUserId,
    createPreffMovie,
    deletePrefMovie,
    getPrefMovies,
    getPrefMoviesbyUserIdMovieId
 } from "../controller/preff-movie-controller.js";
 
const router = express.Router();
 
router.get('/movies', getPrefMovies);
router.get('/movies/:id', getPrefMovieById);
router.post('/movies', createPreffMovie);
router.get('/usermovies/:userId', getPrefMoviesbyUserId);
router.delete('/movies/:id', deletePrefMovie);
router.get('/idmovie/:userId/:movieId', getPrefMoviesbyUserIdMovieId);
 
export default router;