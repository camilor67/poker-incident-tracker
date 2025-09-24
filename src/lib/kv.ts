import { kv } from '@vercel/kv';

export { kv };

// Clave para almacenar los datos del incidente en Vercel KV
export const INCIDENT_KEY = 'poker-incident-tracker';
