import sequelize from "../utils/db_config.js";
import { DataTypes } from "sequelize";
const voteSchema = sequelize.define("vote", {
  
}, {
    tableName: 'vote'
}
);


export default voteSchema;