// Simple in-memory cache implementation
const cache = new Map();

const getCachedData = async (key) => {
  const cached = cache.get(key);
  if (!cached) {
    return null;
  }

  // Check if cache has expired
  if (Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }

  return cached.data;
};

const cacheData = async (key, data, ttlSeconds = 300) => {
  const expiry = Date.now() + (ttlSeconds * 1000);
  cache.set(key, {
    data: data,
    expiry: expiry
  });
};

// Clean up expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now > value.expiry) {
      cache.delete(key);
    }
  }
}, 60000); // Clean up every minute

module.exports = {
  getCachedData,
  cacheData
};
