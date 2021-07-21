"use strict";
var _a, _b;
const REDIST_HOST = process.env.REDIS_HOST;
const REDIST_PORT = ((_a = process.env.REDIST_PORT) !== null && _a !== void 0 ? _a : 3000);
const PG_HOST = process.env.PG_HOST;
const PG_USER = process.env.PG_USER;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_PORT = ((_b = process.env.PG_PORT) !== null && _b !== void 0 ? _b : 3001);
console.log(PG_PASSWORD);
module.exports = {
    REDIST_HOST,
    REDIST_PORT,
    PG_HOST,
    PG_USER,
    PG_DATABASE,
    PG_PASSWORD,
    PG_PORT,
};
