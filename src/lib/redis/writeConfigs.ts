import redis from "./redis"

// There needs to be a functionality to have default values for the configurations 

// There needs to be an API to add new configurations, this can maybe be shared with the writeConfigs???

export function writeConfigs<T>(key: string, value: T) {
    // 1. Write into redis the configuration 

    // 2. Save the new value into a json file to keep history of the changes

    // 3. Return the new value
}