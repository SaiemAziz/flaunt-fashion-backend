import sequelize from "../utils/db_config.js";
import { DataTypes } from "sequelize";
const userSchema = sequelize.define("user", {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      isIn: [['male', 'female', 'all']], 
    }
  },
  birthdate: {
    type: DataTypes.DATE
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "contestant"
  },
  password: {
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
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    }
  },
  banned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
    tableName: 'user'
}
);


export default userSchema;