import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

const defaultPort = 8080;
const config = {
  port: process.env.PORT ? process.env.PORT : defaultPort,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: "10d",
    refreshTokenExpiryMS: "30d",
  },
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
export default config;
