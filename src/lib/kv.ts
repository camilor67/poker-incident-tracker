import { Redis } from '@upstash/redis';

// initialize redis
const redis = Redis.fromEnv();

export { redis };

// key for storing incident data in Redis
export const INCIDENT_KEY = 'poker-incident-tracker';
