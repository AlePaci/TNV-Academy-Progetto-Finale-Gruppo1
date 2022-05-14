import { Sequelize } from "sequelize"; 
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

const Movie = db.define('preferred_movies', {
  movieId: {
    type: DataTypes.BIGINT
  },
  userId: {
    type: DataTypes.BIGINT
  },
  gameScore: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});
 
export default Movie;