import sequelize from "../utils/db_config.js";
import { DataTypes } from "sequelize";
const contestSchema = sequelize.define("contest", {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: 'all',
    validate : {
      isIn: [['male', 'female', 'all']], 
    }
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rules: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumb_img: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
    tableName: 'contest'
}
);


export default contestSchema;