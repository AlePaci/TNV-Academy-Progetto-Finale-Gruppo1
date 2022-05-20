import { Sequelize } from "sequelize"; 
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

const Suggested = db.define('suggested_movies', {
  movieId: {
    type: DataTypes.BIGINT
  },
  userId: {
    type: DataTypes.BIGINT
  }
}, {
  freezeTableName: true
});
 
export default Suggested;