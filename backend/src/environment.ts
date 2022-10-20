import 'dotenv/config'

import { ok } from "assert"

interface EnvironmentVariables {
    apiPort: number
    databaseUrl: string
    isProd: boolean
}


ok(process.env.API_PORT, 'API_PORT must be defined')
ok(process.env.DATABASE_URL, 'DATABASE_URL must be defined')


export default {
    apiPort: parseInt(process.env.API_PORT),
    databaseUrl: process.env.DATABASE_URL,
    isProd: process.env.NODE_ENV === 'production',
} as EnvironmentVariables