"use strict";

const fs = require("fs"),
    config = require("config"),
    Q = require("q"),
    qMemcached = require('memcache-promise');

const memcached = new qMemcached(`${config.memcached.host}:${config.memcached.port}`);

module.exports = {

    /**
     * Get all records from memcached
     * @return {Promise}
     */
    getAll: () => {
        return memcached.get('users');
    },

    /**
     * Get record by id from memcached
     * @param id
     * @return {Promise}
     */
    getById: (id) => {
        return memcached.get('users').then((users) => {
            if(!users[Number(id)]){
                throw new Error("No valid data send");
            }
            return users[Number(id)];
        }).fail(function(e){
            throw e;
        });
    },

    /**
     * Add new record to memcached
     * @param params
     * @return {Promise}
     */
    add: (params) => {

        return memcached.get('users').then((users) => {
            if(!params.name){
                throw new Error("No valid data send");
            }
            users.push(params);
            return users;
        }).then((users) => {
            return memcached.set('users', users, 1000).then(() => {
                return users.length - 1;
            });
        }).fail(function(e){
            throw e;
        });

    },

    /**
     * Update record into memcached
     * @param id
     * @param params
     * @return {Promise}
     */
    update: (id, params) => {

        return memcached.get('users').then((users) => {
            if(!Number(params.id) || !Number(id)){
                throw new Error("No valid data send");
            }
            users[Number(id)] = params;
            return users;
        }).then((users) => {
            return memcached.set('users', users, 1000);
        }).fail(function(e){
            throw e;
        });

    },

    /**
     * Remove record from memcached
     * @param id
     * @return {Promise}
     */
    remove: (id) => {

        return memcached.get('users').then((users) => {
            if(!users[Number(id)]){
                throw new Error("No valid data send");
            }
            delete users[Number(id)];
            return users;
        }).then((users) => {
            return memcached.set('users', users, 1000);
        }).fail(function(e){
            throw e;
        });

    },

    /**
     * Add new field count to user
     * @param id
     * @param params
     * @return {Promise}
     */
    addPurchases: (id, params) => {

        return memcached.get('users').then((users) => {
            if (typeof params.count == "undefined" || Number(params.count) == "-1") {
                throw new Error("No valid data send");
            }
            users[id] = Object.assign(users[id], params);
            return users;
        }).then((users) => {
            return memcached.set('users', users, 1000).then(() => {
                return "OK";
            }).fail(function(e){
                    throw e;
            });
        }).fail(function(e){
            throw e;
        });

    },

    /**
     * Get count from user
     * @param id
     * @return {Promise}
     */
    getPurchases: (id) => {

        return memcached.get('users').then((users) => {
            if(!users[id].count){
                throw new Error("No valid data send");
            }
            return users[id].count;
        }).fail(function(e){
            throw e;
        });

    },

    /**
     * Remove filed count from user
     * @param id
     * @return {Promise}
     */
    deletePurchases: (id) => {

        return memcached.get('users').then((users) => {
            if(!users[id].count){
                throw new Error("No valid data send");
            }
            delete users[id].count;
            return users;
        }).then((users) => {
            return memcached.set('users', users, 1000).then(() => {
                return "OK";
            });
        }).fail(function(e){
            throw e;
        });

    }

};