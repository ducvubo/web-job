'use strict'
import { getRedis } from '../init/init.redis'

const redisCache = getRedis().instanceConnect

export const setCacheIO = async ({ key, value }) => {
  if (!redisCache) {
    throw new Error('Redis client not initialized')
  }
  try {
    return await redisCache.set(key, JSON.stringify(value))
  } catch (error) {
    throw new Error(error.message)
  }
}

export const setCacheIOExpiration = async ({ key, value, expirationInSeconds }) => {
  if (!redisCache) {
    throw new Error('Redis client not initialized')
  }
  try {
    return await redisCache.set(key, JSON.stringify(value), 'EX', expirationInSeconds)
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getCacheIO = async ({ key }) => {
  if (!redisCache) {
    throw new Error('Redis client not initialized')
  }
  try {
    const result = await redisCache.get(key)
    return JSON.parse(result)
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteCacheIO = async ({ key }) => {
  if (!redisCache) {
    throw new Error('Redis client not initialized')
  }
  try {
    return await redisCache.del(key)
  } catch (error) {
    throw new Error(error.message)
  }
}
