import { Sequelize } from "sequelize";
import "dotenv/config";

const {
  DATABASE_NAME,
  DATABASE_DIALECT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

export const dataBaseConfig = {
  username: DATABASE_NAME,
  dialect: DATABASE_DIALECT,
  database: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialectOptions: {
    ssl: true,
  },
};
const sequelize = new Sequelize(dataBaseConfig);

export default sequelize;
