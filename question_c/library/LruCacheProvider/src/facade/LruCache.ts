import { Redis, RedisOptions } from 'ioredis';
import { LRUCache } from 'lru-cache';
import { CacheConfig, CacheValue } from '../config';

export class LruCache {
  private cache: LRUCache<string, CacheValue>;
  private redisClient: Redis;

  constructor(config: CacheConfig, redisConfig: RedisOptions) {
    this.cache = new LRUCache({
      max: config.maxItemCount,
      maxSize: config.maxSizeInMb,
      sizeCalculation: config.sizeCalculation || ((value, key) => {
        // TODO find an efficient way to calculate object size (stringify would be slow here...)
        return 1;
      })
    });
    this.redisClient = new Redis(redisConfig);
  }

  async get(key: string): Promise<any | undefined> {
    const cacheValue = this.cache.get(key);

    if (cacheValue) {
      this.cache.set(key, { ...cacheValue, lastAccessTime: Date.now() });
      return cacheValue.data;
    }

    const redisData = await this.redisClient.get(key);

    if (redisData) {
      const data = JSON.parse(redisData);
      this.cache.set(key, { data, lastAccessTime: Date.now() });
      return data;
    }

    return undefined;
  }

  async set(key: string, data: any): Promise<void> {
    const cacheValue: CacheValue = { data, lastAccessTime: Date.now() };
    this.cache.set(key, cacheValue);
    await this.redisClient.set(key, JSON.stringify(data));
  }
}