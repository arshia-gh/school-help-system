import 'dotenv/config'
import { ok } from "assert"

ok(process.env.API_PORT, 'API_PORT must be defined');
ok(process.env.DATABASE_URL, 'DATABASE_URL must be defined');
ok(process.env.JWT_ACCESS_SECRET, 'JWT_ACCESS_SECRET must be defined');
ok(process.env.JWT_REFRESH_SECRET, 'JWT_REFRESH_SECRET must be defined');

export default {
    apiPort: parseInt(process.env.API_PORT),
    databaseUrl: process.env.DATABASE_URL,
    isProd: process.env.NODE_ENV === 'production',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
}