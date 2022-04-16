import express from "express";

import { 
    getPrefMovieById,
    getPrefMoviesbyUserId,
    createPreffMovie,
    deletePrefMovie,
    getPrefMovies
 } from "../controller/preff-movie-controller.js";
 
const router = express.Router();
 
router.get('/movies', getPrefMovies);
router.get('/movies/:id', getPrefMovieById);
router.post('/movies', createPreffMovie);
router.get('/usermovies/:userId', getPrefMoviesbyUserId);
router.delete('/movies/:id', deletePrefMovie);
 
export default router;