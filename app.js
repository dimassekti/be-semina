const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const categoriesRouter = require("./app/api/v1/categories/router");
const talentsRouter = require("./app/api/v1/talents/router");
const urlV1 = "/api/v1/cms";

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${urlV1}/categories`, categoriesRouter);
app.use(`${urlV1}/talents`, talentsRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
