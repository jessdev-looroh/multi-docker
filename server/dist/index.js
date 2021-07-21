"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const redis_1 = __importDefault(require("redis"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//POSTGRESS SETUP
const pgClient = new pg_1.Pool({
    user: keys_1.default.PG_USER,
    password: keys_1.default.PG_PASSWORD,
    port: keys_1.default.PG_PORT,
    host: keys_1.default.PG_HOST,
    database: keys_1.default.PG_DATABASE,
});
// pgClient.on('error', () => console.log('Lost PG connection'));
pgClient.on("connect", (client) => {
    console.log("Connect to PG CLIENTE with password: ", keys_1.default.PG_PASSWORD);
    client.query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch(console.log);
});
//REDIS CLIENT SETUP
const redisClient = redis_1.default.createClient({
    host: keys_1.default.REDIST_HOST,
    port: keys_1.default.REDIST_PORT,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();
//EXPRESS ROUTE HANDLERS
app.get('/', (req, res) => {
    res.send("Hi to my Backend App");
});
app.get('/values/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const values = yield pgClient.query('SELECT * from values');
    res.send(values.rows);
}));
app.get('/values/current', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Here current");
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
}));
app.post('/values', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const index = req.body.index;
    if (+index > 40)
        return res.status(422).send('Index too high');
    redisClient.hset('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index);
    pgClient.query(`INSERT INTO values(number) VALUES($1)`, [index]);
    res.json({ working: true });
}));
app.listen(5000, () => console.log('Listing on port:', 5000));
