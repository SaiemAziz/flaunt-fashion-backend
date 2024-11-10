import sequelize from "../utils/db_config.js";
import { DataTypes } from "sequelize";
const blogSchema = sequelize.define("blog", {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING
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
    tableName: 'blog'
}
);


export default blogSchema;