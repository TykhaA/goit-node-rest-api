import { Sequelize } from "sequelize";
import { dataBaseConfig } from "./config.js";
const sequelize = new Sequelize(dataBaseConfig);

export default sequelize;
