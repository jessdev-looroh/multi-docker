const REDIST_HOST = process.env.REDIS_HOST;
const REDIST_PORT = (process.env.REDIST_PORT ?? 3000) as number;
const PG_HOST = process.env.PG_HOST;
const PG_USER = process.env.PG_USER;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_PORT = (process.env.PG_PORT ?? 3001) as number;
console.log(PG_PASSWORD);
export = {
    REDIST_HOST,
    REDIST_PORT,
    PG_HOST,
    PG_USER,
    PG_DATABASE,
    PG_PASSWORD,
    PG_PORT,
}