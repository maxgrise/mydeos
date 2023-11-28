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
  let service_count = Number(env.LRU_CACHE_SAMPLE_SERVICE_COUNT)
  for (let i = 1; i <= service_count; i++) {
    console.log(`keys retrieved from producer ${i} `)
    console.log(await cache.get(`some_key_producer-${i}`));
    console.log(await cache.get(`some_other_key_producer-${i}`));
  }
}

runExample();