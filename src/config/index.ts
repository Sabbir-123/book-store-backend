/* eslint-disable no-undef */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 7000,
  db: process.env.DB_URL,
};
