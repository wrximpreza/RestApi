"use strict";

const Koa = require("koa");
const app = new Koa();

const config = require("config");
const error = require('./helpers/error');
const routes = require("./middleware/routes");

app.use(error);
app.use(routes.routes);
app.use(routes.allowedMethods);

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});