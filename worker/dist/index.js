"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const keys_1 = __importDefault(require("./keys"));
const redisClient = redis_1.createClient({
    host: keys_1.default.REDIS_HOST,
    port: keys_1.default.REDIS_PORT,
    retry_strategy: () => 1000
});
const sub = redisClient.duplicate();
// 0 1 2 3 4 5
// 1 1 2 3 5 8 13
const fib = (index) => {
    if (index < 2)
        return 1;
    return fib(index - 1) + fib(index - 2);
};
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, `${fib(parseInt(message))}`);
});
sub.subscribe('insert');
