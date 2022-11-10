const dotenv = require("dotenv");
dotenv.config();

// console.log("process.env.URL_MONGODB_DEV");
// console.log(process.env.URL_MONGODB_DEV);

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: "24h",
};
