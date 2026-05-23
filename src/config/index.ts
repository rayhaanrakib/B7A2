import { env } from "process";

import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const config = {
    port: env.PORT as string,
    database_url: env.DATABASE_URL as string,
    node_env: env.NODE_ENV as string,
    bcrypt_rounds: parseInt(env.BCRYPT_ROUNDS ?? "10", 10),
    jwt_secret: env.JWT_SECRET as string,
    jwt_refresh_secret: env.JWT_REFRESH_SECRET as string,
}