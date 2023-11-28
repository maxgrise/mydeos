import { env } from 'process';
import { LruCache } from '../library/LruCacheProvider/src';

// TODO needs proper config validation through Convict or similar
const cache = new LruCache({
  maxItemCount: Number(env.LRU_CACHE_MAX_ITEM_COUNT || 5000),
  maxSizeInMb: Number(env.LRU_CACHE_MAX_SIZE || 5000),
},
  {
    host: (env.LRU_CACHE_REDIS_HOST) as string,
    password: (env.LRU_CACHE_REDIS_PASSWORD) as string,
    port: Number(env.LRU_CACHE_REDIS_PORT || 6379) as number,
  }
);

async function runExample() {
  console.log(`inserting keys for service ${env.SERVICE_NAME}`)
  await cache.set(`some_key_${env.SERVICE_NAME}`, `value_1_for_${env.SERVICE_NAME}`);
  await cache.set(`some_other_key_${env.SERVICE_NAME}`, `value_2_for_${env.SERVICE_NAME}`);
}

runExample();