import { createClient, RedisClient } from "redis";
import keys from "./keys";

const redisClient:RedisClient = createClient({
    host: keys.REDIS_HOST,
    port: keys.REDIS_PORT,
    retry_strategy: ()=>1000
});

const sub = redisClient.duplicate();

// 0 1 2 3 4 5
// 1 1 2 3 5 8 13
const fib = (index:number):number=>{    
    if(index<2) return 1;    
    return fib(index-1)+ fib(index-2);
}

sub.on('message', (channel, message:string)=>{
    redisClient.hset('values',message,`${fib(parseInt(message))}`);
})
sub.subscribe('insert')