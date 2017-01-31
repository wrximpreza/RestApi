/**
 * User Controller
 * @module controllers/userController
 */
'use strict';

const usersModel = require('../models/users');
/**
 * @example curl -v -X GET "http://127.0.0.1:3000/users"
 */
async function all(ctx, next){
    ctx.body = await usersModel.getAll();
}
/**
 * @example curl -v -X GET "http://127.0.0.1:3000/users/1"
 */
async function get(ctx, next){
    ctx.body = await usersModel.getById(ctx.params.id);
}
/**
 * @example curl -v -X POST "http://127.0.0.1:3000/users" -d '{"name": "Vasya"}' -H "Content-Type: application/json"
 */
async function add(ctx, next){
    let userId = await usersModel.add(ctx.request.body);
    if (typeof userId === 'number') {
        ctx.status = 201;
        ctx.body = {"id": userId};
    } else {
        ctx.status = 400;
    }
}
/**
 * @example curl -v -X PUT "http://127.0.0.1:3000/users/1" -d '{"name":"Petya"}' -H "Content-Type: application/json"
 */
async function update(ctx, next){
    try {
        await usersModel.update(ctx.params.id, ctx.request.body);
        ctx.status = 200;
    } catch (e) {
        ctx.status = 400;
    }
}
/**
 * @example curl -v -X DELETE "http://127.0.0.1:3000/users/1"
 */
async function del(ctx, next){
    try {
        await usersModel.remove(ctx.params.id);
        ctx.status = 204;
    } catch (e) {
        ctx.status = 400
    }
}

/**
 * @example curl -v -X POST "http://127.0.0.1:3000/users/2/purchases" -d "{"count":10}"
 * @param req
 * @param res
 */
async function addPurchases(ctx, next) {
    let response = await usersModel.addPurchases(ctx.params.id, ctx.request.body);
    if (response === 'OK') {
        ctx.status = 201;
        ctx.body = {"response": response};
    } else {
        ctx.status = 400;
    }
}

/**
 * @example curl -v -X GET "http://127.0.0.1:3000/users/2/purchases"
 */
async function getPurchases(ctx, next) {
    ctx.body = await usersModel.getPurchases(ctx.params.id);
}

/**
 * @example curl -v -X DELETE "http://127.0.0.1:3000/users/2/purchases"
 */
async function removePurchases(ctx, next) {
    try {
        await usersModel.deletePurchases(ctx.params.id);
        ctx.status = 204;
    } catch (e) {
        ctx.status = 400
    }
}

module.exports = {
    'all': all,
    'get': get,
    'add': add,
    'update': update,
    'delete': del,
    'addPurchases': addPurchases,
    'getPurchases': getPurchases,
    'removePurchases': removePurchases
};

