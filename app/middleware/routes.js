"use strict";

const Router = require('koa-router');
const router = new Router();
const koaBody   = require('koa-body')();

let userController = require("../controllers/userController");

router.get('/users', userController.all)
    .get('/users/:id', userController.get)
    .post('/users', koaBody, userController.add)
    .put('/users', koaBody, userController.update)
    .del('/users/:id', userController.delete)
    .get('/users/:id/purchases', userController.getPurchases)
    .post('/users/:id/purchases', koaBody, userController.addPurchases)
    .del('/users/:id/purchases', userController.removePurchases);

module.exports = {
    'routes': router.routes(),
    'allowedMethods' :router.allowedMethods()
};
