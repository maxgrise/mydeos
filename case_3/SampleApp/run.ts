import { env } from 'process';
import { LruCache } from '../library/LruCacheProvider/src';


// TODO needs proper config validation through Convict or similar
const cache = new LruCache({
  maxItemCount: (env.LRU_CACHE_MAX_ITEM_COUNT || 5000) as number,
  maxSizeInMb: (env.LRU_CACHE_MAX_SIZE || 5000) as number,
},
  {
    host: (env.LRU_CACHE_REDIS_HOST) as string,
    password: (env.LRU_CACHE_REDIS_PASSWORD) as string,
    port: (env.LRU_CACHE_REDIS_PORT || 6379) as number,
  }
);

async function runExample() {
  // Set data in the cache
  await cache.set('key1', 'value1');

  // Get data from the cache
  const result = await cache.get('key1');
  console.log(result); // Output: value1

  // Data not in cache, fetch and set in the cache
  const result2 = await cache.get('key2');
  console.log(result2); // Output: undefined

  await cache.set('key2', 'value2');

  const result3 = await cache.get('key2');
  console.log(result3); // Output: value2
}

runExample();