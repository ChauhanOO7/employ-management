const redisClient = require('../services/redisClient');
const zlib = require('zlib');
const { promisify } = require('util');

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);
const COMPRESSION_THRESHOLD = 1024;

const cache = (duration) => {
  return async (req, res, next) => {
    const key = '__express__' + (req.originalUrl || req.url);

    try {
      
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        if (cachedData.startsWith('gzip:')) {
          const compressedBuffer = Buffer.from(cachedData.slice(5), 'base64');
          const decompressed = await gunzip(compressedBuffer);
          return res.send(JSON.parse(decompressed));
        }
        return res.send(JSON.parse(cachedData));
      }
    } catch (err) {
      console.error('Cache read error:', err);
    }

    res.originalSend = res.send;
    res.send = async (body) => {
      try {
        let dataToCache = body;
        
        if (typeof body === 'string' && body.length > COMPRESSION_THRESHOLD) {
          const compressed = await gzip(body);
          dataToCache = 'gzip:' + compressed.toString('base64');
        }

        await redisClient.setEx(key, duration,dataToCache);
      } catch (err) {
        console.error('Cache write error:', err);
      }
      console.log(body);
      res.originalSend(body);
    };
    
    next();
  };
};

module.exports = cache;