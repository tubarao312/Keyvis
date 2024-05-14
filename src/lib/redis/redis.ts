import Redis, { RedisOptions } from 'ioredis';
import configuration from '@/lib/configuration';

function createRedisClient(config = configuration.redis) {
    try {
        const options: RedisOptions = {
            host: config.host,
            lazyConnect: true,
            showFriendlyErrorStack: true,
            maxRetriesPerRequest: 1,
            retryStrategy: (times) => {
                return Math.min(times * 50, 2000);
            },
        };

        if (config.port) {
            options.port = parseInt(config.port);
        }

        if (config.password) {
            options.password = config.password;
        }

        const redis = new Redis(options);

        redis.on('error', (error) => {
            console.warn('[Redis] Error connecting:', error);
            // Exit the process if Redis fails to connect
        });

        return redis;
    } catch (error) {
        throw new Error(`[Redis] Cannot create a redis instance: ${error}`);
    }
}

function closeRedisClient(redis: Redis) {
    redis.disconnect();
}

const redis = createRedisClient();

process.on('exit', () => {
    closeRedisClient(redis);
}
);

export default redis;