import keys from "./keys";
import express from 'express';
import cors from 'cors';
import { Pool } from "pg";
import redis from 'redis';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//POSTGRESS SETUP
const pgClient = new Pool({
    user: keys.PG_USER,
    password: keys.PG_PASSWORD,
    port: keys.PG_PORT,
    host: keys.PG_HOST,
    database: keys.PG_DATABASE,
})

// pgClient.on('error', () => console.log('Lost PG connection'));
pgClient.on("connect",(client)=>{
    console.log("Connect to PG CLIENTE with password: ",keys.PG_PASSWORD);
    client.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(console.log)

})

//REDIS CLIENT SETUP

const redisClient: redis.RedisClient = redis.createClient({
    host: keys.REDIST_HOST,
    port: keys.REDIST_PORT,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();


//EXPRESS ROUTE HANDLERS

app.get('/', (req, res) => {
    res.send("Hi to my Backend App")
})

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values');
    res.send(values.rows);
})

app.get('/values/current', async (req, res) => {
    console.log("Here current");
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    })
})

app.post('/values', async (req, res) => {
    const index = req.body.index;
    if (+index > 40)
        return res.status(422).send('Index too high');

    redisClient.hset('values', index, 'Nothing yet!')
    redisPublisher.publish('insert', index);
    pgClient.query(`INSERT INTO values(number) VALUES($1)`, [index])
    res.json({ working: true })
})

app.listen(5000, () =>
    console.log('Listing on port:', 5000)
)