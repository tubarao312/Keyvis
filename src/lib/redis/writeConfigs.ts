import redis from "@/lib/redis"

import { Types } from "@/lib/metadata/types"

export function writeConfigs(key: string, value: string, type: string) {
    // Convert value to correct type before writing to redis
    switch (type) {
        case Types.INTEGER:
            redis.set(key, parseInt(value))
            break
        case Types.FLOAT:
            redis.set(key, parseFloat(value))
            break
        default:
            // Write to redis
            redis.set(key, value)
    }
}