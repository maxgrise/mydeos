import { LRUCache } from 'lru-cache'

export interface CacheValue {
  data: any;
  lastAccessTime: number;
}

export interface CacheConfig {
  maxSizeInMb: number,
  maxItemCount: number
  sizeCalculation?: LRUCache.SizeCalculator<string, CacheValue>
}
