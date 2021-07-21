"use strict";
var _a, _b;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = ((_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.REDIS_PORT) !== null && _b !== void 0 ? _b : 3000);
module.exports = { REDIS_HOST, REDIS_PORT };
