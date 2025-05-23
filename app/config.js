const dotenv = require("dotenv");
dotenv.config();

// console.log("process.env.URL_MONGODB_DEV");
// console.log(process.env.URL_MONGODB_DEV);

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_SECRET_REFRESH_TOKEN,
  jwtExpiration: "2h",
  jwtRefreshTokenExpiration: "1d",
};
