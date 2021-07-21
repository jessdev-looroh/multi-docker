

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = (process.env?.REDIS_PORT ?? 3000) as number;
export = {REDIS_HOST,REDIS_PORT}