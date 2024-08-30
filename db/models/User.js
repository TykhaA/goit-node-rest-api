import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegexp } from "../../constants/authConstants.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail(value) {
        if (!emailRegexp.test(value)) {
          throw new Error("Email not validate");
        }
      },
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
  },
  avatarURL: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
// User.sync({ force: true });

export default User;
